import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../config/store";

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const { currentuser } = useSelector((state: RootState) => state.user);
  console.log({ userfromstate: currentuser });
  useEffect(() => {
    if (currentuser) {
      setIsAuthenticated(true);
    }
  }, []);

  return isAuthenticated;
};

export default useAuth;
