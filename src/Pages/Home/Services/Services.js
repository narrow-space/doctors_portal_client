import React from 'react';
import floride from "../../../assets/images/fluoride.png"
import cavity from "../../../assets/images/cavity.png"
import teethwhitening from "../../../assets/images/whitening.png"
import Service from './Service';

const Services = () => {
    const services = [

        {
            _id: 1,
            name: 'Fluoride Treatment',
            description: 'Lorem Ipsum is simply dummy printing and typesetting indust Ipsum has been the',
            img:floride
        }


               ,
        {
            _id:2,
            name: 'Fluoride Treatment',
            description: 'Lorem Ipsum is simply dummy printing and typesetting indust Ipsum has been the',
            img:cavity
           
           
                           },
        {
            _id:3,
            name: 'Fluoride Treatment',
            description: 'Lorem Ipsum is simply dummy printing and typesetting indust Ipsum has been the',
            img:teethwhitening
                   
                   
                                   }


    ]
    return (
        <div className='my-36 px-12  '>
            <h3 className=' font-sans  text-center text-2xl font-bold  leading-7	my-1.5 '>Our Services</h3>
            <h2 className=' font-sans text-center text-4xl font-normal leading-[3rem]  '>Services We Provide</h2>
            <div className='grid grid-cols-1 lg:grid-cols-3  gap-4'>
                {
                    services.map(sr=><Service key={sr._id}  Service={sr}></Service>)
                }
            </div>
        </div>
    );
};

export default Services;