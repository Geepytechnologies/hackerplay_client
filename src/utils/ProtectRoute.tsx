import React from "react";
import useAuth from "../hooks/useAuth";
import { Navigate, Outlet } from "react-router-dom";

type Props = {};

const ProtectRoute = (props: Props) => {
  const isAuthenticated = useAuth();
  return <div>{!isAuthenticated ? <Outlet /> : <Navigate to={"/"} />}</div>;
};

export default ProtectRoute;
