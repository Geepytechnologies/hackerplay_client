import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../config/store";

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const user = useSelector((state: RootState) => state.user);
  console.log({ userfromstate: user });
  useEffect(() => {
    if (user) {
      setIsAuthenticated(true);
    }
  }, []);

  return isAuthenticated;
};

export default useAuth;
