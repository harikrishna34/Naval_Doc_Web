import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Login from "./auth/login";
import LayoutWrapper from "./components/layout/layoutWrapper";
import UserDashboard from "./modules/dashboard";
import FinanceDB from "./modules/finance/dashboard";
import InventoryDB from "./modules/inventory/dashboard";
import ItemsDashboard from "./modules/items/dashboard";
import PersonalDetailsForm from "./modules/profile";
import CanteenSelection from "./modules/profile/canteenprocess";

import "./App.css";

const App = () => {
  return (
    <Router>
      <div>
        <LayoutWrapper pageTitle="Naval Dashboard">
          {/* <h1>Welcome to the Dashboard</h1> */}
          {/* <p>This is a sample dashboard layout.</p> */}
          <Routes>
            {/* <Route path="/signup" element={<SignUpForm />} /> */}
            {/* <Route path="/login" element={<Login />} /> */}
            {/* <Route path="/" element={<HomePage />} /> */}
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<PersonalDetailsForm/>} />
            <Route path="/canteenselection" element={<CanteenSelection />} />
            <Route path="/dashboard" element={<UserDashboard />} />
            <Route path="/view-all-items" element={<ItemsDashboard />} />
            <Route path="/finance-management" element={<FinanceDB />} />
            <Route path="/inventory-management" element={<InventoryDB />} />
          </Routes>
        </LayoutWrapper>
      </div>
    </Router>
  );
};

export default App;
