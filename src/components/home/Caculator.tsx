"use client"
import Chart from "@/src/components/home/Chart";
import { useState } from 'react';
import { RoughNotation } from "react-rough-notation";

//import styles from './calculator.module.css';

// const Calculator = ({ id, locale }: { id: String, locale: any }) => {
const Calculator = (locale: any) => {

  const [formData, setFormData] = useState({
    assets: 0,
    rateOfReturn: 0,
    annualIncome: 200000,
    annualSpending: 100000,
    inflationRate: 2.229,
  });

  const [yearlyData, setYearlyData] = useState([]);
  const [message, setMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => { //直接把鼠标悬浮在 input 控件的 onChange 事件上就能看到 onChange 类型
    //e.preventDefault(); 
    setFormData({ ...formData, [e.target.name]: parseFloat(e.target.value) }); //parseFloat(e.target.value)将值转换为浮点数方便后续运算
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => { //和 onChange 同理
    e.preventDefault();
    setMessage("");  // 清除旧消息

    //console.log(JSON.stringify(formData));

    try {
      const response = await fetch('/api/getYearlyData', { //nope
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();

      //console.log(data.yearlyData);

      setYearlyData(data.yearlyData);
      setMessage(data.message);

      // console.log(yearlyData.length); //0
      // console.log(message); //null
    } catch (error) {
      console.error('There was an error!', error);
    }
  };


  return (
    <section className="flex flex-col justify-center max-w-[88%] items-center py-16 gap-12">
      {/* <div className="flex flex-col text-center w-full max-w-xl gap-4"> */}
      <div className="flex flex-col text-center gap-4">
        <h2 className="text-center text-white">
          <RoughNotation type="highlight" show={true} color="#2563EB">
            {locale.title}
          </RoughNotation>
        </h2>
        <p className="text-large text-default-500">{locale.description}</p>
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col text-left w-full max-w-xl gap-4 p-3 bg-slate-800">
        <p>现有资产金额</p>
        <input
          type="number"
          id="assets"
          name="assets"
          value={formData.assets}
          onChange={handleChange}
          className="h-10 bg-slate-500 px-3 rounded-sm" />

        <p>理财预期收益率 (%)</p>
        <input
          type="number"
          id="rateOfReturn"
          name="rateOfReturn"
          step="0.001"
          value={formData.rateOfReturn}
          onChange={handleChange}
          className="h-10 bg-slate-500 px-3 rounded-sm" />

        <p>年度固定收入金额-税后</p>
        <input
          type="number"
          id="annualIncome"
          name="annualIncome"
          value={formData.annualIncome}
          onChange={handleChange}
          className="h-10 bg-slate-500 px-3 rounded-sm" />

        <p>年度固定消费金额</p>
        <input
          type="number"
          id="annualSpending"
          name="annualSpending"
          value={formData.annualSpending}
          onChange={handleChange}
          className="h-10 bg-slate-500 px-3 rounded-sm" />

        <p>通货膨胀率 (%)</p>
        <input
          type="number"
          id="inflationRate"
          name="inflationRate"
          step="0.001"
          value={formData.inflationRate}
          onChange={handleChange}
          className="h-10 bg-slate-500 px-3 rounded-sm" />
        <button
          type="submit"
          className="h-10 bg-blue-600 px-3 my-3 rounded-sm">确认</button>
      </form>
      {message && (
        // <div className="flex flex-col justify-center">
        <p>{message}</p>
        // </div>
      )}
      {yearlyData.length > 0 && (
        // <div className="flex flex-col justify-center">
        <Chart data={yearlyData} />
        // </div>
      )}
    </section>
  );
}

export default Calculator

