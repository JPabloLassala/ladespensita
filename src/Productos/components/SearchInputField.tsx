import { faSearch, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRef } from "react";

type SearchInputFieldProps = {
  placeholder: string;
  label: string;
  id: string;
  value: string;
  onChangeValue: (value: string) => void;
  searchEnabled: boolean;
  onToggleSearch: () => void;
};

export function SearchInputField({
  placeholder,
  label,
  id,
  value,
  onChangeValue,
  searchEnabled,
  onToggleSearch,
}: SearchInputFieldProps) {
  const enableInputRef = useRef<HTMLInputElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleOnChange = (value: string) => {
    if (!searchEnabled) {
      onToggleSearch();
    }

    onChangeValue(value);
  };

  const handleClearInput = () => {
    if (searchEnabled) {
      onToggleSearch();
    }

    onChangeValue("");
  };

  const focusInput = () => {
    inputRef.current?.focus();
  };

  return (
    <div className="flex w-1/5 flex-col">
      <div className="mb-1 flex flex-row items-center" onClick={onToggleSearch}>
        <input
          ref={enableInputRef}
          checked={searchEnabled}
          onChange={onToggleSearch}
          id={`enable${id}`}
          name={`enable${id}`}
          type="checkbox"
          className="mr-1 hover:cursor-pointer"
        />
        <label
          onClick={onToggleSearch}
          htmlFor={`enable${id}`}
          className=" font-semibold text-slate-700 select-none hover:cursor-pointer"
        >
          {label}
        </label>
      </div>
      <div className="flex h-11 flex-row items-center rounded border border-slate-200 bg-white p-3">
        <FontAwesomeIcon icon={faSearch} className="text-slate-500" onClick={focusInput} />
        <input
          type="text"
          id={id}
          name={id}
          ref={inputRef}
          value={value}
          placeholder={placeholder}
          onChange={(e) => handleOnChange(e.target.value)}
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
