import { NextResponse } from "next/server";

// export const POST = async (request) => {
// };

//export async function POST (req){
export const POST = async (request: Request) => {

  const requestData = await request.json();

  const assets = requestData.assets;
  const rateOfReturn = requestData.rateOfReturn;
  const annualIncome = requestData.annualIncome;
  const annualSpending = requestData.annualSpending;
  const inflationRate = requestData.inflationRate;

  //console.log('here we are! assets = ', assets);

  // 初始化
  let n = 1;
  let thisYearSpending = parseFloat(annualSpending);
  let lastYearAssets = parseFloat(assets);
  let thisYearAssets = 1;//设置为 1 是为了进入 while 循环，如果设置为 0，开始就被跳出了
  let thisYearReturn = 0;

  const yearlyData = [];
  const targetYear = 10;

  // 计算逻辑
  while (thisYearAssets > 0 && n <= targetYear) { // 

    if (n > 1) {
      // 计算当年消费，从第二年起，消费金额会因为通胀率影响越来越多
      thisYearSpending = thisYearSpending * (1 + inflationRate * 0.01);
    }
    // 计算当年理财收益
    if (lastYearAssets - thisYearSpending > 0) {
      thisYearReturn = (lastYearAssets - thisYearSpending) * (rateOfReturn * 0.01);
    }

    thisYearAssets = lastYearAssets + thisYearReturn + annualIncome - thisYearSpending;

    yearlyData.push({
      year: n,
      thisYearReturn: thisYearReturn,
      thisYearSpending: thisYearSpending,
      thisYearAssets: thisYearAssets,
      lastYearAssets: lastYearAssets,
      inflationRate: inflationRate,
      rateOfReturn: rateOfReturn,
      annualIncome: annualIncome,
    });

    if (thisYearAssets <= 0 || n > targetYear) break;
    else {
      n++;
      thisYearReturn = 0;
      lastYearAssets = thisYearAssets;
    }
  }

  if (n > targetYear) {
    //console.log('result: ' + yearlyData);
    return NextResponse.json({ message: "恭喜你可以躺 " + targetYear.toString() + " 年！", yearlyData });
  } else {
    return NextResponse.json({ message: "很遗憾，你只能躺 " + n.toString() + " 年", yearlyData });
  }
}