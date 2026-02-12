import React, { useEffect, useState } from "react";
import axios from "axios";

function ReportList() {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    axios
      .get("https://nlp-gv28.onrender.com/api/reports")
      .then((res) => setReports(res.data))
      .catch((err) => console.error("Error fetching reports:", err));
  }, []);

  const getBadgeColor = (sentiment) => {
    switch (sentiment?.toLowerCase()) {
      case "positive":
        return "#4CAF50"; // green
      case "negative":
        return "#f44336"; // red
      default:
        return "#2196F3"; // blue
    }
  };

  return (
    <div style={{ marginTop: "40px" }}>
      <h2>📊 Department Reports</h2>

      {reports.length === 0 ? (
        <p>No reports found yet. Generate one!</p>
      ) : (
        reports.map((r) => (
          <div
            key={r._id}
            style={{
              background: "#eee8e8ff",
              marginTop: "15px",
              padding: "20px",
              borderRadius: "12px",
              boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
            }}
          >
            <h3 style={{ marginBottom: "5px" }}>
              {r.title} — <span style={{ color: "#555" }}>{r.department}</span>
            </h3>
            <p style={{ marginBottom: "10px" }}>{r.summary}</p>

            {/* Sentiment Badge */}
            {r.sentiment && (
              <span
                style={{
                  backgroundColor: getBadgeColor(r.sentiment),
                  color: "white",
                  padding: "5px 10px",
                  borderRadius: "8px",
                  fontSize: "0.9em",
                  fontWeight: "bold",
                }}
              >
                {r.sentiment}
              </span>
            )}

            {/* Keyword Tags */}
            {r.keywords && r.keywords.length > 0 && (
              <div style={{ marginTop: "10px" }}>
                {r.keywords.map((kw, idx) => (
                  <span
                    key={idx}
                    style={{
                      display: "inline-block",
                      background: "#e0e0e0",
                      padding: "5px 8px",
                      borderRadius: "6px",
                      marginRight: "5px",
                      fontSize: "0.85em",
                    }}
                  >
                    #{kw}
                  </span>
                ))}
              </div>
            )}

            <p
              style={{
                color: "#a81d1dff",
                fontSize: "0.8em",
                marginTop: "8px",
              }}
            >
              Created: {new Date(r.createdAt).toLocaleString()}
            </p>
          </div>
        ))
      )}
    </div>
  );
}

export default ReportList;
