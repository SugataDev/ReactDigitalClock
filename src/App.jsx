import { useState, useEffect } from "react";
import "./App.css";

function App() {
  // Store the current time
  const [time, setTime] = useState(new Date());

  // Store the clock format
  const [is12HourFormat, setIs12HourFormat] = useState(false);

  // Update the clock every second
  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    // Stop the timer when the component is removed
    return () => clearInterval(timer);
  }, []);

  // Get hours, minutes, and seconds
  let hours = time.getHours();
  const minutes = time.getMinutes();
  const seconds = time.getSeconds();

  // Store AM or PM
  let ampm = "";

  // Convert to 12-hour format
  if (is12HourFormat) {
    ampm = hours >= 12 ? "PM" : "AM";

    hours = hours % 12;
    hours = hours === 0 ? 12 : hours;
  }

  // Add zero before single-digit numbers
  const formattedHours = String(hours).padStart(2, "0");
  const formattedMinutes = String(minutes).padStart(2, "0");
  const formattedSeconds = String(seconds).padStart(2, "0");

  // Format the date
  const formattedDate = time.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // Switch between 12-hour and 24-hour formats
  function toggleFormat() {
    setIs12HourFormat(!is12HourFormat);
  }

  return (
    <div className="clock-container">
      <div className="clock-wrapper">
        <div className="clock">
          {formattedHours}:{formattedMinutes}:{formattedSeconds}
        </div>

        {is12HourFormat && <div className="ampm">{ampm}</div>}
      </div>

      <div className="date">{formattedDate}</div>

      <button className="toggle-btn" onClick={toggleFormat}>
        {is12HourFormat
          ? "Switch to 24-Hour Format"
          : "Switch to 12-Hour Format"}
      </button>
    </div>
  );
}

export default App;
