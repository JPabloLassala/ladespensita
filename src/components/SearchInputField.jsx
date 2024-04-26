import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export function SearchInputField({ placeholder, label, id, onChange }) {
  return (
    <div className="flex w-1/5 flex-col">
      <div className="mb-1 flex flex-row items-center">
        <input id={`enable${id}`} name={`enable${id}`} type="checkbox" className="mr-1" />
        <label htmlFor={`enable${id}`} className=" font-semibold text-slate-700">
          {label}
        </label>
      </div>
      <div className="flex h-11 flex-row items-center rounded border border-slate-200 bg-white p-3">
        <FontAwesomeIcon icon={faSearch} className="text-slate-500" />
        <input
          type="text"
          id={id}
          name={id}
          placeholder={placeholder}
          onChange={onChange}
          className="ml-2 w-full bg-transparent text-sm text-slate-800 focus:outline-none"
        />
      </div>
    </div>
  );
}
