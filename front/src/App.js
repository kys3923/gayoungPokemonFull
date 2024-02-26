import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";

import Header from "./components/header/header";
import Landing from "./pages/landing/landing";
import Register from "./pages/auth/register";
import Login from "./pages/auth/login";
import PokemonLanding from "./pages/pokemon/pokemonLanding";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/account/register' element={<Register />} />
        <Route path='/account/login' element={<Login />} />
        <Route path='/pokemon' element={<PokemonLanding />} />
      </Routes>
    </Router>
  );
}

export default App;
