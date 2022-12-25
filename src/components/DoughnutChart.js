import React from "react";
import { Doughnut } from "react-chartjs-2";
export default function DoughnutChart(props) {
  console.log(props.chartData)
  return <Doughnut data={props.chartData} options={props.options} />;
}
