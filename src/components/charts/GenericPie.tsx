import ReactApexChart from "react-apexcharts";

const GenericPie = ({ title, series, colors, data }: any) => {
  return (
    <>
      <div className="flex flex-1 flex-col w-full content-between justify-center items-center pl-[3.5px] py-2 gap-2 rounded-[15px] min-h-[300px] ">
        {series[0] < 1 && series[1] < 1 ? (
          <p className="text-primary90 font-500 text-[20px]">No Data</p>
        ) : (
          <ReactApexChart
            options={{
              colors,
              legend: { show: false },
              dataLabels: {
                enabled: true,
                textAnchor: "middle",
                offsetX: 0,
                offsetY: 0,
              },
            }}
            series={series}
            type="pie"
            width="300px"
          />
        )}
      </div>
    </>
  );
};

export default GenericPie;
