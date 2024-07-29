import { convertToCamelCase } from "@utils";
import dayjs from "dayjs";
import { useRef, useState } from "react";

export function AlquilerDateInput({
  titulo,
  onChangeDate,
  row = false,
  bold = false,
}: {
  titulo: string;
  onChangeDate: (val: Date) => void;
  row?: boolean;
  bold?: boolean;
}) {
  const [inputValue, setInputValue] = useState("");
  const id = convertToCamelCase(titulo);
  const flexOrientation = !row ? "flex-col" : "flex-row items-center mb-2";
  const labelRowClasses = row && "mr-2";
  const boldClass = bold && "font-semibold";
  const dateInputRef = useRef<HTMLInputElement>(null);

  function handleOpenDatePicker() {
    dateInputRef.current?.showPicker();
  }
  function handleChangeToInput(e: React.ChangeEvent<HTMLInputElement>) {
    const date = dayjs.tz(e.target.valueAsDate, "UTC");
    const dayJsString = date.format("DD/MM/YYYY");
    setInputValue(dayJsString);
    onChangeDate(date.toDate());
  }

  return (
    <div className={`flex ${flexOrientation} w-1/2 px-1`}>
      <label htmlFor={id} className={`font-body ${boldClass} ${labelRowClasses}`}>
        {titulo}
      </label>
      <input
        id={id}
        className="border shadow p-2 rounded"
        value={inputValue}
        onClick={handleOpenDatePicker}
        onChange={(e) => console.log(e.target.value)}
      />
      <input
        type="date"
        ref={dateInputRef}
        className="h-0 overflow-hidden"
        onChange={handleChangeToInput}
      />
    </div>
  );
}
