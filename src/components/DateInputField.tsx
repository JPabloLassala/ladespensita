import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import dayjs from "dayjs";
import { useRef } from "react";

export function DateInputField({ label, id }: { label: string; id: string }) {
  const datePickerRef = useRef<HTMLInputElement>(null);
  const enableInputRef = useRef<HTMLInputElement>(null);

  const setDefaultDate = () => {
    const today = dayjs().format("YYYY-MM-DD");
    if (!datePickerRef.current || !enableInputRef.current) return;

    if (!datePickerRef.current.value) {
      datePickerRef.current.value = today;
      enableInputRef.current.checked = true;
    }
    datePickerRef.current.showPicker();
  };
  const handleClearInput = () => {
    if (!datePickerRef.current || !enableInputRef.current) return;

    datePickerRef.current.value = "";
    enableInputRef.current.checked = false;
  };

  return (
    <div className="flex flex-col">
      <div className="mb-1 flex flex-row items-center">
        <input
          type="checkbox"
          name={`enable${id}`}
          id={`enable${id}`}
          ref={enableInputRef}
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
          ref={datePickerRef}
          type="date"
          onClick={setDefaultDate}
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
