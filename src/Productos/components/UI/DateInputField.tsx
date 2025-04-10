import { faCalendar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Checkbox, Stack } from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import dayjs, { Dayjs } from "dayjs";
import { useEffect, useState } from "react";

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
  const [tmpDate, setTmpDate] = useState<Dayjs | undefined>(undefined);
  const calendarIcon = <FontAwesomeIcon icon={faCalendar} className="text-slate-500" />;

  function handleSetOrUnsetDate() {
    if (!tmpDate) return;

    if (tmpDate) {
      setTmpDate(value);
    } else {
      setTmpDate(undefined);
    }
  }

  useEffect(() => {
    if (tmpDate) {
      onSetDate(tmpDate.format("YYYY-MM-DD"));
    } else {
      onSetDate("");
    }
  }, [tmpDate]);

  return (
    <div className="flex flex-col">
      <Stack>
        <Checkbox onChange={handleSetOrUnsetDate} label={label} checked={!!tmpDate} />
        <DatePickerInput
          clearable
          name={`enable${id}`}
          id={`enable${id}`}
          leftSection={calendarIcon}
          onChange={(event) => (event ? setTmpDate(dayjs(event)) : setTmpDate(undefined))}
          placeholder={"asda"}
          valueFormat="DD / MM / YYYY"
        />
      </Stack>
    </div>
  );
}
