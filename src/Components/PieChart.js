import React from "react";
import { useTheme } from "@material-ui/core/styles";

import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

function useOptions(theme) {
  return {
    chart: {
      height: "250px",
      type: "pie",
    },
    xAxis: {
      type: "datetime",
    },
    yAxis: {
      max: 1000,
      min: -1000,
    },
    title: null,
    series: [
      {
        data: [
          {
            name: "Open Bookings",
            color: theme.palette.primary.main,
            y: 61.41,
            sliced: true,
            selected: true,
          },
          {
            name: "Revenue",
            color: theme.palette.secondary.main,
            y: 11.84,
          },
          {
            name: "Pending",
            color: theme.palette.error.main,
            y: 10.85,
          },
        ],
      },
    ],
    plotOptions: {
      series: {
        marker: {
          enabled: false,
        },
      },
    },
  };
}

export default function PieChart() {
  const theme = useTheme();
  const options = useOptions(theme);

  return <HighchartsReact highcharts={Highcharts} options={options} />;
}
