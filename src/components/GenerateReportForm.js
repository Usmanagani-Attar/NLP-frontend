import React, { useState } from "react";
import { generateReport } from "../api/reportService";

function GenerateReportForm({ onReportGenerated }) {
  const [title, setTitle] = useState("");
  const [department, setDepartment] = useState("");
  const [rawText, setRawText] = useState("");
  const [response, setResponse] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await generateReport({ title, department, rawText });
      setResponse(result);
      if (onReportGenerated) onReportGenerated(); // refresh report list
    } catch (err) {
      console.error("Error generating report:", err);
    }
  };

  return (
    <div style={{ marginBottom: "40px" }}>
      <h2>📝 Generate New Report</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Report Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Department"
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
          required
        />
        <textarea
          placeholder="Paste your raw data text here..."
          value={rawText}
          onChange={(e) => setRawText(e.target.value)}
          required
          rows="6"
          style={{ width: "100%", marginTop: "10px" }}
        />
        <br />
        <button type="submit">Generate Report</button>
      </form>

      {response && (
        <div style={{ marginTop: "20px" }}>
          <h3>✅ Generated Summary</h3>
          <p><strong>Department:</strong> {response.department}</p>
          <p><strong>Summary:</strong> {response.summary}</p>
        </div>
      )}
    </div>
  );
}

export default GenerateReportForm;
