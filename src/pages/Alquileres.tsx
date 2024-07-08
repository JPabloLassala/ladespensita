import { useContext, useEffect, useState } from "react";
import { AlquileresContext } from "../stores/Alquileres.context";
import dayjs from "dayjs";
import { AlquilerEntry } from "../components/Productos/AlquilerEntry";
import { AlquilerEntryContainer } from "../components/Productos/AlquilerEntryContainer";
import { AlquilerDetailsContainer } from "../components/Productos/AlquilerDetailsContainer";
import { Alquiler } from "../schemas";
import { useHttp } from "../hooks";
import { AlquilerNoneSelected } from "../components/Productos/AlquilerNoneSelected";

export function Alquileres() {
  const { getSummary, alquileres, setAlquileres } = useContext(AlquileresContext)!;
  const [selectedAlquiler, setSelectedAlquiler] = useState<Alquiler>();
  const { data: alquilerData } = useHttp<Alquiler>("http://127.0.0.1:3000/alquileres", {}, []);

  const handleSelectAlquiler = (id: number) => {
    setSelectedAlquiler(alquileres[id]);
  };

  useEffect(() => {
    if (alquilerData) {
      setAlquileres(alquilerData);
    }
  }, [alquilerData]);

  const alquilerEntries = getSummary().map((alquiler, i) => (
    <AlquilerEntry
      key={i}
      alquiler={alquiler}
      dateRange={`${dayjs(alquiler.since).format("DD/MM/YYYY")} - ${dayjs(alquiler.until).format("DD/MM/YYYY")}`}
      onSelectAlquiler={() => handleSelectAlquiler(i)}
    />
  ));

  return (
    <main className="grow shrink flex flex-row overflow-y-auto w-full">
      <AlquilerEntryContainer>{alquilerEntries}</AlquilerEntryContainer>
      {alquileres.length && selectedAlquiler && (
        <AlquilerDetailsContainer selectedAlquiler={selectedAlquiler} />
      )}
      {!selectedAlquiler && <AlquilerNoneSelected />}
    </main>
  );
}
