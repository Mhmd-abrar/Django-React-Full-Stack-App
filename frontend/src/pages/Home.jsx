import { useState, useEffect, useRef } from "react";
import api from "../api";
import Chart from "chart.js/auto";
import "../styles/Home.css";
import MobileNavbar from "../components/MobileNavbar.jsx";

function Home() {
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState([]);
  const chartRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    api.get("/api/user/profile/").then((res) => setUser(res.data)).catch((err) => alert(err));
    api.get("/api/user/stats/?period=week")
      .then((res) => {
        setStats(res.data);
        if (chartRef.current) chartRef.current.destroy();
        const ctx = canvasRef.current.getContext("2d");
        chartRef.current = new Chart(ctx, {
          type: "line",
          data: {
            labels: res.data.map((s) => s.date),
            datasets: [{ label: "Login/Greeting Count", data: res.data.map((s) => s.count), borderColor: "#3b82f6", fill: false }],
          },
          options: { responsive: true, scales: { y: { beginAtZero: true } } },
        });
      })
      .catch((err) => alert(err));
    return () => { if (chartRef.current) chartRef.current.destroy(); };
  }, []);

  return (
    <div className="home-container">
      <div className="home-content">
        <h1>Hello, {user ? user.username : "Guest"}!</h1>
        <div>
          <h2>Activity Statistics</h2>
          <canvas ref={canvasRef} id="statsChart" style={{ maxWidth: "100%" }}></canvas>
        </div>
      </div>
      <MobileNavbar />
    </div>
  );
}

export default Home;
