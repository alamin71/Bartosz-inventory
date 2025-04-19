"use client";
import { useEffect, useState } from "react";

const DynamicDataDisplay = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const sheetId = "1pa0Gzbo6mW_IAuuWgfWpfBsG76ESrJX0OkItWiXltpE";
    const sheetRange = "Values"; // Change this to your sheet's name
    const sheetURL = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${sheetRange}?key=${process.env.NEXT_PUBLIC_GOOGLE_SHEET_API_KEY}`;
    console.log(process.env.NEXT_PUBLIC_GOOGLE_SHEET_API_KEY);

    const fetchData = async () => {
      try {
        const response = await fetch(sheetURL);
        const result = await response.json();
        const rows = result.values;

        // Get the header (first row) and the rest of the data
        const header = rows[0];
        const dataRows = rows.slice(1); // Data rows after the header

        // Filter data for specific rows based on the first column (description)
        const filteredData = dataRows.filter((row) =>
          [
            "[In prevented losses] Cost reduction (starting value)",
            "[In improved revenue] Revenue increase (starting value)",
            "[Reduced hours of work] Manhour reduction (starting value)",
          ].includes(row[0])
        );
        console.log("🚀 ~ fetchData ~ filteredData:", filteredData);

        // Set filtered data in state
        setData({ header, filteredData });
      } catch (error) {
        setError("Failed to load data");
        console.error(error);
      }
    };

    fetchData();
  }, []);

  if (error) {
    return <p>{error}</p>;
  }

  if (!data) {
    return <p>Loading data...</p>; // Show loading text while data is fetched
  }

  return (
    <div>
      <h1>Filtered Data from Google Sheets</h1>

      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            {data.header.map((col, colIndex) => (
              <th
                key={colIndex}
                style={{
                  padding: "8px",
                  border: "1px solid #ddd",
                  backgroundColor: "#f4f4f4",
                }}
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {data.filteredData.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, colIndex) => (
                <td
                  key={colIndex}
                  style={{ padding: "8px", border: "1px solid #ddd" }}
                >
                  {cell || "N/A"}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DynamicDataDisplay;
