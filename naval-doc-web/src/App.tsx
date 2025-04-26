import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LayoutWrapper from "./components/layout/layoutWrapper";
import ItemsDashboard from "./modules/items/dashboard";
import Login from "./auth/login";
import UserDashboard from "./modules/dashboard";
import FinanceDB from "./modules/finance/dashboard";
import InventoryDB from "./modules/inventory/dashboard";
import PersonalDetailsForm from "./modules/profile";
import CanteenSelection from "./modules/profile/canteenprocess";

import "./App.css";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* <Route path="/" element={<Login />} /> */}
        {/* Protected or main layout routes */}
        <Route element={<LayoutWrapper pageTitle="Naval Dashboard" />}>
          <Route path="/" element={<UserDashboard />} />
          <Route path="/view-all-items" element={<ItemsDashboard />} />
          <Route path="/finance-management" element={<FinanceDB />} />
          <Route path="/inventory-management" element={<InventoryDB />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
