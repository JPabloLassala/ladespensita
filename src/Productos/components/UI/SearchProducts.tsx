import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Checkbox, CloseButton, Stack, TextInput } from "@mantine/core";
import { ChangeEvent } from "react";

type SearchInputFieldProps = {
  placeholder: string;
  label: string;
  id: string;
  value: string;
  onChangeValue: (value: string) => void;
  searchEnabled: boolean;
  onToggleSearch: () => void;
};

export function SearchProducts({
  label,
  value,
  onChangeValue,
  searchEnabled,
  onToggleSearch,
}: SearchInputFieldProps) {
  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!searchEnabled) {
      onToggleSearch();
    }

    onChangeValue(e.target.value);
  };

  const handleClearInput = () => {
    if (searchEnabled) {
      onToggleSearch();
    }

    onChangeValue("");
  };

  const searchIcon = <FontAwesomeIcon icon={faSearch} className="text-slate-500" />;
  const clearIcon = <CloseButton onClick={handleClearInput} />;

  return (
    <Stack>
      <Checkbox onChange={onToggleSearch} label={label} checked={searchEnabled} />
      <TextInput
        leftSection={searchIcon}
        rightSection={clearIcon}
        onChange={handleOnChange}
        value={value}
      />
    </Stack>
  );
}
