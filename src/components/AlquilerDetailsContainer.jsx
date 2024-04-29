import dayjs from "dayjs";

export function AlquilerDetailsContainer({ selectedAlquiler }) {
  return (
    <div className="flex flex-col grow mx-4 gap-4">
      <p className="text-2xl font-semibold font-body">Detalle de alquiler</p>
      <div className="flex flex-row gap-2">
        <div className="flex flex-col w-1/2">
          <p className="font-body font-semibold text-lg">Productora</p>
          <input
            disabled
            className="border shadow p-2 rounded"
            value={selectedAlquiler.productora}
          ></input>
        </div>
        <div className="flex flex-col w-1/2">
          <p className="font-body font-semibold text-lg">Proyecto</p>
          <input
            disabled
            className="border shadow p-2 rounded"
            value={selectedAlquiler.proyecto}
          ></input>
        </div>
      </div>
      <div className="flex flex-row gap-2">
        <div className="flex flex-col w-1/2">
          <p className="font-body font-semibold text-lg">Fecha desde</p>
          <input
            disabled
            className="border shadow p-2 rounded"
            value={dayjs(selectedAlquiler.since).format("DD/MM/YYYY")}
          ></input>
        </div>
        <div className="flex flex-col w-1/2">
          <p className="font-body font-semibold text-lg">Fecha hasta</p>
          <input
            disabled
            className="border shadow p-2 rounded"
            value={dayjs(selectedAlquiler.until).format("DD/MM/YYYY")}
          ></input>
        </div>
      </div>
      <div className="grow shrink overflow-y-auto flex flex-row gap-2 h-full">
        <div className="flex flex-col w-1/2">
          <p className="font-body font-semibold text-lg">Productos</p>
          <div className="grow shrink overflow-y-auto bg-blue-100 w-full mb-8 flex-col gap-2 rounded-md shadow-md ">
            asda
            <br />
            asda
            <br />
            asda
            <br />
            asda
            <br />
            asda
            <br />
            asda
            <br />
            asda
            <br />
            asda
            <br />
            asda
            <br />
            asda
            <br />
            asda
            <br />
            asda
            <br />
            asda
            <br />
            asda
            <br />
            asda
            <br />
            asda
            <br />
            asda
            <br />
            asda
            <br />
            asda
            <br />
            asda
            <br />
            asda
            <br />
            asda
            <br />
            asda
            <br />
            asda
            <br />
            asda
            <br />
            asda
            <br />
            asda
            <br />
            asda
            <br />
            asda
            <br />
            asda
            <br />
            asda
            <br />
            asda
            <br />
            asda
            <br />
            asda
            <br />
            asda
            <br />
            asda
            <br />
            asda
            <br />
            asda
            <br />
            asda
            <br />
            asda
            <br />
            asda
            <br />
            asda
            <br />
            asda
            <br />
            asda
            <br />
          </div>
        </div>
      </div>
    </div>
  );
}
