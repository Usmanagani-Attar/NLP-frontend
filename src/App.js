import React, { useState } from "react";
import GenerateReportForm from "./components/GenerateReportForm";
import ReportList from "./components/ReportList";
import ReportCharts from "./components/ReportCharts"; 

function App() {
  const [refresh, setRefresh] = useState(false);

  const handleReportGenerated = () => {
    setRefresh(!refresh); // trigger reload
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>NLP Based Departmental Report Generator</h1>
      <GenerateReportForm onReportGenerated={handleReportGenerated} />
      <ReportList key={refresh} />
      <ReportCharts key={`charts-${refresh}`} /> {/* ✅ new charts component */}
    </div>
  );
}

export default App;
