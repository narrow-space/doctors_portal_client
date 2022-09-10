import React from 'react';
import doctor from '../../../assets/images/doctor.png'
import Primarybtn from '../../Shared/PrimaryBtn/Primarybtn';


const MakeAppiontment = () => {
    return (
        <section  className="mt-20  " >
            <div className="flex h-96 lg:h-5/6	  bg-[url('/src/assets/images/appointment.png')] items-center justify-center ">
            <div className='flex-1 hidden lg:block'>
             <img className='mt-[-100px]' src={doctor} alt="" />
            </div>
            <div className='flex-1 text-white px-5 ' >
                <h3 className=' text-xl text-secondary font-bold '>Appointment</h3>
                <h2 className='text-3xl font-bold py-3 '>Make an appointment Today</h2>
                <p className='lg:py-3 py-3' >Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem cum ea sunt fuga laborum, non harum cumque laudantium nisi. Dicta aliquam non magnam assumenda saepe ab nisi sit libero eligendi.</p>
                <Primarybtn>GET STARTED</Primarybtn>
            </div>
            </div>
            
        </section>
    );
};

export default MakeAppiontment;