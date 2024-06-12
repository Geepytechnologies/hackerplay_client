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

function App() {
  const appUser = useSelector((state: any) => state.user);
  console.log(appUser);
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<PersistUser />}>
            <Route path="*" element={<Home />} />
          </Route>

          <Route path="admin" element={<Admin />} />
          <Route path="signin" element={<Signin />} />
          <Route path="signup" element={<Signup />} />
          <Route path="profile" element={<Profile />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
