"use client"
import { CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis } from 'recharts';
//import styles from './chart.module.css';

const Chart = (yearlyData: any) => {
  if (yearlyData) {

    //console.log('yearlyData: ', yearlyData);
    //console.log('yearlyData.data: ', yearlyData.data)

    return (
      <section className="flex flex-col justify-center w-250 h-125">
        {/* <div className="flex flex-col justify-center max-w-[88%] items-center py-16 gap-12"> */}
        <div className="flex flex-col justify-center w-250 h-125">
          {/* <ResponsiveContainer width="100%" height="90%"> */}
          {/* <ResponsiveContainer className="flex flex-col justify-center"> */} {/*想不到竟然是这个东西影响我图表展示 mdzz*/}
          <LineChart
            width={1000}
            height={500}
            data={yearlyData.data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="thisYearAssets" stroke="#8884d8" activeDot={{ r: 8 }} />
            <Line type="monotone" dataKey="thisYearSpending" stroke="#82ca9d" />
            {/* <Line type="monotone" dataKey="uv" stroke="#cdcdcd" />
            <Line type="monotone" dataKey="pv" stroke="#cdcdcd" /> */}
          </LineChart>
          {/* </ResponsiveContainer> */}
        </div>
      </section>
    )
  }
}

export default Chart