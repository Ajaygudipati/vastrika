// ServiceStepsTimeline.jsx
import React from 'react';

const ServiceStepsTimeline = () => {
  const steps = [
    "Book a Stitch",
    "We collect fabric, measurements & preferences",
    "Our expert tailors craft your perfect fit",
    "We deliver your elegance to your doorstep",
  ];

  return (
    <div className="fixed top-[30%] left-4 z-50 flex flex-col items-start space-y-3 font-zeyada text-black text-[18px] pointer-events-none select-none">
      {steps.map((step, index) => (
        <div key={index} className="flex flex-col items-start">
          <span className="whitespace-normal max-w-[200px] leading-snug">{step}</span>
          {index !== steps.length - 1 && (
            <span className="text-xl ml-2">↓</span>
          )}
        </div>
      ))}
    </div>
  );
};

export default ServiceStepsTimeline;
