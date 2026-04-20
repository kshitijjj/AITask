import './App.css'
import Home from './Components/Home Component/Home'
import Auth from './Components/Auth Component/Auth';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import InputNumber from './Components/Input Component/inputNumber';

function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/auth/signup' element={<Auth/>}></Route>
        <Route path='/auth/otp-authentication' element={<InputNumber/>}></Route>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
