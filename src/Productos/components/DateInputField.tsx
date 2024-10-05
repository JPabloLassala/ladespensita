import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import dayjs, { Dayjs } from "dayjs";
import { useRef, useState } from "react";

export function DateInputField({
  label,
  id,
  onSetDate = () => {},
  value,
}: {
  label: string;
  id: string;
  onSetDate?: (date: string) => void;
  value?: Dayjs;
}) {
  const [, setTmpDate] = useState<Dayjs | undefined>(undefined);
  // const datePickerRef = useRef<HTMLInputElement>(null);
  const enableInputRef = useRef<HTMLInputElement>(null);
  function setDefaultDate() {}
  function handleClearInput() {}

  function handleSetOrUnsetDate() {
    if (!enableInputRef.current) return;

    if (enableInputRef.current.checked) {
      setTmpDate(value);
    } else {
      setTmpDate(undefined);
    }
  }

  return (
    <div className="flex flex-col">
      <div className="mb-1 flex flex-row items-center">
        <input
          type="checkbox"
          name={`enable${id}`}
          id={`enable${id}`}
          onChange={handleSetOrUnsetDate}
          className="mr-1"
        />
        <label
          htmlFor={`enable${id}`}
          className="font-semibold text-slate-700 select-none hover:cursor-pointer"
        >
          {label}
        </label>
      </div>

      <div className="flex h-11 flex-row items-center rounded border border-slate-200 bg-white p-3">
        <input
          id={id}
          name={id}
          type="date"
          onClick={setDefaultDate}
          value={dayjs(value).format("YYYY-MM-DD")}
          onChange={(event) => onSetDate(event.target.value)}
          className="ml-2 w-full bg-transparent text-sm text-slate-800 focus:outline-none disabled:bg-slate-400"
        />
        <FontAwesomeIcon
          icon={faXmark}
          className="text-slate-500 hover:cursor-pointer"
          onClick={handleClearInput}
        />
      </div>
    </div>
  );
}
