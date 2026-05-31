import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Cloud,
  Music2,
  AlarmClock,
  BatteryFull,
  Home as HomeIcon,
  Play,
  SkipBack,
  SkipForward,
  Settings,
  Sun,
  Moon,
  Wifi,
} from "lucide-react";
import "../styles/home.css";

export default function Home() {
  const [now, setNow] = useState(new Date());
  const [sleepMode, setSleepMode] = useState(false);
  const [page, setPage] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
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

  const pages = ["Home", "Music", "Weather", "Settings"];

  return (
    <div className="screen-wrap">
      <motion.div className={`device ${sleepMode ? "sleep" : ""}`}>
        <div className="ambient-orb"></div>

        {!sleepMode && (
          <>
            <div className="status">
              <span>LYRA OS</span>
              <span className="battery">
                <BatteryFull size={16} /> 100%
              </span>
            </div>

            <div className="clock" onClick={() => setSleepMode(true)}>
              <h1>{time}</h1>
            </div>

            <div className="date">{date}</div>

            <div className="page-label">
              <HomeIcon size={15} />
              <span>{pages[page]}</span>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                className="page-panel"
                key={page}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.18}
                onDragEnd={(event, info) => {
                  if (info.offset.x < -80 && page < pages.length - 1) {
                    setPage(page + 1);
                  }

                  if (info.offset.x > 80 && page > 0) {
                    setPage(page - 1);
                  }
                }}
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -24 }}
                transition={{ duration: 0.28 }}
              >
                {page === 0 && <HomeCards />}
                {page === 1 && <MusicPage />}
                {page === 2 && <WeatherPage />}
                {page === 3 && <SettingsPage setSleepMode={setSleepMode} />}
              </motion.div>
            </AnimatePresence>

            <div className="nav-dots">
              {pages.map((_, index) => (
                <button
                  key={index}
                  className={page === index ? "active-dot" : ""}
                  onClick={() => setPage(index)}
                />
              ))}
            </div>
          </>
        )}

        {sleepMode && (
          <motion.div className="sleep-clock" onClick={() => setSleepMode(false)}>
            <h1>{time}</h1>
            <p>Tap to wake LYRA</p>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}

function HomeCards() {
  return (
    <div className="cards">
      <div className="card">
        <Cloud size={28} />
        <h3>Weather</h3>
        <p>22°C<br />Partly Cloudy</p>
      </div>

      <div className="card">
        <Music2 size={28} />
        <h3>Spotify</h3>
        <p>No music<br />playing</p>
      </div>

      <div className="card">
        <AlarmClock size={28} />
        <h3>Alarm</h3>
        <p>7:30 AM<br />Weekdays</p>
      </div>
    </div>
  );
}

function MusicPage() {
  return (
    <div className="music-page">
      <div className="album-art">
        <Music2 size={64} />
      </div>

      <h2>Nothing Playing</h2>
      <p>Connect Spotify later</p>

      <div className="music-controls">
        <button><SkipBack size={22} /></button>
        <button className="play-btn"><Play size={26} /></button>
        <button><SkipForward size={22} /></button>
      </div>
    </div>
  );
}

function WeatherPage() {
  return (
    <div className="weather-page">
      <Cloud size={74} />
      <h2>22°C</h2>
      <p>Partly Cloudy</p>

      <div className="weather-row">
        <span>Humidity</span>
        <strong>78%</strong>
      </div>

      <div className="weather-row">
        <span>Wind</span>
        <strong>9 km/h</strong>
      </div>
    </div>
  );
}


function SettingsPage({ setSleepMode }) {
  return (
    <div className="settings-page">
      <div className="setting-row">
        <div>
          <Sun size={22} />
          <span>Brightness</span>
        </div>
        <strong>80%</strong>
      </div>

      <div className="setting-row">
        <div>
          <Moon size={22} />
          <span>Sleep Mode</span>
        </div>
        <button onClick={() => setSleepMode(true)}>Start</button>
      </div>

      <div className="setting-row">
        <div>
          <Wifi size={22} />
          <span>Wi-Fi</span>
        </div>
        <strong>Connected</strong>
      </div>

      <div className="setting-row">
        <div>
          <Settings size={22} />
          <span>LYRA OS</span>
        </div>
        <strong>v0.1</strong>
      </div>
    </div>
  );
}
