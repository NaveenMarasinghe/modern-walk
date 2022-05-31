import "./App.css";
import Homepage from "./pages/homepage/Homepage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MensClothing from "./pages/mensClothing/MensClothing";
import WomensClothing from "./pages/womensClothing/WomensClothing";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";
import { UserProvider } from "./context/userContext";
import { AppProvider } from "./context/appContext";

function App() {
  return (
    <UserProvider>
      <AppProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/mens-clothing" element={<MensClothing />} />
            <Route path="/womens-clothing" element={<WomensClothing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </BrowserRouter>
      </AppProvider>
    </UserProvider>
  );
}

export default App;
