import {
  Box,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  Slider,
  TextField,
  Typography,
} from "@mui/material";
import {
  Btn,
  BuyButton,
  Card,
  Container,
  LeftWrapper,
  RightWrapper,
  TextFieldWrapper,
  TitleFirst,
  TitleMid,
  Titlethird,
  Wrapper,
} from "../Style";
import { useEffect, useState } from "react";
import Chart from "../component/chart/Chart";
import { useSnackbar } from "notistack";
import OrderBookTable from "../component/common/OrderBookTable";
import { pairArray, tableHeading } from "../utilities/data";
import HistoryTable from "../component/common/HistoryTable";

const Dashboard = ({
  currentPrice,
  setCurrentPrice,
  pair,
  setPair,
  balance,
  setBalance,
}) => {
  const [bidAsk, setBidAsk] = useState([]);
  const [socket, setSocket] = useState(null);
  const [sliderValue, setSliderValue] = useState(0);
  const [buyTotal, setBuyTotal] = useState(0);
  const [amountBuy, setAmountBuy] = useState(0);
  const [orderOpenList, setOrderOpenList] = useState([]);
  const [priceBuy, setPriceBuy] = useState(currentPrice);
  const [selectTab, setSelectTab] = useState(0);
  const [priceSell, setPriceSell] = useState(currentPrice);
  const [amountSell, setAmountSell] = useState(0);
  const [sliderValueSell, setSliderValueSell] = useState(0);
  const [sellTotal, setSellTotal] = useState(0);
  const { enqueueSnackbar } = useSnackbar();
  const [coinAmounts, setCoinAmounts] = useState({
    "BTC-USD": 0,
    "ETH-BTC": 0,
    "LTC-USD": 0,
    "XRP-USD": 0,
  });

  const handleClickVariant = (variant, msg) => {
    enqueueSnackbar(msg, { variant });
  };

  const handleChange = (event) => {
    setPair(event.target.value);
  };

  const handleCancle = (id, i) => {
    if (id?.includes("_ask_id")) {
      const cancelArrAsk = orderOpenList?.map((item) => {
        return item.id === id
          ? { ...item, status: "Cancelled", action: false }
          : { ...item };
      });
      setCoinAmounts({
        ...coinAmounts,
        [pair]: coinAmounts[pair] + orderOpenList[i]?.amount,
      });
      setOrderOpenList(cancelArrAsk);
    } else {
      const cancelArr = orderOpenList?.map((item) => {
        return item.id === id
          ? { ...item, status: "Cancelled", action: false }
          : { ...item };
      });
      setBalance(balance + orderOpenList[i]?.total);
      setOrderOpenList(cancelArr);
    }
    handleClickVariant('error','Your order has been cancelled!')
  };

  const handleChangeSlider = (_, percentage) => {
    setSliderValue(percentage);
    setBuyTotal(balance * (percentage / 100));
    setAmountBuy((percentage * balance) / 100 / priceBuy);
  };
  const handleChangeSliderSell = (_, percentage) => {
    setSliderValueSell(percentage);
    setSellTotal((priceSell * percentage * coinAmounts[pair]) / 100);
    setAmountSell(coinAmounts[pair] * (percentage / 100));
  };
  const handlerPriceBuy = (e) => {
    setPriceBuy(e.target.value);
  };
  const handlerPriceSell = (e) => {
    setPriceSell(e.target.value);
  };

  const handlerAmountBuy = (e) => {
    setAmountBuy(e.target.value);
    setBuyTotal(priceBuy * e.target.value);
    setSliderValue((priceBuy * e.target.value * 100) / balance);
  };
  const handlerAmountSell = (e) => {
    setAmountSell(e.target.value);
    setSellTotal(priceBuy * e.target.value);
    setSliderValueSell((e.target.value * 100) / coinAmounts[pair]);
  };

  const handleChangeBuyTotal = (event) => {
    setBuyTotal(event.target.value);
    setSliderValue(
      (parseFloat(event.target.value) / parseFloat(balance)) * 100
    );
    setAmountBuy(event.target.value / priceBuy);
  };
  const handleChangeSellTotal = (event) => {
    setSellTotal(event.target.value);
    setSliderValueSell(
      (parseFloat(event.target.value) / parseFloat(balance)) * 100
    );
    setAmountSell(event.target.value / priceBuy);
  };

  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1;
  const day = currentDate.getDate();
  const hours = currentDate.getHours();
  const minutes = currentDate.getMinutes();
  const formattedDate = `${year}/${month}/${day}`;
  const formattedTime = `${hours}:${minutes}`;
  const fullDateTime = `${formattedDate} ${formattedTime}`;

  const buyHandlerBtn = (btnChecker) => {
    setOrderOpenList([
      ...orderOpenList,
      {
        id:
          btnChecker === "buy"
            ? `${Date.now()}_bid_id`
            : `${Date.now()}_ask_id`,
        date: fullDateTime,
        pair,
        side: btnChecker === "buy" ? "Buy" : "Sell",
        type: selectTab === 1 ? "Market" : "Limit",
        amount: btnChecker === "buy" ? amountBuy : amountSell,
        price:
          btnChecker === "buy"
            ? selectTab === 1
              ? currentPrice
              : priceBuy
            : selectTab === 1
            ? currentPrice
            : priceSell,
        total: btnChecker === "buy" ? buyTotal : sellTotal,
        status: selectTab === 1 ? "Success" : "Pending",
        action: selectTab === 1 ? false : true,
      },
    ]);
    if (btnChecker === "buy") {
      if (selectTab === 0) {
        setBalance(balance - buyTotal);
        setSliderValue(0);
        setBuyTotal(0);
        setAmountBuy(0);
        handleClickVariant("success", `You Limit Order is created!`);
      } else {
        setBalance(balance - buyTotal);
        setSliderValue(0);
        setBuyTotal(0);
        setAmountBuy(0);

        setCoinAmounts({
          ...coinAmounts,
          [pair]: coinAmounts[pair] + amountBuy,
        });
        handleClickVariant("success", `Your market order is successful!`);
      }
    } else {
      if (selectTab === 0) {
        setSliderValueSell(0);
        setSellTotal(0);
        setAmountSell(0);
        setCoinAmounts({
          ...coinAmounts,
          [pair]: coinAmounts[pair] - amountSell,
        });
        handleClickVariant("success", `You Limit Order is created!`);
      } else {
        setBalance(balance + sellTotal);
        setSliderValueSell(0);
        setSellTotal(0);
        setAmountSell(0);
        setCoinAmounts({
          ...coinAmounts,
          [pair]: coinAmounts[pair] - amountSell,
        });
        handleClickVariant("success", `Your market order is successful!`);
      }
    }
  };
  // eslint-disable-next-line
  useEffect(() => {
    let pingInterval;
    const connectWebSocket = () => {
      const ws = new WebSocket("wss://trade.cex.io/api/spot/ws-public");
      ws.onopen = () => {
        const message = {
          e: "get_order_book",
          oid: `${Date.now()}unique_get_order_book`,
          data: {
            pair: pair,
          },
        };
        ws.send(JSON.stringify(message));

        pingInterval = setInterval(() => {
          ws.send(JSON.stringify(message));
        }, 10500);
      };
      ws.onmessage = (event) => {
        const data = JSON.parse(event.data);
        setBidAsk(data.data);
        console.log("Message from WebSocket:", data);
      };
      ws.onerror = (error) => {
        console.error("WebSocket error:", error);
      };
      ws.onclose = (event) => {
        console.log("WebSocket closed:", event);

        if (pingInterval) {
          clearInterval(pingInterval);
        }
      };
      setSocket(ws);
    };
    connectWebSocket();
    return () => {
      if (socket) {
        socket.close();
      }
      if (pingInterval) {
        clearInterval(pingInterval);
      }
    };
    // eslint-disable-next-line
  }, [pair]);

  // eslint-disable-next-line
  useEffect(() => {
    // setBalance(balance+buyTotal)

    const updatedList = orderOpenList?.map((item) => {
      if (
        item.price >= currentPrice &&
        item.side === "Buy" &&
        item.type === "Limit" &&
        item.status === "Pending" &&
        item.pair === pair
      ) {
        setCoinAmounts({
          ...coinAmounts,
          [pair]: coinAmounts[pair] + item?.total / currentPrice,
        });
        handleClickVariant(
          "success",
          `Limit order for ${item?.pair} for ${item?.total} ${
            item?.pair.split("-")?.[1]
          } successful!`
        );
        return {
          ...item,
          price: currentPrice,
          amount: item?.total / currentPrice,
          status: "Success",
          action: false,
        };
      } else if (
        item.price <= currentPrice &&
        item.side === "Sell" &&
        item.type === "Limit" &&
        item.status === "Pending" &&
        item.pair === pair
      ) {
        setBalance(balance + currentPrice * item?.amount);
        handleClickVariant(
          "success",
          `Limit order for ${item?.pair} for ${item?.total} ${
            item?.pair.split("-")?.[1]
          } successful!`
        );
        return {
          ...item,
          price: currentPrice,
          total: currentPrice * item?.amount,
          status: "Success",
          action: false,
        };
      } else {
        return item;
      }
    });
    setOrderOpenList(updatedList);
    // eslint-disable-next-line
  }, [currentPrice]);
  return (
    <>
      <Container>
        <LeftWrapper>
          <Box
            sx={{
              display: "flex",
              marginBottom: "10px",
              gap: "10px",
            }}
          >
            <FormControl sx={{ width: "200px" }} size="small">
              <InputLabel id="demo-simple-select-label">Pairs</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={pair}
                label="Pairs"
                onChange={handleChange}
              >
                {pairArray?.map((item, i) => (
                  <MenuItem key={i} value={item}>
                    {item}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <Box
            sx={{
              display: "flex",
              marginBottom: "10px",
            }}
          >
            <TitleFirst sx={{ color: "#838595d4", fontSize: "11px" }}>
              Price({bidAsk?.currency2})
            </TitleFirst>
            <TitleMid sx={{ color: "#838595d4", fontSize: "11px" }}>
              Amounts({bidAsk?.currency1})
            </TitleMid>
            <Titlethird sx={{ color: "#838595d4", fontSize: "11px" }}>
              Total
            </Titlethird>
          </Box>
          <OrderBookTable title={"Ask"} data={bidAsk?.asks} />
          {currentPrice && (
            <Typography
              sx={{
                fontWeight: 600,
                fontSize: "20px",
                paddingY: "5px",
                color: "#1976d2 ",
              }}
            >
              {currentPrice} Current
            </Typography>
          )}
          <OrderBookTable color={"#00b746"} title={"Bid"} data={bidAsk?.bids} />
        </LeftWrapper>
        <RightWrapper>
          <Chart setCurrentPrice={setCurrentPrice} pair={pair} />
          <Card>
            <Box sx={{ display: "flex", gap: "20px" }}>
              <Btn
                onClick={() => setSelectTab(0)}
                sx={{ background: `${selectTab === 0 && "#e1dcdc"}` }}
              >
                Limit
              </Btn>
              <Btn
                onClick={() => {
                  setSelectTab(1);
                  setPriceBuy(currentPrice);
                  setPriceSell(currentPrice);
                }}
                sx={{ background: `${selectTab === 1 && "#e1dcdc"}` }}
              >
                Market
              </Btn>
            </Box>
            <Typography
              gutterBottom
              sx={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: "12px",
              }}
            >
              Avbl {balance} {pair?.split("-")?.[1]}
              <Typography sx={{ fontSize: "12px" }}>
                Avbl {coinAmounts[pair]} {pair?.split("-")?.[0]}
              </Typography>
            </Typography>
            <Wrapper>
              <TextFieldWrapper>
                <TextField
                  size="small"
                  fullWidth
                  required
                  value={selectTab === 0 ? priceBuy : "Market"}
                  onChange={(e) => handlerPriceBuy(e)}
                  id="outlined-required"
                  label="Price"
                  disabled={selectTab === 1}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">Price</InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        {pair?.split("-")?.[1]}
                      </InputAdornment>
                    ),
                    sx: { fontSize: "14px" },
                  }}
                />
                {selectTab === 0 && (
                  <TextField
                    size="small"
                    fullWidth
                    required
                    value={amountBuy}
                    onChange={(e) => handlerAmountBuy(e)}
                    id="outlined-required"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">Amount</InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          {pair?.split("-")?.[0]}
                        </InputAdornment>
                      ),
                      sx: {
                        fontSize: "14px",
                      },
                    }}
                  />
                )}
                <Slider
                  sx={{ color: "black" }}
                  aria-label="Small steps"
                  value={balance < buyTotal ? 100 : sliderValue}
                  onChange={handleChangeSlider}
                  step={20}
                  min={0}
                  max={100}
                  valueLabelDisplay="auto"
                  disabled={priceBuy < 1}
                  marks={true}
                />
                <TextField
                  size="small"
                  fullWidth
                  required
                  onChange={(e) => handleChangeBuyTotal(e)}
                  value={buyTotal}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">Total</InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        {pair?.split("-")?.[1]}
                      </InputAdornment>
                    ),
                    sx: { fontSize: "14px" },
                  }}
                />
                <BuyButton
                  onClick={() => buyHandlerBtn("buy")}
                  clr={true}
                  disabled={buyTotal > balance || priceBuy < 1 || buyTotal < 1}
                >
                  Buy
                </BuyButton>
              </TextFieldWrapper>
              <TextFieldWrapper>
                <TextField
                  size="small"
                  fullWidth
                  required
                  value={selectTab === 0 ? priceSell : "Market"}
                  onChange={(e) => handlerPriceSell(e)}
                  id="outlined-required"
                  label="Price"
                  disabled={selectTab === 1}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">Price</InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        {pair?.split("-")?.[1]}
                      </InputAdornment>
                    ),
                    sx: { fontSize: "14px" },
                  }}
                />
                {selectTab === 0 && (
                  <TextField
                    size="small"
                    fullWidth
                    required
                    value={amountSell}
                    onChange={(e) => handlerAmountSell(e)}
                    id="outlined-required"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">Amount</InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          {pair?.split("-")?.[0]}
                        </InputAdornment>
                      ),
                      sx: {
                        fontSize: "14px",
                      },
                    }}
                  />
                )}
                <Slider
                  sx={{ color: "black" }}
                  aria-label="Small steps"
                  value={coinAmounts[pair] < amountSell ? 100 : sliderValueSell}
                  onChange={handleChangeSliderSell}
                  step={20}
                  min={0}
                  max={100}
                  valueLabelDisplay="auto"
                  disabled={priceBuy < 1}
                  marks={true}
                />
                <TextField
                  size="small"
                  fullWidth
                  required
                  onChange={(e) => handleChangeSellTotal(e)}
                  value={sellTotal}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">Total</InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        {pair?.split("-")?.[1]}
                      </InputAdornment>
                    ),
                    sx: { fontSize: "14px" },
                  }}
                />
                <BuyButton
                  onClick={() => buyHandlerBtn("sell")}
                  disabled={
                    coinAmounts[pair] < amountSell ||
                    priceSell < 1 ||
                    sellTotal < 1
                  }
                >
                  Sell
                </BuyButton>
              </TextFieldWrapper>
            </Wrapper>
          </Card>
        </RightWrapper>
      </Container>
      <HistoryTable
        title={"Order History"}
        tableHeading={tableHeading}
        data={orderOpenList}
        handleCancle={handleCancle}
      />
    </>
  );
};

export default Dashboard;
