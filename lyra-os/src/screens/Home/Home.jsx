import { useEffect, useState } from "react";
import "../styles/home.css";

export default function Home() {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setNow(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const time = now.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  const date = now.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="screen-wrap">
      <div className="device">
        <div className="status">
          <span>LYRA OS</span>
          <span>100%</span>
        </div>

        <div className="clock">
          <h1>{time}</h1>
        </div>

        <div className="date">{date}</div>

        <div className="cards">
          <div className="card">
            <h3>Weather</h3>
            <p>22°C Partly Cloudy</p>
          </div>

          <div className="card">
            <h3>Spotify</h3>
            <p>No music playing</p>
          </div>

          <div className="card">
            <h3>Alarm</h3>
            <p>7:30 AM</p>
          </div>
        </div>
      </div>
    </div>
  );
}