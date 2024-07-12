import { useContext, useEffect, useState } from "react";
import { AlquileresContext } from "../stores/Alquileres.context";
import dayjs from "dayjs";
import { Alquiler } from "../schemas";
import { useHttp } from "../hooks";
import { AlquilerEntryContainer } from "./components/AlquilerEntryContainer";
import { AlquilerDetailsContainer } from "./components/AlquilerDetailsContainer";
import { AlquilerNoneSelected } from "./components/AlquilerNoneSelected";
import { AlquilerEntry } from "./components/AlquilerEntry";

export function Alquileres() {
  const { getSummary, alquileres, setAlquileres } = useContext(AlquileresContext)!;
  const [selectedAlquiler, setSelectedAlquiler] = useState<Alquiler>();
  const { data: alquilerData } = useHttp<Alquiler>("http://127.0.0.1:3000/alquileres", {}, []);
  const handleSelectAlquiler = (id: string) => {
    setSelectedAlquiler(alquileres.find((alquiler) => alquiler.id === id));
  };

  useEffect(() => {
    setAlquileres(alquilerData);
  }, [alquilerData]);

  return (
    <main className="flex flex-row overflow-y-auto w-full">
      <AlquilerEntryContainer>
        {getSummary().map((alquiler) => (
          <AlquilerEntry
            key={alquiler.id}
            alquiler={alquiler}
            isSelected={selectedAlquiler?.id === alquiler.id}
            dateRange={`${dayjs(alquiler.since).format("DD/MM/YYYY")} - ${dayjs(alquiler.until).format("DD/MM/YYYY")}`}
            onSelectAlquiler={() => handleSelectAlquiler(alquiler.id)}
          />
        ))}
      </AlquilerEntryContainer>
      {alquileres.length > 0 && selectedAlquiler && (
        <AlquilerDetailsContainer selectedAlquiler={selectedAlquiler} />
      )}
      {!selectedAlquiler && <AlquilerNoneSelected />}
    </main>
  );
}
