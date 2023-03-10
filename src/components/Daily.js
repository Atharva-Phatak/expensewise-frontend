import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Segregator } from "../utilities/Categorysegregator";
import DoughnutChart from "./DoughnutChart";
import Investment from "../assets/Investment.svg";

let total = 0;

export default function Daily() {
  const navigate = useNavigate();
  const [haveSpent, setHaveSpent] = useState(true);
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
      },
    ],
    labels: [],
  });

  useEffect(() => {
    async function fetchDailyData() {
      const res = await fetch("/expense/getdailyexpense");
      const data = await res.json();
      console.log(data);
      if (data.error) {
        navigate("/");
      } else {
        const Segregated = Segregator(data.filterData);
        if (Segregated[1] === 0) {
          setHaveSpent(false);
        } else {
          setHaveSpent(true);
        }
        total = Segregated[1];
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
            },
          ],
          options: {cutout: 200},
          labels: Object.keys(Segregated[0]),
        });
      }
    }
    fetchDailyData();
  }, []);
  return (
    <div className="pt-2 lg:pt-0 pb-10 lg:pb-0 ">
      <div className="bg-black lg:w-3/4 w-[86%] p-5 flex lg:m-auto ml-5 lg:mt-28  rounded-md justify-center">
        <h1 className="font-bold text-xl font-lexand text-white mr-3 mt-3">
          Today's Spending
        </h1>
        <span className="font-bold text-2xl font-lexend text-white bg-rose-600 p-3 rounded-md">
          {total}
        </span>
      </div>
      <div className="lg:w-3/4 w-[86%] mx-5 lg:mt-3 mt-4 p-5 lg:m-auto bg-black rounded-lg ">
        {haveSpent ? (
          <DoughnutChart chartData={expenseData} />
        ) : (
          <img className="p-5 h-5/6 m-6" src={Investment} alt="join now" />
        )}
      </div>
    </div>
  );
}
