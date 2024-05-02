import { useContext, useState } from "react";
import { AlquileresContext } from "../stores/Alquileres.context";
import dayjs from "dayjs";
import { AlquilerEntry } from "../components/AlquilerEntry";
import { AlquilerEntryContainer } from "../components/AlquilerEntryContainer";
import { AlquilerDetailsContainer } from "../components/AlquilerDetailsContainer";

export function Alquileres() {
  const { getSummary, alquileres } = useContext(AlquileresContext)!;
  const [selectedAlquiler, setSelectedAlquiler] = useState(alquileres[0]);
  const handleSelectAlquiler = (id: number) => {
    setSelectedAlquiler(alquileres[id]);
  };
  const alquilerEntries = getSummary().map((alquiler) => (
    <AlquilerEntry
      key={alquiler.id}
      alquiler={alquiler}
      dateRange={`${dayjs(alquiler.since).format("DD/MM/YYYY")} - ${dayjs(alquiler.until).format("DD/MM/YYYY")}`}
      onSelectAlquiler={() => handleSelectAlquiler(alquiler.id - 1)}
    />
  ));

  return (
    <main className="grow shrink flex flex-row overflow-y-auto">
      <AlquilerEntryContainer>{alquilerEntries}</AlquilerEntryContainer>
      <AlquilerDetailsContainer selectedAlquiler={selectedAlquiler} />
    </main>
  );
}
