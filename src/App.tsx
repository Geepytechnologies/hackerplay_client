import { useState } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./screens/Home";
import Admin from "./screens/Admin";
import Signin from "./components/Signin";
import PersistUser from "./utils/PersistUser";
import Signup from "./components/Signup";
import { useSelector } from "react-redux";
import Profile from "./screens/Profile";
import ProtectRoute from "./utils/ProtectRoute";

function App() {
  const appUser = useSelector((state: any) => state.user);
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<PersistUser />}>
            <Route path="*" element={<Home />} />
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/admin" element={<Admin />} />
          </Route>
          <Route element={<ProtectRoute />}>
            <Route path="/signup" element={<Signup />} />
            <Route path="/signin" element={<Signin />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
