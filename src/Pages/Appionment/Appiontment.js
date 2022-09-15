import React, { useEffect, useState } from "react";
import chair from "../../assets/images/chair.png";
import AvailableAppiontment from "./AvailableAppiontment";
import Treatmentservices from "./Treatmentservices";

import moment from "moment";

import { DayPicker, ClassNames } from "react-day-picker";
import "react-day-picker/dist/style.css";

import styles from "react-day-picker/dist/style.css";
import { format } from "date-fns";

const Appiontment = ({ setTheme, theme }) => {
  const [date, setDate] = useState(moment().toDate());
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

  const css = `

  .my-selected:not([disabled]) { 
    font-weight:bold; 
    border:2px solid blue;
    background-color:blue;
  }
  .my-selected:hover:not([disabled]) { 
    border-color:red;
    background-color:blue;
  }
  .my-today { 
    font-weight: bold;
    font-size: 140%; 
    color: dark;
    background-color:blue
  }
  

  
 
  .rdp-button:not([disabled]) {
    cursor: pointer;
   
  }
  
  .rdp-button:hover:not([disabled]) {
    background-color:blue;
    border: 2px solid blue;
    font-weight: bold;
    font-size: 140%; 
  }
 
 
  
 

  .custom-head { color: white }
  
  
  .rdp-tbody {
   
    color:white
    
  }
  .rdp-nav {
    color:red
  }
  .rdp-head {
    color:white
  }
  
`;

  const classNames: ClassNames = {
    ...styles,
    head: "custom-head",
  };

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
            {theme === "dark" ? (
              <style>{css}</style>
            ) : (
              <style>{`.custom-head { color: black }
         
         .my-selected:not([disabled]) { 
          font-weight:bold; 
          border:2px solid red;
        }
        .my-selected:hover:not([disabled]) { 
          border-color:red;
          color:blue;
        }
        .my-today { 
          font-weight:bold;
          font-size:140%; 
          color:blue;
          
          
        }
         
         `}</style>
            )}
            <DayPicker
              mode="single"
              selected={date}
              onSelect={setDate}
              modifiersClassNames={{
                selected: "my-selected",
                today: "my-today",
              }}
              modifiersStyles={{
                disabled: { fontSize: "75%" },
              }}
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
        {date ? (
          <AvailableAppiontment
            date={date}
            setDate={setDate}
          ></AvailableAppiontment>
        ) : (
          <p className="text-center text-secondary font-semibold">
            Please Pick a Day 📅
          </p>
        )}
      </div>
    </div>
  );
};

export default Appiontment;
//  .my-selected:not([disabled]) {
//     font-weight: bold;
//     border: 2px solid currentColor;
//     background-color: red;
//   }
//   .my-selected:hover:not([disabled]) {
//     border-color: blue;
//     color: blue;
//     background-color: red;
//   }
//   .my-today {
//     font-weight: bold;
//     font-size: 140%;
//     color: white;
//     border: 2px solid currentColor;

//   }
