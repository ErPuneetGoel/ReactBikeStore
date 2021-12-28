import { Routes, Route } from "react-router";
import Brands from "./Pages/Brands";
import Products from "./Pages/Products";
import MainNavigation from "./Components/Layout/MainNavigation";

function App() {
  return (
    <div>
      <MainNavigation />
      <div class="mainbody">
      <Routes>
      <Route path="/" element={<Brands />} />
        <Route path="/Products/:id" element={<Products />} />
      </Routes>
      </div>
    </div>
  );
}

export default App;
