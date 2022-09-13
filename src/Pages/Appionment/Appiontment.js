import React, { useEffect, useState } from "react";
import chair from "../../assets/images/chair.png";
import AvailableAppiontment from "./AvailableAppiontment";
import Treatmentservices from "./Treatmentservices";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const Appiontment = () => {
  const treatServices = [
    {
      _id: 1,
      name: "Teeth Orthodontics",
    },
    {
      _id: 2,
      name: "Cosmetic Dentistry",
    },
    {
      _id: 3,
      name: "Teeth Cleaning",
    },
    {
      _id: 4,
      name: "Cavity Protection",
    },
    {
      _id: 5,
      name: "Pediatric Dental",
    },
    {
      _id: 6,
      name: "Oral Surgery",
    },
  ];

  const [date, setDate] = useState(new Date());

  return (
    <div>
      <div className="hero min-h-screen bg-[url('/src/assets/images/bg.png')] bg-cover bg-center bg-no-repeat">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <img
            src={chair}
            className="lg:w-[500px] rounded-lg shadow-2xl"
            alt=""
          />
          <div className="w-auto">
            <Calendar
          
            
        
              className="font-serif p-3 dark:bg-black  dark:text-white "
              onChange={setDate}
              value={date}
            />
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-2 px-12 my-5">
        {treatServices.map((ts) => (
          <Treatmentservices key={ts._id} ts={ts}></Treatmentservices>
        ))}
      </div>
      <div>
        <AvailableAppiontment
          date={date}
          setDate={setDate}
        ></AvailableAppiontment>
      </div>
    </div>
  );
};

export default Appiontment;
