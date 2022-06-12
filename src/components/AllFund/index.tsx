import { FC, useState, useCallback, SyntheticEvent } from 'react'
import debounce from 'lodash.debounce'
import styled from '@emotion/styled'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import Chip from '@mui/material/Chip'
import Autocomplete from '@mui/material/Autocomplete'
import TextField from '@mui/material/TextField'
import { fetchAllFund } from 'src/services'
import { AllFundResponse, AllFundFmt } from 'src/types'

export interface Props {
  onSearch: (code: string) => void
}

const CustomButton = styled(Button)`
  width: 200px;
`

const AllFund: FC<Props> = ({ onSearch }) => {
  const [selected, setSelected] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const [allFundData, setAllFundData] = useState<AllFundFmt[]>([])

  const getAllFund = useCallback(
    async (keyWords: string) => {
      setLoading(true)

      try {
        const res = await fetchAllFund(keyWords)
        const data = (await res.json()) as AllFundResponse

        const fmtData = data.data.map((val) => ({
          label: `${val[0]} - ${val[2]} - ${val[3]}`,
          value: val[0]
        }))

        setAllFundData(fmtData)
      } finally {
        setLoading(false)
      }
    },
    [setAllFundData]
  )

  const hangleChange = (e: SyntheticEvent, v: (string | AllFundFmt)[]) => {
    setSelected(
      v.map((val) => (typeof val === 'string' ? val : val.value)).join(',')
    )
  }

  const handleSearch = () => {
    onSearch(selected)
  }

  const handleInputChange = debounce((e: SyntheticEvent, v: string) => {
    if (v === '') {
      return
    }

    getAllFund(v)
  }, 500)

  return (
    <Stack direction="row" spacing={2}>
      <Autocomplete
        fullWidth
        multiple
        options={allFundData}
        freeSolo
        loading={loading}
        onInputChange={handleInputChange}
        onChange={(e, v) => hangleChange(e, v)}
        renderTags={(value: readonly AllFundFmt[], getTagProps) =>
          value.map((option: AllFundFmt, index: number) => (
            <Chip
              variant="outlined"
              label={option.label}
              {...getTagProps({ index })}
            />
          ))
        }
        renderInput={(params) => (
          <TextField
            {...params}
            variant="filled"
            label="Fund"
            placeholder="请选择多个基金进行比较"
          />
        )}
      />

      <CustomButton variant="contained" onClick={handleSearch}>
        搜索
      </CustomButton>
    </Stack>
  )
}

export default AllFund
