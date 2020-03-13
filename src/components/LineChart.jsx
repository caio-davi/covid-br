import React from "react";
import { Line } from "react-chartjs-2";
import "../styles/Linechart.css";

const sumStatus = (data, status) => {
  let count = 0;
  for (let i in data.values) {
    const state = data.values[i];
    if (state[status] != undefined) {
      count = count + state[status];
    }
  }
  return count;
};

const labels = data => {
  let dates = [];
  for (let i in data) {
    dates.push(data[i].date);
  }
  return dates;
};

const buildDataset = (data, label) => {
  let values = [];
  for (let i in data) {
    values.push(sumStatus(data[i], label));
  }
  return values;
};

const datasets = (data, dataOptions) => {
  let datasets = [];
  for (let key in dataOptions) {
    datasets.push({
      label: dataOptions[key].name,
      data: buildDataset(data, key),
      borderColor: dataOptions[key].borderColor,
      backgroundColor: dataOptions[key].backgroundColor
    });
  }
  console.log(datasets);
  return datasets;
};

const chartData = (data, dataOptions) => {
  return {
    labels: labels(data),
    datasets: datasets(data, dataOptions)
  };
};

const LineChart = props => {
  return (
    <div>
      <div className="container">
        <Line
          data={chartData(props.data, props.dataOptions)}
          options={{ responsive: true }}
        />
      </div>
      <div style={{margin:'5em'}}>
          Fonte: Ministério da Saúde do Brasil.
      </div>
    </div>
  );
};

export default LineChart;
