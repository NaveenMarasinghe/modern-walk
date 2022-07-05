import "./App.css";
import Homepage from "./pages/homepage/Homepage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MensClothing from "./pages/mensClothing/MensClothing";
import WomensClothing from "./pages/womensClothing/WomensClothing";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";
import { UserProvider } from "./context/userContext";
import { AppProvider } from "./context/appContext";
import { QueryClient, QueryClientProvider } from "react-query";
import { CartProvider } from "./context/cartContext";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <UserProvider>
      <AppProvider>
        <CartProvider>
          <QueryClientProvider client={queryClient}>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Homepage />} />
                <Route path="/mens-clothing" element={<MensClothing />} />
                <Route path="/womens-clothing" element={<WomensClothing />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
              </Routes>
            </BrowserRouter>
          </QueryClientProvider>
        </CartProvider>
      </AppProvider>
    </UserProvider>
  );
}

export default App;
