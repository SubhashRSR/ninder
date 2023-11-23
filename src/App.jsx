import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/login";
import Signup from "./components/signup";
import Homepage from "./components/homepage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/homepage" element={<Homepage />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
