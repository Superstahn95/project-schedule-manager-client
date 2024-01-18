import { useEffect, useState } from "react";

function CountdownTimer({ countDownEndTime }) {
  const calculateTimeRemaining = () => {
    //get current time
    const now = new Date().getTime();
    //convert countDownEndTime which is a sring to an integer
    const endTime = parseInt(countDownEndTime, 10);
    //get difference
    const timeDifference = endTime - now;
    if (timeDifference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }
    const seconds = Math.floor((timeDifference / 1000) % 60);
    const minutes = Math.floor((timeDifference / (1000 * 60)) % 60);
    const hours = Math.floor((timeDifference / (1000 * 60 * 60)) % 24);
    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    return { days, hours, minutes, seconds };
  };
  const [timeRemaining, setTimeRemaining] = useState(calculateTimeRemaining());

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeRemaining(calculateTimeRemaining());
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);
  return (
    <div>
      <p className="text-red-500 text-lg ">{`${timeRemaining.days}: ${timeRemaining.hours}: ${timeRemaining.minutes}: ${timeRemaining.seconds}`}</p>
    </div>
  );
}

export default CountdownTimer;
