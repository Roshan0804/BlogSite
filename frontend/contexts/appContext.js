import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Loader from "../components/wigets/loader";
export const AppContext = React.createContext({});

export default function AppContextComponent({ children }) {
  const { push } = useRouter();
  const [loader, setLoader] = useState(false);
  const [session, setSession] = useState({ isLoggedIn: false, user: {} });

  async function checkSession() {
    const user = await localStorage.getItem("user");
    const userObj = user ? JSON.parse(user) : {};
    if (userObj?.user) {
      setSession({ ...userObj, isLoggedIn: true });
    } else {
      setSession({ user: {}, isLoggedIn: false });
      localStorage.setItem("user", "");
    }
  }

  async function loginUser(data) {
    await localStorage.setItem("user", JSON.stringify(data));
    setSession({ isLoggedIn: true, user: data });
  }

  async function logout() {
    if (confirm("Are you sure want to logout?")) {
      window.location = "/";
      setLoader(true);
      localStorage.setItem("user", "");
      setTimeout(() => {
        setLoader(false);
      }, 2000);
    }
  }

  useEffect(() => {
    checkSession();
  }, []);

  const contextValues = {
    loader,
    setLoader,
    session,
    loginUser,
    logout,
    setSession,
  };

  return (
    <AppContext.Provider value={contextValues}>
      {loader && <Loader />}
      {children}
    </AppContext.Provider>
  );
}
