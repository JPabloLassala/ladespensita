export function Producto({ item }) {
  return (
    <div className="rounded-xl bg-white text-sm shadow-md duration-200 hover:scale-105 hover:shadow-xl">
      <a href="#">
        <img src={item.img} alt="Product" className="h-60 rounded-t-xl object-cover" />
        <div className="px-4 py-3">
          <p className="block truncate text-lg font-bold capitalize text-black">{item.name}</p>
          <p className="block truncate">Unidades metro lineal:{item.unidadesMetroLineal}</p>
          <p className="block truncate">Altura: {item.medidas.altura}cm</p>
          {item.medidas.diametro && (
            <p className="block truncate">Diametro: {item.medidas.diametro}cm</p>
          )}
          {item.medidas.ancho && <p className="block truncate">Ancho: {item.medidas.ancho}cm</p>}
          {item.medidas.profundidad && (
            <p className="block truncate">Profundidad: {item.medidas.profundidad}cm</p>
          )}
          <p className="mt-2 block truncate text-stone-800">
            Unidades disponibles: <span className="font-bold">{item.unidadesDisponibles}</span>
          </p>
        </div>
      </a>
    </div>
  );
}
2;
