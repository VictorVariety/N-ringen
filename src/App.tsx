// import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import { Routes, Route, BrowserRouter } from "react-router-dom";

import Home from "@/pages/home";
import Examples from "@/pages/examples";
import Navbar from "@/components/Navbar";

import { useAuthState } from "react-firebase-hooks/auth";
import Auth from "./components/Auth";
import { auth } from "./server/firebaseConfig";
import Profile from "@/pages/profile";

export function getUser() {
  return auth;
}
export default function App() {
  const [user, loading] = useAuthState(auth);

  if (loading) {
    return null;
  }

  return (
    <div>
      {user ? (
        <>
          <Navbar />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="examples" element={<Examples />} />
              <Route path="profile" element={<Profile />} />
            </Routes>
          </BrowserRouter>
        </>
      ) : (
        <Auth />
      )}
    </div>
  );
}
