import React from "react";
import { useState } from "react";
import { DayPicker } from "react-day-picker";

const About = () => {
  const [selectedDay, setSelectedDay] = useState(new Date());
  return (
    <div>
     <DayPicker
      selectedDay={selectedDay}
      setSelectedDay={setSelectedDay}
     />
    </div>
  );
};

export default About;
