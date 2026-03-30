import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import img1 from "../../public/images/prod-1.png"

const DealSection = () => {
  const navigate = useNavigate();

  const [timeLeft, setTimeLeft] = useState({
    days: 2,
    hours: 23,
    minutes: 59,
    seconds: 50,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0)
          return { ...prev, seconds: prev.seconds - 1 };

        if (prev.minutes > 0)
          return {
            ...prev,
            minutes: prev.minutes - 1,
            seconds: 59,
          };

        if (prev.hours > 0)
          return {
            ...prev,
            hours: prev.hours - 1,
            minutes: 59,
            seconds: 59,
          };

        if (prev.days > 0)
          return {
            ...prev,
            days: prev.days - 1,
            hours: 23,
            minutes: 59,
            seconds: 59,
          };

        return {
          days: 2,
          hours: 23,
          minutes: 59,
          seconds: 50,
        };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const dealData = {
    title: "Deal Of The Week",
    image:img1,
      
    timer: [
      { value: timeLeft.days, unit: "Days" },
      { value: timeLeft.hours, unit: "Hours" },
      { value: timeLeft.minutes, unit: "Mins" },
      { value: timeLeft.seconds, unit: "Sec" },
    ],
    buttonText: "SHOP NOW",
  };

  return (
    <section className="w-full bg-[#cbbd86] py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-10">

          <div className="flex justify-center">
            <img
              src={dealData.image}
              alt="Deal"
              className="w-full max-w-[350px] sm:max-w-[450px] md:max-w-[500px] lg:max-w-[600px] object-contain"
            />
          </div>

          <div className="text-center lg:text-left">
            <p className="uppercase tracking-widest text-white text-sm mb-4">
              Deal of the Month
            </p>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-8">
              {dealData.title}
            </h2>

            <div className="flex justify-center lg:justify-start gap-6 mb-8">
              {dealData.timer.map((item, index) => (
                <div key={index} className="text-center">
                  <div className="bg-white text-black w-16 h-16 flex items-center justify-center rounded-full font-bold text-lg">
                    {item.value}
                  </div>
                  <p className="text-white text-xs uppercase mt-2">
                    {item.unit}
                  </p>
                </div>
              ))}
            </div>

            <button
              onClick={() => navigate("/shop")}
              className="bg-black text-white px-8 py-3 font-bold uppercase tracking-wider hover:bg-gray-800 transition"
            >
              {dealData.buttonText}
            </button>

          </div>

        </div>
      </div>
    </section>
  );
};

export default DealSection;