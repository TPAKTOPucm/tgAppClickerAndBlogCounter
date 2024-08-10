import {useEffect} from "react";
import './App.css';
import {Route, Routes} from 'react-router-dom'
import Start from "./components/index";
import Error from './components/error';



function App() {
  useEffect(() => {
    window.Telegram.WebApp.ready()
  })
  return (
    <div className="App">
      <Routes>
        <Route index element={<Start />}/>
        <Route path={'form'} element={<Start />}/>
        <Route path={'*'} element={<Error />}/>
      </Routes>
    </div>
  );
}

export default App;
