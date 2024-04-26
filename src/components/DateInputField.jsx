import dayjs from "dayjs";
import { useRef } from "react";

export function DateInputField({ label, id }) {
  const datePickerRef = useRef();

  function setDefaultDate() {
    const today = dayjs().format("YYYY-MM-DD");
    if (!datePickerRef.current.value) {
      datePickerRef.current.value = today;
    }
  }

  return (
    <div className="flex flex-col">
      <div className="mb-1 flex flex-row items-center">
        <input type="checkbox" name={`enable${id}`} id={`enable${id}`} className="mr-1" />
        <label htmlFor={`enable${id}`} className="font-semibold text-slate-700">
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
      </div>
    </div>
  );
}
