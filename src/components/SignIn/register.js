import { auth } from "firebase";
import React, { useState } from "react";
import {
  generateUserDocument,
  signInWithGoogle,
} from "../../Firebase/firebase";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [loginn, setLoginn] = useState(true);

  const signInWithEmailAndPasswordHandler = (event, email, password) => {
    auth.signInWithEmailAndPassword(email, password);
  };

  const createUserWithEmailAndPasswordHandler = async (
    event,
    email,
    password
  ) => {
    const { user } = await auth.createUserWithEmailAndPassword(email, password);
    generateUserDocument(user, { displayName });

    setEmail("");
    setPassword("");
    setDisplayName("");
  };

  return (
    <div className="login">
      {loginn ? (
        <>
          <h1>Log in </h1>

          <form>
            <input
              id="email"
              onChange={(event) => setEmail(event.value)}
              placeholder="Enter your email"
              label="Email"
              value={email}
              type="email"
            />
            <input
              id="password"
              onChange={(event) => setPassword(event.value)}
              placeholder="Enter your password"
              label="Password"
              value={password}
              type="password"
            />
            <button
              type="button"
              onClick={(event) => {
                event.preventDefault();
                signInWithEmailAndPasswordHandler(event, email, password);
              }}
            >
              Log in
            </button>
          </form>
          <span>or</span>
          <button onClick={signInWithGoogle}>Sign in with Google</button>

          <p>
            Don't have an account yet?
            <span onClick={() => setLoginn(!loginn)}>Register</span>
          </p>
        </>
      ) : (
        <>
          <h1>Register</h1>
          <form>
            <input
              id="displayName"
              onChange={(event) => setDisplayName(event.value)}
              placeholder="Enter your name"
              label="Name"
              value={displayName}
              type="text"
            />
            <input
              id="email"
              onChange={(event) => setEmail(event.value)}
              placeholder="Enter your email"
              label="Email"
              value={email}
              type="email"
            />
            <input
              id="password"
              onChange={(event) => setPassword(event.value)}
              placeholder="Enter your password"
              label="Password"
              value={password}
              type="password"
            />
            <button
              type="button"
              onClick={(event) => {
                event.preventDefault();
                createUserWithEmailAndPasswordHandler(event, email, password);
              }}
            >
              register
            </button>
          </form>
          <span>or</span>
          <button onClick={signInWithGoogle}>Sign in with Google</button>
          <p>
            Are you already a user?
            <span onClick={() => setLoginn(!loginn)}>Sign in</span>
          </p>
        </>
      )}
    </div>
  );
};
