import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { useContext } from "react";
import dayjs from "dayjs";
import { APP_STATE, AppStateContext } from "@/Common";
import { PartialAlquiler } from "@/Alquileres/entities";

export function NewAlquilerEntry({
  onCancelCreateAlquiler,
  newAlquiler,
}: {
  onCancelCreateAlquiler: () => void;
  newAlquiler: PartialAlquiler;
}) {
  const { appState } = useContext(AppStateContext)!;
  let fechaInicio = "";
  let fechaFin = "";
  if (newAlquiler.fechaAlquiler?.inicio) {
    fechaInicio = dayjs
      .tz(newAlquiler.fechaAlquiler.inicio, "America/Argentina/Buenos_Aires")
      .format("DD/MM/YYYY");
  }
  if (newAlquiler.fechaAlquiler?.fin) {
    fechaFin = dayjs
      .tz(newAlquiler.fechaAlquiler.fin, "America/Argentina/Buenos_Aires")
      .format("DD/MM/YYYY");
  }

  const dateRange = fechaInicio || fechaFin ? `${fechaInicio} - ${fechaFin}` : "";
  const hiddenMaxH = appState === APP_STATE.creating ? "max-h-full" : "max-h-0";
  const hiddenBorderContainer = appState === APP_STATE.creating ? "border" : "";

  return (
    <div
      className={` overflow-hidden transition-all flex flex-row rounded-xl gap-4 duration-300
        bg-red-100 hover:cursor-pointer shadow-md border-red-300
        hover:bg-red-200 h-auto ${hiddenMaxH} ${hiddenBorderContainer}`}
    >
      <div
        className={`flex flex-col font-body grow my-4 ml-4 duration-300 transition-all ${hiddenMaxH}`}
      >
        <p className="text-2xl font-semibold ">{newAlquiler?.productora || "\u00A0"}</p>
        <p className="text-xl">{newAlquiler.proyecto || "\u00A0"}</p>
        <p className="italic">{dateRange}</p>
        <p>
          Cantidad de productos: <span className="font-semibold">{0}</span>
        </p>
      </div>
      <div className={`flex flex-col justify-center items-end mr-4`}>
        <FontAwesomeIcon
          icon={faTrash}
          onClick={onCancelCreateAlquiler}
          className={`duration-300 transition-all ${hiddenMaxH}`}
        />
      </div>
    </div>
  );
}
