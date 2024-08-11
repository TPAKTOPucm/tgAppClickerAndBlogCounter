import {useEffect} from "react";
import './App.css';
import {Route, Routes} from 'react-router-dom'
import Start from "./components/index";
import Error from './components/error';
import Clicker from "./components/clicker";



function App() {
  process.env.BASE_URI='http://localhost:5000'
  useEffect(() => {
    window.Telegram.WebApp.ready()
  })
  return (
    <div className="App">
      <Routes>
        <Route index element={<Start />}/>
        <Route path={'form'} element={<Start />}/>
        <Route path={'clicker'} element={<Clicker />}/>
        <Route path={'*'} element={<Error />}/>
      </Routes>
    </div>
  );
}

export default App;
