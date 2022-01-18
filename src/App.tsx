import { BrowserRouter, Route, Routes, RouteProps } from 'react-router-dom';
import './App.css';
import Register from './pages/register';
import Chat from './pages/chat';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"  element={<Register />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
