import React from 'react';
import Infocard from './Infocard';
import clock from  "../../assets/icons/clock.svg"
import marker from  "../../assets/icons/marker.svg"
import phone from  "../../assets/icons/phone.svg"
import infocss from './info.css'



const Info = () => {
    return (
        <div className=' info grid grid-cols-1 lg:grid-cols-3 px-12  gap-4'>
           <Infocard img={clock}  bg="bg-gradient-to-r from-secondary to-accent" cardTitle="Opening Hour"></Infocard>
           <Infocard img={marker} bg="bg-primary" cardTitle="Visit Our Location"></Infocard>
           <Infocard img={phone}  bg="bg-gradient-to-r from-secondary to-accent" cardTitle="Contact Us Now"></Infocard>
        </div>
    );
};

export default Info;