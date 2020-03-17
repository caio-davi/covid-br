import React from "react";
import { Line } from "react-chartjs-2";
import "../styles/Linechart.css";
import { MDBContainer, MDBDataTable } from "mdbreact";

const sumStatus = (data, status) => {
  let count = 0;
  for (let i in data.values) {
    const state = data.values[i];
    if (state[status] !== undefined) {
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
  return datasets;
};

const chartData = (data, dataOptions) => {
  return {
    labels: labels(data),
    datasets: datasets(data, dataOptions)
  };
};

const tableContents = (statesInfo, dataOptions, getName) => {
  let rows = [];
  for (let state in statesInfo) {
    let row = {};
    row.name = getName(statesInfo[state].uid);
    for (let type in dataOptions) {
      if (statesInfo[state][type] !== undefined) {
        row[type] = statesInfo[state][type];
      } else {
        row[type] = 0;
      }
    }
    rows.push(row);
  }
  return rows;
};

const tableHeaders = dataOptions => {
  let headers = [];
  headers.push({
    label: "Estado",
    field: "name",
    sort: "asc"
  });
  for (let i in dataOptions) {
    let header = dataOptions[i];
    headers.push({
      label: header.name,
      field: i,
      sort: "asc"
    });
  }
  return headers;
};

const LineChart = props => {
  return (
    <MDBContainer>
      <div className="chart">
        <Line
          data={chartData(props.data, props.dataOptions)}
          options={{ responsive: true }}
        />
      </div>
      <div className="list">
        <MDBDataTable
          scrollY
          maxHeight="200px"
          striped
          bordered
          small
          data={{
            columns: tableHeaders(props.dataOptions),
            rows: tableContents(
              props.statesInfo,
              props.dataOptions,
              props.getName
            )
          }}
        />
      </div>
    </MDBContainer>
  );
};

export default LineChart;
