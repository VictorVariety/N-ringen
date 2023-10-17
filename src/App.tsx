import { Routes, Route, BrowserRouter } from "react-router-dom";

import Home from "@/pages/home";
import Examples from "@/pages/examples";
import List from "@/pages/list";
import Navbar from "@/components/Navbar";

import { collection, getDocs } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

import { useAuthState } from "react-firebase-hooks/auth";
import SignIn from "./components/SignIn";

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const analytics = getAnalytics(app);

export default function App() {
  const [user] = useAuthState(auth);

  return (
    <div>
      {user ? (
        <>
          <Navbar />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="examples" element={<Examples />} />
              <Route path="list" element={<List />} />
            </Routes>
          </BrowserRouter>
        </>
      ) : (
        <SignIn auth={auth} />
      )}
    </div>
  );
}

async function getMeals(db: any) {
  const mealCol = collection(db, "meals");
  const meals = await getDocs(mealCol);
  const mealList = meals.docs.map((doc) => doc.data());
  return mealList;
}
