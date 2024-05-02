import { faSearch, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ChangeEventHandler, useRef } from "react";

type SearchInputFieldProps = {
  placeholder: string;
  label: string;
  id: string;
};

export function SearchInputField({ placeholder, label, id }: SearchInputFieldProps) {
  const enableInputRef = useRef<HTMLInputElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const toggleCheckbox = () => {
    if (!enableInputRef.current) return;

    enableInputRef.current.checked = !enableInputRef.current.checked;
  };
  const handleOnChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    if (!enableInputRef.current) return;

    if (event.target.value && !enableInputRef.current.checked) {
      enableInputRef.current.checked = true;
    }
  };
  const handleClearInput = () => {
    if (!inputRef.current || !enableInputRef.current) return;
    inputRef.current.value = "";
    enableInputRef.current.checked = false;
  };

  return (
    <div className="flex w-1/5 flex-col">
      <div
        className="mb-1 flex flex-row items-center hover:cursor-pointer"
        onClick={toggleCheckbox}
      >
        <input
          ref={enableInputRef}
          id={`enable${id}`}
          name={`enable${id}`}
          type="checkbox"
          className="mr-1"
        />
        <label htmlFor={`enable${id}`} className=" font-semibold text-slate-700 select-none">
          {label}
        </label>
      </div>
      <div className="flex h-11 flex-row items-center rounded border border-slate-200 bg-white p-3">
        <FontAwesomeIcon icon={faSearch} className="text-slate-500" />
        <input
          type="text"
          id={id}
          name={id}
          ref={inputRef}
          placeholder={placeholder}
          onChange={handleOnChange}
          className="ml-2 w-full bg-transparent text-sm text-slate-800 focus:outline-none"
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
