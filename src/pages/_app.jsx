import "@/styles/globals.css";
import ResponsiveDrawer from "@/components/Menu/ResponsiveDrawer";
import { useState, useEffect, useMemo } from "react";
import { setTokenApi, getTokenApi, removeTokenApi } from "@/services/api/token";
import jwtDecode from "jwt-decode";
import { constant } from "@/utils/constant";
import AuthContext from "@/context/AuthContext";
import Login from "./login";

export default function App({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => page);

  const [auth, setAuth] = useState(undefined);

  useEffect(() => {
    (async () => {
      const token = await getTokenApi();
      if (token) {
        const dataJWT = jwtDecode(token);
        setAuth({
          token,
          userId: dataJWT.data._id,
        });
      } else {
        setAuth(null);
      }
    })();
  }, []);

  const login = (user) => {
    const dataJWT = jwtDecode(user.data);
    setTokenApi(user.data);
    setAuth({
      token: user.data,
      userId: dataJWT.data._id,
    });
  };

  const logout = () => {
    if (auth) {
      removeTokenApi();
      setAuth(null);
    }
  };

  const authData = useMemo(
    () => ({
      auth,
      login,
      logout,
    }),
    [auth]
  );

  if (auth === undefined) return null;

  return (
    <AuthContext.Provider value={authData}>
      {auth ? getLayout(<Component {...pageProps} />) : <Login />}
    </AuthContext.Provider>
  );
}
