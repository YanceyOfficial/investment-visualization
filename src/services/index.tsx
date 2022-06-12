export const fetchFundByDay = (code: string) =>
  fetch(
    `https://api.doctorxiong.club/v1/fund/detail/list?code=${code}&startDate=2018-01-01`
  )

export const fetchStockByDay = (code: string) =>
  fetch(
    `https://api.doctorxiong.club/v1/stock/kline/day?code=${code}&startDate=2018-01-01`
  )

export const fetchAllFund = (keyWord?: string) =>
  fetch(`https://api.doctorxiong.club/v1/fund/all?keyWord=${keyWord}`)
