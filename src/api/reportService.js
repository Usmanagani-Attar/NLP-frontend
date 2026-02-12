import axios from "axios";

const API_URL = "https://nlp-gv28.onrender.com/api/reports";

// Fetch all reports
export const fetchReports = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// Generate a new report
export const generateReport = async (reportData) => {
  const response = await axios.post(`${API_URL}/generate`, reportData);
  return response.data;
};
