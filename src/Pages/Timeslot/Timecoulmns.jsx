import { ColumnFilter } from "../../Components/PatientTable/ColumnFilter";
import { format } from "date-fns";
function convertTimeToAmPm(timeString) {
  // Split the time string into hours and minutes
  const [hours, minutes] = timeString.split(":");

  // Convert the hours to 12-hour format
  let convertedHours = parseInt(hours);
  if (convertedHours >= 12) {
    convertedHours = convertedHours === 12 ? 12 : convertedHours - 12; // Handle noon case
    const isPm = true;
    return `${convertedHours}:${minutes} ${isPm ? "PM" : "AM"}`;
  } else {
    const isPm = false;
    return `${convertedHours}:${minutes} ${isPm ? "PM" : "AM"}`;
  }
}
export const TimeCoulmn = [
  {
    Header: "Start Time",
    accessor: "start_time",
    Filter: ColumnFilter,
    Cell: ({ value }) => {
      return convertTimeToAmPm(value);
    },
  },
  {
    Header: "End Time",
    accessor: "end_time",
    Filter: ColumnFilter,
    Cell: ({ value }) => {
      return convertTimeToAmPm(value);
    },
  },

  {
    Header: "Days",
    accessor: "days",
    Filter: ColumnFilter,
    Cell: ({ value }) => {
      return value.map((val, index) => {
        return (
          <span>
            {val} {value.length - 1 !== index ? ", " : ""}
          </span>
        );
      });
    },
  },
];
