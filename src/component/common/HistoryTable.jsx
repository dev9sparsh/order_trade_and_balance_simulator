import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow ,Box,Paper} from '@mui/material'
import React from 'react'
import { Btn } from '../../Style'

function HistoryTable({title,tableHeading,data ,handleCancle}) {
  return (
    <>
    <Box
        sx={{
          display: "flex",
          gap: "20px",
          paddingLeft: "20px",
          borderTop: "1px solid #ccc",
          padding: "18px",
        }}
      >
        <Btn sx={{ background: "#1976d209" }}>{title}</Btn>
      </Box>
      <Box  sx={{
          mb:'32px'
        }}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
              {tableHeading?.map((item,i)=><TableCell key={i} sx={{ fontWeight: 600 ,color: "gray"   }} align= {(i === 0) ? "" : "right"}>
                  {item}
              </TableCell>)}
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.map((_,i) => (
                <TableRow
                  key={i}
                  sx={{"&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                  {data[data?.length-i-1].id}
                  </TableCell>
                  <TableCell align="right">{data[data?.length-i-1].pair}</TableCell>
                  <TableCell align="right">{data[data?.length-i-1].side}</TableCell>
                  <TableCell align="right">{data[data?.length-i-1].type}</TableCell>
                  <TableCell align="right">{data[data?.length-i-1].date}</TableCell>
                  <TableCell align="right">{data[data?.length-i-1].price}</TableCell>
                  <TableCell align="right">{data[data?.length-i-1].amount?.toFixed(7)}</TableCell>
                  <TableCell align="right">{data[data?.length-i-1].total?.toFixed(5)}</TableCell>
                  <TableCell align="right">{data[data?.length-i-1].status}</TableCell>
                  <TableCell align="right">{data[data?.length-i-1].action?<Btn onClick={()=>handleCancle(data[data?.length-i-1]?.id,data?.length-i-1)} sx={{bgcolor:"#dd0000" ,color:'#fff',"&:hover":{bgcolor:"#dd0000cc"}}}>Cancel</Btn>:"None"}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </>
  )
}

export default HistoryTable