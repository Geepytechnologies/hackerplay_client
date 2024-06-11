import React from "react";
import useAuth from "../hooks/useAuth";
import { Outlet } from "react-router-dom";
import Signin from "../components/Signin";

type Props = {};

const PersistUser = (props: Props) => {
  const isAuthenticated = useAuth();
  return <div>{isAuthenticated ? <Outlet /> : <Signin />}</div>;
};

export default PersistUser;
