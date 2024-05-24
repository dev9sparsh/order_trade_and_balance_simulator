import { Box, Button, IconButton, Typography, styled } from "@mui/material";

export const Container = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  padding: "10px",
  marginTop: "60px",
  gap: "10px",
  flexDirection: "column",
  [theme.breakpoints.up("sm")]: {
    justifyContent: "space-between",
    flexDirection: "row",
    padding: "20px",
    gap: "20px",
  },
}));

export const LeftWrapper = styled(Box)(({ theme }) => ({
  width: "100%",
  maxWidth: "100%",
  [theme.breakpoints.up("sm")]: {
    maxWidth: "270px;",
  },
  [theme.breakpoints.up("md")]: {
    maxWidth: "320px",
  },
}));

export const RightWrapper = styled(Box)(({ theme }) => ({
  width: "75%",
  [theme.breakpoints.down("sm")]: {
    width: "100%",
  },
}));

export const Card = styled(Box)({
  display: "flex",
  flexDirection: "column",
  gap: "10px",
  padding: "20px",
  border: "1px solid #bbb4b4d9",
});
export const TextFieldWrapper = styled(Box)({
  flexDirection: "column",
  display: "flex",
  width: "100%",
  gap: "20px",
});


export const TitleFirst = styled(Typography)({
  minWidth: "70px",
  width: "70px",
  color: "#ef3f3c",
  cursor: "pointer",
  fontSize: "12px",
  lineHeight: 1.2,
  fontWeight: 600,
});



export const TitleMid = styled(Typography)(({ Mode }) => ({
  color: Mode ? "#fff" : "#000",
  width: "100px",
  textAlign: "end",
  fontSize: "12px",
  cursor: "pointer",
  lineHeight: 1.7,
  fontWeight: 600,
}));
export const Titlethird = styled(Typography)(({ Mode }) => ({
  color: Mode ? "#fff" : "#000",
  minWidth: "120px",
  width: "50%",
  textAlign: "end",
  fontSize: "12px",
  cursor: "pointer",
  lineHeight: 1.7,
  fontWeight: 600,
}));

export const BuyButton = styled(Button)(({clr})=>({
  textTransform: "capitalize",
  background: "#000",
  borderRadius: "5px",
  height: "40px",
  fontWeight: 600,
  fontSize: "12px",
  color:"#fff",
  backgroundColor:clr? "#07a643" :"#e62c29",

  border: 0,
  "&:hover": {
    backgroundColor:clr? "#07a643d9" :"#e62c29d9",
    color: "#fff",
  },
  "&:disabled": {
    backgroundColor:'#ccc',
    color: "#fff",
  },
}));
export const SellButton = styled(Button)({
  textTransform: "capitalize",
  background: "#e1dcdc",
  borderRadius: "5px",
  height: "40px",
  fontWeight: 600,
  fontSize: "12px",
  color: "#000",
  border: 0,
  "&:hover": {
    backgroundColor: "#d3cdcd",
    // color: "#fff",
  },
});
export const Btn = styled(Button)({
  textTransform: "capitalize",
  // background: "#e1dcdc",
  borderRadius: "15px",
  fontWeight: 600,
  fontSize: "12px",
  padding: "4px 14px",
  color: "#000",
  border: 0,
  "&:hover": {
    backgroundColor: "#d3cdcd",
    // color: "#fff",
  },
});

export const Wrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: "20px",
  flexDirection: "column",
  [theme.breakpoints.up("sm")]: {
    flexDirection: "row",
  },
}));

export const TripleLineButton = styled(IconButton)({
  // background: "#f1f2f4",
  width: "35px",
  height: "35px",
  borderRadius: "5px",
  gap: "2px",
  display: "flex",
  flexDirection: "column",
  "&:hover": {
    backgroundColor: "#f1f2f4",
  },
});
export const TripleLine = styled(Box)({
  background: "gray",
  height: "2px",
  width: "15px",
});


