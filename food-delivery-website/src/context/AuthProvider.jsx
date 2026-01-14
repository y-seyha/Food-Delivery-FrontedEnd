import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";
import { jwtDecode } from "jwt-decode";

const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [token, setToken] = useState(() => localStorage.getItem("token"));

  const user = useMemo(() => {
    if (!token) return null;

    try {
      return jwtDecode(token);
    } catch {
      localStorage.removeItem("token");
      return null;
    }
  }, [token]);

  const loginUser = (userData, token) => {
    localStorage.setItem("token", token); 
    setToken(token);
    navigate("/");
  };

  const logoutUser = () => {
    setToken(null);
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ user, token, loginUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
