import React from 'react';
import chair from '../../src/assets/images/chair.png'
import Primarybtn from '../Pages/Shared/PrimaryBtn/Primarybtn';
import bannercss from './bannercss.css'

   const Banner = () => {
    return (

     
       
        <div className="banner-div bg-[url('/src/assets/images/bg.png')] bg-cover  bg-no-repeat bg-center lg:mt-[-100px] ">
        <div className="hero min-h-screen  ">
  <div className="hero-content flex-col lg:flex-row-reverse">
    <img  src={chair} className="pic rounded-lg shadow-2xl lg:w-2/4		 " />
    <div>
      <h1 className="text-5xl font-bold">Your New Smile Starts Here</h1>
      <p className="py-6">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the</p>
     <Primarybtn>GET STARTED</Primarybtn>
     
    </div>
  </div>
</div>
       </div>
      
        
        );
};

export default Banner;