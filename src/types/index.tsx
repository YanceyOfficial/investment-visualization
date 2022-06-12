export interface CommonResponse {
  code: number
  message: string
}

export interface Fund {
  code: number
  name: string
  type: string
  netWorth: number
  expectWorth: number
  totalWorth: number
  expectGrowth: string
  dayGrowth: string
  lastWeekGrowth: string
  lastMonthGrowth: string
  lastThreeMonthsGrowth: string
  lastSixMonthsGrowth: string
  lastYearGrowth: string
  buyMin: string
  buySourceRate: string
  buyRate: string
  manager: string
  fundScale: string
  netWorthDate: string
  expectWorthDate: string
  netWorthData: string[][]
}

export interface AllFundResponse extends CommonResponse {
  data: string[][]
}

export interface FundResponse extends CommonResponse {
  data: Fund | Fund[]
}

export interface StockResponse extends CommonResponse {
  data: string[][]
}

export interface AllFundFmt {
  label: string
  value: string
}
