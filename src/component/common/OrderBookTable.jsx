import { Box, Typography } from "@mui/material";
import React from "react";
import { TitleFirst, TitleMid, Titlethird } from "../../Style";

const OrderBookTable = ({title,data,color}) => {
  return (
    <Box>
      <Typography
        sx={{ fontSize: "14px", marginBottom: "10px", fontWeight: 600 }}
      >
        {title}
      </Typography>
      {data
        ?.slice(0, 15)
        .reverse()
        ?.map((item, index) => (
          <Box
            key={index}
            sx={{display: "flex",}}
          >
            <TitleFirst sx={{color}} >{item?.[0]}</TitleFirst>
            <TitleMid>{parseFloat(item?.[1])?.toFixed(5)}</TitleMid>
            <Titlethird>
              {parseFloat(item?.[0] * item?.[1]).toFixed(3)}
            </Titlethird>
          </Box>
        ))}
    </Box>
  );
};

export default OrderBookTable;
