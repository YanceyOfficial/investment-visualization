import { FC, useState, useEffect, useCallback } from 'react'
import styled from '@emotion/styled'
import Typography from '@mui/material/Typography'
import CircularProgress from '@mui/material/CircularProgress'
import * as echarts from 'echarts/core'
import {
  TitleComponent,
  ToolboxComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
  DataZoomComponent
} from 'echarts/components'
import { LineChart } from 'echarts/charts'
import { UniversalTransition } from 'echarts/features'
import { CanvasRenderer } from 'echarts/renderers'
import ReactECharts from 'echarts-for-react'
import { fetchFundByDay, fetchStockByDay } from 'src/services'
import { StockResponse, FundResponse, Fund } from 'src/types'
import AllFund from 'src/components/AllFund'

echarts.use([
  TitleComponent,
  ToolboxComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
  LineChart,
  CanvasRenderer,
  UniversalTransition,
  DataZoomComponent
])

const Wrapper = styled.div`
  margin: 48px 0;
`

const App: FC = () => {
  const [csi300Data, setCSI300Data] = useState<string[][] | null>(null)
  const [fundData, setFundData] = useState<Fund[]>([])

  const getFundByDay = useCallback(
    async (code: string) => {
      const res = await fetchFundByDay(code)
      const data = (await res.json()) as FundResponse

      setFundData(Array.isArray(data.data) ? data.data : [data.data])
    },
    [setFundData]
  )

  const getStockByDay = useCallback(async () => {
    const res = await fetchStockByDay('000300')
    const data = (await res.json()) as StockResponse

    setCSI300Data(data.data)
  }, [setCSI300Data])

  useEffect(() => {
    getStockByDay()
  }, [getStockByDay])

  if (!csi300Data) {
    return <CircularProgress />
  }

  return (
    <>
      <Typography variant="h2" gutterBottom component="div">
        Fund Price Ratio Visualization
      </Typography>

      <AllFund onSearch={(code) => getFundByDay(code)} />

      <Wrapper>
        <ReactECharts
          option={{
            title: {
              text: '价格走势'
            },
            tooltip: {
              trigger: 'axis'
            },
            legend: {
              data: [...fundData.map((item) => item.name), '沪深 300 指数']
            },
            grid: {
              left: '3%',
              right: '4%',
              bottom: '3%',
              containLabel: true
            },
            toolbox: {
              feature: {
                saveAsImage: {}
              }
            },
            xAxis: {
              type: 'category',
              boundaryGap: false,
              data: csi300Data.map((item) => item[0])
            },
            yAxis: {
              type: 'value'
            },
            dataZoom: [
              {
                type: 'inside',
                xAxisIndex: [0, 1],
                start: 10,
                end: 100
              },
              {
                show: true,
                xAxisIndex: [0, 1],
                type: 'slider',
                bottom: 10,
                start: 10,
                end: 100
              }
            ],
            series: [
              ...fundData.map((fund) => ({
                type: 'line',
                name: fund.name,
                data: fund.netWorthData.map((item) => item[1])
              })),
              {
                type: 'line',
                name: '沪深 300 指数',
                data: csi300Data.map((item) => Number(item[2]) / 1000)
              }
            ]
          }}
        />
      </Wrapper>

      <ReactECharts
        option={{
          title: {
            text: '价格比走势'
          },
          tooltip: {
            trigger: 'axis'
          },
          legend: {
            data: fundData.map((item) => item.name)
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          toolbox: {
            feature: {
              saveAsImage: {}
            }
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: csi300Data.map((item) => item[0])
          },
          yAxis: {
            type: 'value'
          },
          dataZoom: [
            {
              type: 'inside',
              xAxisIndex: [0, 1],
              start: 10,
              end: 100
            },
            {
              show: true,
              xAxisIndex: [0, 1],
              type: 'slider',
              bottom: 10,
              start: 10,
              end: 100
            }
          ],
          series: fundData.map((fund) => ({
            type: 'line',
            name: fund.name,
            data: fund.netWorthData.map(
              (item, k) =>
                (Number(item[1]) /
                  (csi300Data[k] && Number(csi300Data[k][2]))) *
                1000
            )
          }))
        }}
      />
    </>
  )
}

export default App
