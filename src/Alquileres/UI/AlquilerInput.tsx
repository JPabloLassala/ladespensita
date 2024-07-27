import { convertToCamelCase } from "@utils";
import { useRef } from "react";

export function AlquilerInput({
  titulo,
  value,
  row = false,
  bold = false,
  onChange = () => {},
}: {
  titulo: string;
  value: string | number;
  row?: boolean;
  bold?: boolean;
  onChange?: (val: string) => void;
}) {
  const id = convertToCamelCase(titulo);
  const flexOrientation = !row ? "flex-col" : "flex-row items-center mb-2";
  const labelRowClasses = row && "mr-2";
  const boldClass = bold && "font-semibold";
  const dateInputRef = useRef<HTMLInputElement>(null);

  function handleOpenDatePicker() {
    dateInputRef.current?.showPicker();
  }
  function handleChangeToInput(e: React.ChangeEvent<HTMLInputElement>) {
    onChange(e.target.value);
  }

  return (
    <div className={`flex ${flexOrientation} w-1/2 px-1`}>
      <label htmlFor={id} className={`font-body ${boldClass} ${labelRowClasses}`}>
        {titulo}
      </label>
      <input
        id={id}
        className="border shadow p-2 rounded"
        defaultValue={value}
        onClick={handleOpenDatePicker}
        onChange={(e) => onChange(e.target.value)}
      ></input>
      <input
        type="datetime-local"
        className="h-0 overflow-hidden"
        ref={dateInputRef}
        onChange={handleChangeToInput}
      ></input>
    </div>
  );
}
