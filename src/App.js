import { useState } from "react";
import "./App.css";
import NavBar from "./component/navbar/NavBar";
import { SnackbarProvider } from 'notistack';
import Dashboard from "./pages/Dashboard";

function App() {
  const [pair , setPair] = useState('BTC-USD')
  const [balance , setBalance] = useState(1000)
  const [currentPrice, setCurrentPrice] = useState(0)


  return (
  <SnackbarProvider maxSnack={3}>
      <NavBar currentPrice={currentPrice} setCurrentPrice={setCurrentPrice}  pair={pair} balance={balance} setBalance={setBalance}/>
      <Dashboard  currentPrice={currentPrice} setCurrentPrice={setCurrentPrice}  pair={pair} setPair={setPair} balance={balance} setBalance={setBalance}/>
  </SnackbarProvider>
  );
}

export default App;
