import { BrowserRouter, Route, Routes, RouteProps } from 'react-router-dom';
import './App.css';
import Register from './pages/register';
import Chat from './pages/chat';
import styled from 'styled-components';

function App() {
  return (
    <Main>
      <BrowserRouter>
        <Routes>
          <Route path="/"  element={<Register />} />
        </Routes>
      </BrowserRouter>
    </Main>
  )
}

export default App;

const Main = styled.div`
    display: flex;
    height: 100vh;
    width: 95vw;
    justify-content: center;
    align-items: center;
`