"use client";
import { useState } from "react";
import { DateRange, RangeKeyDict } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { ko } from "date-fns/locale";

type DateRangePickerProps = {
  onDateSelect: (startDate: string, endDate: string) => void;
};

const DateRangePicker: React.FC<DateRangePickerProps> = ({ onDateSelect }) => {
  const [selectionRange, setSelectionRange] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });

  const handleSelect = (ranges: RangeKeyDict) => {
    const range = ranges.selection;
    if (range.startDate && range.endDate) {
      setSelectionRange({
        startDate: range.startDate,
        endDate: range.endDate,
        key: range.key || "selection",
      });
      onDateSelect(range.startDate.toISOString(), range.endDate.toISOString());
    }
  };

  return (
    <DateRange
      ranges={[selectionRange]}
      onChange={handleSelect}
      locale={ko}
      minDate={new Date()}
      moveRangeOnFirstSelection={true}
    />
  );
};

export default DateRangePicker;
