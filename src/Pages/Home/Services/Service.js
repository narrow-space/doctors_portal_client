import React from 'react';

const Service = ({Service}) => {
    return (
        <div className="card shadow-xl ">
  <figure className="px-10 pt-10 ">
    <img className='w-28 h-28 rounded-xl'  src={Service.img} alt="Shoes" />
  </figure>
  <div className="card-body items-center text-center">
    <h2 className="card-title">{Service.name}</h2>
    <p>{Service.description}</p>
    
  </div>
</div>
    );
};

export default Service;