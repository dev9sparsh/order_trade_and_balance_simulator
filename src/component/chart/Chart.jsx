import { Box, Button } from "@mui/material";
import { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { resolutionArr } from "../../utilities/data";

const Chart = ({ pair, setCurrentPrice }) => {
  const [socket, setSocket] = useState(null);
  const [candles, setCandle] = useState([]);
  const [resolution, setResolution] = useState({ resolution: "1m", iso: 50 });

  // eslint-disable-next-line
  useEffect(() => {
    let pingInterval;

    const connectWebSocket = () => {
      const ws = new WebSocket("wss://trade.cex.io/api/spot/ws-public");
      ws.onopen = () => {
        let message = {
          e: "get_candles",
          oid: `${Date.now()}unique_get_candles`,
          ok: "ok",
          data: {
            pair: pair,
            fromISO: Date.now() - resolution?.iso * 60 * 1000,
            limit: 60,
            dataType: "bestAsk",
            resolution: resolution?.resolution,
          },
        };
        ws.send(JSON.stringify(message));

        pingInterval = setInterval(() => {
          ws.send(JSON.stringify(message));
        }, 10100);
      };

      ws.onmessage = (event) => {
        const data = JSON.parse(event.data);
        setCandle(data.data);
        setCurrentPrice(data?.data?.[data?.data?.length - 1]?.open);
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
  }, [resolution?.resolution, pair]);

  const seriesArr = candles?.map((item) => {
    return {
      x: new Date(item?.timestamp),
      y: [item?.open, item?.high, item?.low, item?.close],
    };
  });

  const series = [
    {
      data: seriesArr,
    },
  ];

  const options = {
    chart: {
      type: "candlestick",
      height: 50,
    },
    title: {
      text: "Candlestick Chart",
      align: "left",
    },
    xaxis: {
      type: "datetime",
    },
    yaxis: {
      tooltip: {
        enabled: true,
      },
    },
  };

  return (
    <>
      <Box sx={{ border: "1px solid #d3d3d3", padding: "8px" }} id="chart">
        {resolutionArr?.map((item, i) => (
          <Button
            sx={{
              padding: "2px",
              minWidth: "30px",
              marginRight: "16px",
              marginBottom: "4px",
              textTransform: "none",
              color: `${
                resolution.resolution === item?.resolution
                  ? "#1976d2"
                  : "#00000099"
              }`,
              bgcolor: `${
                resolution.resolution === item?.resolution && "#1976d255"
              }`,
            }}
            onClick={() => setResolution(item)}
            key={i}
          >
            {item?.resolution}
          </Button>
        ))}
        <ReactApexChart
          options={options}
          series={series}
          type="candlestick"
          height={350}
        />
      </Box>
      <Box id="html-dist"></Box>
    </>
  );
};

export default Chart;
