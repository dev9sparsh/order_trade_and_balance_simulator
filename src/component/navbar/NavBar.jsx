import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useEffect, useState } from "react";
import { InputAdornment, TextField } from "@mui/material";

function NavBar({ currentPrice, pair, balance, setBalance }) {
  const [isInputShow, setIsInputShow] = useState(false);
  const [value, setSetValue] = useState(balance);

  useEffect(() => {
    setSetValue(balance);
  }, [balance]);

  return (
    <AppBar
      sx={{
        background: "#fff",
        position: "fixed",
        boxShadow: "none",
        borderBottom: "1px solid #dddddd",
        zIndex: 999,
      }}
    >
      <Container maxWidth="xl">
        <Toolbar
          sx={{ display: "flex", justifyContent: "space-between" }}
          disableGutters
        >
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              fontFamily: "monospace",
              fontWeight: 700,
              color: "#1976d2",
              textDecoration: "none",
            }}
          >
            {pair?.split("-")?.[0]}/{pair?.split("-")?.[1]} {currentPrice}
          </Typography>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              fontFamily: "monospace",
              fontWeight: 700,
              color: "#1976d2",
              textDecoration: "none",
            }}
          >
            Demo
          </Typography>
          {isInputShow ? (
            <TextField
              onChange={(e) => setSetValue(e.target.value)}
              value={value}
              size="small"
              required
              id="outlined-required"
              label="Amount"
              defaultValue=""
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">$</InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment
                    onClick={() => {
                      setBalance(value);
                      setIsInputShow(false);
                    }}
                    sx={{ cursor: "pointer" }}
                    position="end"
                  >
                    Submit
                  </InputAdornment>
                ),
                sx: { fontSize: "14px" },
              }}
            />
          ) : (
            <Typography
              onClick={() => setIsInputShow(true)}
              sx={{ display: "flex", gap: "8px", color: "#00000095" }}
            >
              <Typography sx={{ fontWeight: 600, color: "#00000095" }}>
                Balance
              </Typography>{" "}
              {balance.toFixed(3)}$
            </Typography>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default NavBar;
