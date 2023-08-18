import React from "react";
import PieChartComponent from "./PieChartComponent";

const PieChartData = () => {
  const vehiclesData = {
    labels: ["New", "In Transit", "Received"],
    datasets: [
      {
        data: [100, 0, 0],
        backgroundColor: ["orange", "black", "yellow"],
      },
    ],
  };

  const ordersData = {
    labels: ["Pending", "In Transit", "Received"],
    datasets: [
      {
        data: [100, 0, 0],
        backgroundColor: ["orange", "black", "yellow"],
      },
    ],
  };

  const paymentsData = {
    labels: ["Pending", "Completed"],
    datasets: [
      {
        data: [100, 0],
        backgroundColor: ["orange", "black"],
      },
    ],
  };

  const complaintsData = {
    labels: ["No Data"],
    datasets: [
      {
        data: [100, 0],
        backgroundColor: ["black"],
      },
    ],
  };

  return (
    <div className="chart-row">
      <PieChartComponent title="" data={vehiclesData} />
      <PieChartComponent title="" data={ordersData} />
      <PieChartComponent title="" data={paymentsData} />
      <PieChartComponent title="" data={complaintsData} />
    </div>
  );
};

export default PieChartData;