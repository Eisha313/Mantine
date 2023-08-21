import React from "react";
import { Pie } from "react-chartjs-2";
import "./PieChart.css";
const PieChartComponent = ({ title, data }) => {
  return (
    <div
      className="chart-container"
      style={{
        display: "flex",
        flexDirection: "column",
        border: "1px solid orange",
        justifyContent:'space-between',
      }}
    >
      <h2 style={{ textAlign: "center" }}>{title}</h2>
      <div className="charts-row">
        <div
          className="chart-column"
          style={{ width: "250px", height: "250px" }}
        >
          <Pie
            data={data}
            options={{
              plugins: {
                title: {
                  // display: true,
                  text: title,
                },
                legend: {
                  display: true,
                },

              },
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default PieChartComponent;
