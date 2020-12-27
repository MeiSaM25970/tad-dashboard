import React, { useState } from "react";
import "react-modern-calendar-datepicker/lib/DatePicker.css";
import { Calendar } from "react-modern-calendar-datepicker";
const ShowCalendar = (props) => {
  const [selectedDay, setSelectedDay] = useState(null);

  const change = (e) => {
    setSelectedDay(e);
  };

  return (
    <Calendar
      value={selectedDay}
      onChange={change}
      shouldHighlightWeekends
      locale="fa" // add this
    />
  );
};

export default ShowCalendar;
