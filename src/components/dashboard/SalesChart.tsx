import { useThemeMode } from "flowbite-react";
import { FC, useEffect, useMemo, useState } from "react";
import Chart from "react-apexcharts";
import { SalesSummary } from "../models/Order";

const SalesChart: FC<{ salesSummary: SalesSummary[] }> = ({ salesSummary }) => {
  const { mode } = useThemeMode();
  const isDarkTheme = mode === "dark";

  const formatDateVerbose = (date: Date) => {
    const monthNames = [
      "Ene",
      "Feb",
      "Mar",
      "Abr",
      "May",
      "Jun",
      "Jul",
      "Ago",
      "Sep",
      "Oct",
      "Nov",
      "Dic",
    ];

    const utcDate = new Date(date.getTime() + date.getTimezoneOffset() * 60000);

    const month = monthNames[utcDate.getMonth()];
    const day = String(utcDate.getDate()).padStart(2, "0");
    return `${day} ${month}`;
  };

  const formattedCategories = useMemo(
    () =>
      salesSummary.map((summary) => formatDateVerbose(new Date(summary.date))),
    [salesSummary]
  );

  const series = useMemo(
    () => [
      {
        name: "Porcentaje de avance",
        data: salesSummary.map((summary) => summary.orders),
        color: "#C8AB37",
      },
    ],
    [salesSummary]
  );

  const [options, setOptions] = useState<ApexCharts.ApexOptions>({
    stroke: {
      curve: "smooth",
    },
    chart: {
      type: "area",
      fontFamily: "Inter, sans-serif",
      foreColor: isDarkTheme ? "#93ACAF" : "#6B7280",
      zoom: {
        enabled: true,
      },
      toolbar: {
        show: false,
      },
    },
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.7,
        opacityTo: 0.9,
        colorStops: [
          {
            offset: 0,
            color: "#C8AB37",
            opacity: 0.7,
          },
          {
            offset: 100,
            color: "#C8AB37",
            opacity: 0.9,
          },
        ],
      },
    },
    dataLabels: {
      enabled: false,
    },
    tooltip: {
      style: {
        fontSize: "14px",
        fontFamily: "Inter, sans-serif",
      },
    },
    grid: {
      show: true,
      borderColor: isDarkTheme ? "#374151" : "#F3F4F6",
      strokeDashArray: 1,
      padding: {
        left: 35,
        bottom: 15,
      },
    },
    markers: {
      size: 5,
      strokeColors: "#ffffff",
      hover: {
        size: undefined,
        sizeOffset: 3,
      },
    },
    xaxis: {
      categories: salesSummary.map((summary) =>
        formatDateVerbose(new Date(summary.date))
      ),
      labels: {
        style: {
          colors: [isDarkTheme ? "#93ACAF" : "#6B7280"],
          fontSize: "14px",
          fontWeight: 500,
        },
      },
      axisBorder: {
        color: isDarkTheme ? "#374151" : "#F3F4F6",
      },
      axisTicks: {
        color: isDarkTheme ? "#374151" : "#F3F4F6",
      },
      crosshairs: {
        show: true,
        position: "back",
        stroke: {
          color: isDarkTheme ? "#374151" : "#F3F4F6",
          width: 1,
          dashArray: 10,
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: [isDarkTheme ? "#93ACAF" : "#6B7280"],
          fontSize: "14px",
          fontWeight: 500,
        },
        formatter: function (value) {
          return value + "%";
        },
      },
    },
    legend: {
      fontSize: "14px",
      fontWeight: 500,
      fontFamily: "Inter, sans-serif",
      labels: {
        colors: [isDarkTheme ? "#93ACAF" : "#6B7280"],
      },
      itemMargin: {
        horizontal: 10,
      },
    },
    responsive: [
      {
        breakpoint: 1024,
        options: {
          xaxis: {
            labels: {
              show: false,
            },
          },
        },
      },
    ],
  });

  useEffect(() => {
    setOptions((prevOptions) => ({
      ...prevOptions,
      chart: {
        ...prevOptions.chart,
        foreColor: isDarkTheme ? "#93ACAF" : "#6B7280",
      },
      fill: {
        ...prevOptions.fill,
        gradient: {
          ...prevOptions.fill!.gradient,
          opacityFrom: isDarkTheme ? 0 : 1,
          opacityTo: isDarkTheme ? 0 : 1,
        },
      },
      xaxis: { ...prevOptions.xaxis, categories: formattedCategories },
      grid: {
        ...prevOptions.grid,
        borderColor: isDarkTheme ? "#374151" : "#F3F4F6",
      },
    }));
  }, [isDarkTheme, formattedCategories]);

  return <Chart height={420} options={options} series={series} type="area" />;
};

export default SalesChart;