import { Dropdown } from "flowbite-react";
import { useEffect, useState } from "react";

const formatDate = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const formatDateVerbose = (date: Date) => {
  const year = date.getFullYear();
  const monthNames = [
    "Ene",
    "Feb",
    "Mar",
    "Abr",
    "May",
    "Jun",
    "Jul",
    "Ago",
    "Sep",
    "Oct",
    "Nov",
    "Dic",
  ];
  const month = monthNames[date.getMonth()];
  const day = String(date.getDate()).padStart(2, "0");
  return `${month} ${day}, ${year}`;
};

interface DatepickerProps {
  onRangeSelect: (range: string) => void;
  initialDays?: number;
}

const Datepicker = ({ onRangeSelect, initialDays = 0 }: DatepickerProps) => {
  const getEcuadorTime = () => {
    const now = new Date();
    return new Date(
      now.toLocaleString("en-US", { timeZone: "America/Guayaquil" })
    );
  };

  const today = getEcuadorTime();
  const [selectedRange, setSelectedRange] = useState<{
    text: string;
    range: string;
    verboseRange: string;
  }>({
    text: "Hoy",
    range: `${formatDate(today)} - ${formatDate(today)}`,
    verboseRange: `${formatDateVerbose(today)}`,
  });

  useEffect(() => {
    if (initialDays !== 0) {
      handleSelect(initialDays, getTextForDays(initialDays));
    }
  }, [initialDays]);

  const handleSelect = (days: number, text: string) => {
    const endDate = getEcuadorTime();
    const startDate = getEcuadorTime();
    if (days === 1 && text === "Ayer") {
      startDate.setDate(endDate.getDate() - 1);
      endDate.setDate(endDate.getDate() - 1);
    } else {
      startDate.setDate(endDate.getDate() - days);
    }
    const range = `${formatDate(startDate)} - ${formatDate(endDate)}`;
    const verboseRange =
      days === 0 || days === 1
        ? `${formatDateVerbose(startDate)}`
        : `${formatDateVerbose(startDate)} - ${formatDateVerbose(endDate)}`;
    setSelectedRange({ text, range, verboseRange });
    onRangeSelect(range);
  };

  const getTextForDays = (days: number) => {
    switch (days) {
      case 1:
        return "Ayer";
      case 0:
        return "Hoy";
      case 7:
        return "Últimos 7 días";
      case 30:
        return "Últimos 30 días";
      case 90:
        return "Últimos 90 días";
      default:
        return "Hoy";
    }
  };

  return (
    <span className="text-sm dark:text-white text-gray-800 w-56">
      <Dropdown
        inline
        label={selectedRange.text}
        dismissOnClick={true}
        className="w-56"
      >
        <Dropdown.Header className="text-gray-800 font-bold text-center">
          {selectedRange.verboseRange}
        </Dropdown.Header>
        <Dropdown.Item onClick={() => handleSelect(1, "Ayer")}>
          Ayer
        </Dropdown.Item>
        <Dropdown.Item onClick={() => handleSelect(0, "Hoy")}>
          Hoy
        </Dropdown.Item>
        <Dropdown.Item onClick={() => handleSelect(7, "Últimos 7 días")}>
          Últimos 7 días
        </Dropdown.Item>
        <Dropdown.Item onClick={() => handleSelect(30, "Últimos 30 días")}>
          Últimos 30 días
        </Dropdown.Item>
        <Dropdown.Item onClick={() => handleSelect(90, "Últimos 90 días")}>
          Últimos 90 días
        </Dropdown.Item>
      </Dropdown>
    </span>
  );
};

export default Datepicker;
