import React, { useEffect, useState } from "react";
import axios from "axios";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(ArcElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend);

function ReportCharts() {
  const [reports, setReports] = useState([]);
  const [selectedDept, setSelectedDept] = useState("All");

  useEffect(() => {
    axios
      .get("https://nlp-gv28.onrender.com/api/reports")
      .then((res) => setReports(res.data))
      .catch((err) => console.error("Error fetching reports:", err));
  }, []);

  // Unique departments for dropdown
  const departments = ["All", ...new Set(reports.map((r) => r.department))];

  // Apply department filter
  const filteredReports =
    selectedDept === "All"
      ? reports
      : reports.filter((r) => r.department === selectedDept);

  if (reports.length === 0)
    return <p style={{ marginTop: "20px" }}>No reports available for chart display.</p>;

  // Count per department (for bar chart)
  const deptCounts = filteredReports.reduce((acc, r) => {
    acc[r.department] = (acc[r.department] || 0) + 1;
    return acc;
  }, {});

  // ✅ Updated sentiment count for pie chart
  const sentimentCounts = filteredReports.reduce(
    (acc, r) => {
      const s = r.sentiment
        ? r.sentiment
        : r.summary.includes("Positive")
        ? "Positive"
        : r.summary.includes("Negative")
        ? "Negative"
        : "Neutral";
      acc[s] = (acc[s] || 0) + 1;
      return acc;
    },
    { Positive: 0, Negative: 0, Neutral: 0 }
  );

  const deptData = {
    labels: Object.keys(deptCounts),
    datasets: [
      {
        label: "Reports per Department",
        data: Object.values(deptCounts),
        backgroundColor: "#42A5F5",
      },
    ],
  };

  const sentimentData = {
    labels: ["Positive", "Negative", "Neutral"],
    datasets: [
      {
        label: "Sentiment Distribution",
        data: [
          sentimentCounts.Positive || 0,
          sentimentCounts.Negative || 0,
          sentimentCounts.Neutral || 0,
        ],
        backgroundColor: ["#4CAF50", "#f44336", "#9E9E9E"],
      },
    ],
  };

  return (
    <div style={{ marginTop: "40px" }}>
      <h2>📈 Analytics Dashboard</h2>

      {/* Filter Control */}
      <div style={{ marginBottom: "20px" }}>
        <label style={{ marginRight: "10px", fontWeight: "bold" }}>Filter by Department:</label>
        <select
          value={selectedDept}
          onChange={(e) => setSelectedDept(e.target.value)}
          style={{
            padding: "8px",
            borderRadius: "6px",
            border: "1px solid #ccc",
            fontSize: "0.95em",
          }}
        >
          {departments.map((dept, idx) => (
            <option key={idx} value={dept}>
              {dept}
            </option>
          ))}
        </select>
      </div>

      <div style={{ display: "flex", gap: "40px", flexWrap: "wrap" }}>
        <div style={{ width: "400px" }}>
          <h3>Department Reports</h3>
          <Bar data={deptData} />
        </div>

        <div style={{ width: "400px" }}>
          <h3>Sentiment Distribution</h3>
          <Pie data={sentimentData} />
        </div>
      </div>
    </div>
  );
}

export default ReportCharts;
