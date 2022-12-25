import React, { useEffect, useState } from "react";
import moment from "moment";
import DoughnutChart from "./DoughnutChart";
import Popup from "../assets/popup.png";
import { Link, useNavigate } from "react-router-dom";
import { Segregator } from "../utilities/Categorysegregator";
import ReactTooltip from "react-tooltip";
let TotalSpent = 0;
// let Budget = 0;

export default function Home(props) {
  const navigate = useNavigate();
  //const chartOptions = 
  const [totalBudget, setTotalBudget] = useState();
  const [tooltip, showTooltip] = useState(true);
  const [expenseData, SetExpenseData] = useState({
    datasets: [
      {
        label: "Expense",
        data: [],
        borderColor: "black",
        backgroundColor: [
          "#ebac23",
          "#b80058",
          "#008cf9",
          "#006e00",
          "#ff9287",
          "#b24502",
          "#d163e6",
        ],
        //borderRadius : 30,
        //spacing: 10
      },
    ],
    labels: [],
  });
  const [monthlyBudget, setMonthlyBudget] = useState({
    datasets: [
      {
        data: [],
        borderColor: "black",
        backgroundColor: [
          "#ebac23",
          "#b80058",
          "#008cf9",
          "#006e00",
          "#ff9287",
          "#b24502",
          "#d163e6",
        ],
      },
    ],
  });
  useEffect(() => {
    const startDate = new Date();
    const date = {
      // startDate: moment().format("MMM d YYYY "),
      startdate: new Date(
        startDate.getFullYear(),
        startDate.getMonth(),
        1
      ).toDateString(),
      enddate: new Date(
        startDate.getFullYear(),
        startDate.getMonth(),
        startDate.getDate() + 1
      ).toDateString(),
    };
    console.log(date);
    const getHomeChartdata = async (e) => {
      const res = await fetch("/expense/viewexpenseinrange", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(date),
      });

      let data = await res.json();

      if (data.errors) {
        navigate("/");
      } else {
        const Segregated = Segregator(data.expense);
        TotalSpent = Segregated[1];
        SetExpenseData({
          datasets: [
            {
              label: "Expense",
              data: Object.values(Segregated[0]),
              borderColor: "black",
              backgroundColor: [
                "#ebac23",
                "#b80058",
                "#008cf9",
                "#006e00",
                "#ff9287",
                "#b24502",
                "#d163e6",
              ],
              hoverOffset: 2,
            },
          ],
          options: {cutout: 200},
          labels: Object.keys(Segregated[0]),
        });
      }
    };
    async function handleGetBudget() {
      const res = await fetch("/expense/getBudget");
      let data = await res.json();
      setTotalBudget(data.budget.$numberDecimal);
      let remaining = data.budget.$numberDecimal - TotalSpent;

      if (remaining < 0) {
        remaining = 0;
      }

      if (data.error) {
        navigate("/");
      } else {
        setMonthlyBudget({
          datasets: [
            {
              data: [TotalSpent, remaining],
              borderColor: "black",
              backgroundColor: ["#f87171", "#fbbf24"],
            },
          ],
        });
      }
    }
    handleGetBudget();
    getHomeChartdata();
  }, []);

  return (
    <div className="lg:mt-10 mt-0 py-6 lg:py-0">
      <div className="lg:m-auto lg:ml-auto ml-4  lg:w-3/4 p-5 mx-8 rounded-md  lg:mt-8 bg-black text-white">
        <div className="flex justify-between text-md">
          <p>
            {moment().format("MMM 1")} - {moment().format("MMM D")}
          </p>
          <p>{Math.floor((TotalSpent / totalBudget) * 100)}% budget used</p>
        </div>
        <div className="flex justify-between items-center">
          <div className="flex">
            <h3 className="text-sm">
              <span className="text-2xl">₹{TotalSpent}/{totalBudget}</span>
            </h3>
            <button
              onClick={props.openModalBudget}
              className="flex justify-center items-center hover:scale-110"
              data-tip="Set Budget"
              onMouseEnter={() => showTooltip(true)}
              onMouseLeave={() => {
                showTooltip(false);
                setTimeout(() => showTooltip(true), 50);
              }}
            >
              <span className="inline-block cursor-pointer">
                <img className="ml-2 w-5" src={Popup}></img>
              </span>
            </button>
            {tooltip ? (
              <ReactTooltip place="bottom" type="dark" effect="solid" />
            ) : null}
          </div>
          <div className="w-9">
            <DoughnutChart chartData={monthlyBudget} />
          </div>
        </div>
        <div></div>
      </div>
      <div className="bg-black rounded-md lg:p-5 p-3  lg:m-auto lg:mt-4 mt-4 lg:w-3/4 mx-6 ml-3  cursor-pointer">
        <DoughnutChart chartData={expenseData} />
      </div>
    </div>
  );
}
