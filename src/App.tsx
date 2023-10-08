import { Routes, Route, BrowserRouter } from "react-router-dom";

import Home from "@/pages/home";
import Examples from "@/pages/examples";
import List from "@/pages/list";
import Navbar from "@/components/Navbar";

function App() {
  return (
    <div>
      <Navbar />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="examples" element={<Examples />} />
          <Route path="list" element={<List />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
