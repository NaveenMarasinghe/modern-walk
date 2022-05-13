import './App.css';
import Homepage from './pages/homepage/Homepage'
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import MensClothing from "./pages/mensClothing/MensClothing"
import WomensClothing from "./pages/womensClothing/WomensClothing"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Homepage />} />
        <Route path="/mens-clothing" element={<MensClothing />} />
        <Route path="/womens-clothing" element={<WomensClothing />} />
      </Routes>
    </BrowserRouter >
  );
}

export default App;
