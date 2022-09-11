import { format } from "date-fns";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import Loader from "../Shared/Loader";
import BookingModal from "./BookingModal";
import Service from "./Service";
const axios = require("axios");

const AvailableAppiontment = ({ footer, date, setDate }) => {
  const [treatment, setTreatment] = useState(null);
  const selectedDate = "Please Select a Day";
  const formatedDate = format(date, "PP");

  const {
    
    data: services,
    isLoading,
    error,
    refetch,
  } = useQuery(["availabe", formatedDate],()=> fetch(`https://stormy-tundra-64733.herokuapp.com/available?date=${formatedDate}`).then(res =>
  res.json()
)
)



  if (isLoading) {
    return <Loader />;
  }

  // useEffect(() => {

  //   axios.get(`https://stormy-tundra-64733.herokuapp.com/available?date=${formatedDate}`).then(
  //     (response) => {
  //       setServices(response.data);
  //     },
  //     (error) => {
  //       console.log(error);
  //     }
  //   );
  // }, [formatedDate]);

  return (
    <div className="my-10">
      <h2 className="text-center text-secondary font-semibold">
        {date ? (
          <p>Available Appiontment on {format(date, "PPP")}.</p>
        ) : (
          <p>Please Select a Day</p>
        )}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-3 px-5 lg:px-12 my-10">
        {services?.map((sr) => (
          <Service setTreatment={setTreatment} key={sr._id} sr={sr}></Service>
        ))}
      </div>
      {treatment && (
        <BookingModal
          setTreatment={setTreatment}
          treatment={treatment}
          date={date}
          refetch={refetch}
        ></BookingModal>
      )}
    </div>
  );
};

export default AvailableAppiontment;
