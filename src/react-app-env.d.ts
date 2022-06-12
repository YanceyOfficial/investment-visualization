/// <reference types="react-scripts" />

interface NetWorthTrend {
  x: number // 秒级时间戳
  y: number // 涨跌
  equityReturn: string // 净值回报
  unitMoney: string // 每份派送金
}

interface GrandTotal {
  name: string
  data: string[][]
}

interface Window {
  fS_name: string // 基金或股票信息
  fS_code: string // 基金或股票代码
  fund_sourceRate: string // 原费率
  fund_Rate: string // 现费率
  fund_minsg: string // 最小申购金额
  stockCodes: string[] // 基金持仓股票代码
  stockCodesNew: string[] // 基金持仓股票代码(新市场号)
  zqCodes: string // 基金持仓债券代码
  zqCodesNew: string // 基金持仓债券代码(新市场号)
  syl_1n: string // 近一年收益率
  syl_6y: string // 近六个月收益率
  syl_3y: string // 近三个月收益率
  syl_1y: string // 近一个月收益率
  Data_fundSharesPositions: sting[] // 股票仓位测算图
  Data_netWorthTrend: NetWorthTrend[] // 单位净值走势
  Data_ACWorthTrend: string[][] // 累计净值走势
  Data_grandTotal: GrandTotal[] // 累计收益率走势
}
