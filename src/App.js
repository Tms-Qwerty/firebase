import React, { useEffect } from "react";
// import { Router } from "@reach/router";
import { useSelector, useDispatch } from "react-redux";

import Profile from "./components/Profile/Profile";

// import PasswordReset from "./components/PasswordReset/PasswordReset";

import { auth, generateUserDocument } from "./Firebase/firebase";
import { setUser, selectUser } from "./Firebase/firebaseSlice";

import "./App.css";
import { Login } from "./components/SignIn/register";

const App = () => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const user = await generateUserDocument(userAuth);
        const { uid, displayName, email, photoURL } = user;
        dispatch(setUser({ uid, displayName, email, photoURL }));
      }
    });
  }, [dispatch]);

  return user ? <Profile /> : <Login />;
};

export default App;
