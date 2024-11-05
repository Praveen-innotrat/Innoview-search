import React from "react";
import "./Recruiter.css";
import Chart from "react-apexcharts";

function RecruitersDashboard() {
  let chartData = {
    options: {
      chart: {
        type: "donut",
      },
      plotOptions: {
        pie: {
          donut: {
            size: "70%",
            labels: {
              show: true,
              total: {
                show: true,
                label: "Total",
                formatter: function (w) {
                  return w.globals.series[0];
                },
              },
            },
          },
        },
      },
      dataLabels: {
        enabled: false, // Disables individual data labels on the chart
      },
      legend: {
        show: true,
        position: "bottom",
        formatter: function (seriesName, opts) {
          // Custom formatter to show values in the legend
          return seriesName + ": " + opts.w.globals.series[opts.seriesIndex];
        },
      },
      labels: ["Total", "Shortlisted", "Pending", "Rejected"],
    },
    series: [44, 12, 18, 14],
  };

  return (
    <>
      <div className="recruiter-dashboard-wrapper">
        <div className="recruiter-dashboard-container">
          <div className="recruiter-piechart">
            <Chart
              options={chartData.options}
              series={chartData.series}
              type="donut"
              width="500"
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default RecruitersDashboard;
