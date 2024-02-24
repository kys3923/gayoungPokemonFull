import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";

import Header from "./components/header/header";
import Landing from "./pages/landing/landing";
import Register from "./pages/auth/register";
import Login from "./pages/auth/login";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/account/register' element={<Register />} />
        <Route path='/account/login' element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
