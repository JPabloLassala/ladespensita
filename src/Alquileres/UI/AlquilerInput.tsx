import { convertToCamelCase } from "../../utils/convertCase";

export function AlquilerInput({
  titulo,
  value,
  row = false,
  bold = false,
}: {
  titulo: string;
  value: string | number;
  row?: boolean;
  bold?: boolean;
}) {
  const id = convertToCamelCase(titulo);
  const flexOrientation = !row ? "flex-col" : "flex-row items-center mb-2";
  const labelRowClasses = row && "mr-2";
  const boldClass = bold && "font-semibold";

  return (
    <div className={`flex ${flexOrientation} w-1/2`}>
      <label htmlFor={id} className={`font-body ${boldClass} ${labelRowClasses}`}>
        {titulo}
      </label>
      <input readOnly id={id} className="border shadow p-2 rounded" value={value}></input>
    </div>
  );
}
