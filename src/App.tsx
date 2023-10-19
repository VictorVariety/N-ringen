import { Routes, Route, BrowserRouter } from "react-router-dom";

import Home from "@/pages/home";
import Examples from "@/pages/examples";
import List from "@/pages/list";
import Navbar from "@/components/Navbar";

import { collection, getDocs } from "firebase/firestore";

import { useAuthState } from "react-firebase-hooks/auth";
import Auth from "./components/Auth";
import { auth } from "./server/firebaseConfig";

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
              <Route path="list" element={<List />} />
            </Routes>
          </BrowserRouter>
        </>
      ) : (
        <Auth />
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
