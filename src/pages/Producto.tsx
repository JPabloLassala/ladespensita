import { ProductoType } from "../schemas";

export function Producto({
  item,
  disabled = false,
  dimmed = false,
}: {
  item: ProductoType;
  disabled?: boolean;
  dimmed?: boolean;
}) {
  return (
    <div
      className={`
        rounded-md bg-white text-sm shadow-md duration-200 max-w-72
        hover:scale-105 hover:shadow-xl ${disabled ? "hidden" : ""}
        ${dimmed ? "grayscale brightness-90 shadow-none" : ""}
        `}
    >
      <a href="#">
        <img
          src="http://localhost:3000/images/21.jpg"
          alt="Producto"
          className="w-full rounded-t-md object-scale-down"
        />
        <div className="px-4 py-3">
          <p className="block text-md font-bold capitalize text-black">{item.nombre}</p>
          <p className="block truncate text-xs">Unidades metro lineal:{item.unidadesMetroLineal}</p>
          <p className="block truncate text-xs">Altura: {item.medidas.altura}cm</p>
          {item.medidas.diametro && (
            <p className="block truncate text-xs">Diametro: {item.medidas.diametro}cm</p>
          )}
          {item.medidas.ancho && (
            <p className="block truncate text-xs">Ancho: {item.medidas.ancho}cm</p>
          )}
          {item.medidas.profundidad && (
            <p className="block truncate text-xs">Profundidad: {item.medidas.profundidad}cm</p>
          )}
          <p className="mt-2 truncate text-stone-800 text-xs">
            Unidades disponibles: <span className="font-bold">0</span>
          </p>
        </div>
      </a>
    </div>
  );
}
2;
