import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import LayoutWrapper from "./components/layout/layoutWrapper";
import ItemsDashboard from "./modules/items/dashboard";
import Login from "./auth/login";
import UserDashboard from "./modules/dashboard";
import FinanceDB from "./modules/finance/dashboard";
import InventoryDB from "./modules/inventory/dashboard";
import Billing from "./modules/billing";
import Profile from "./modules/profile/profile";
import Wallet from "./modules/wallet/wallet";
import Notifications from "./modules/notifications/notifications";
import Cart from "./modules/cart/cart";
import AddCanteen from "./modules/superAdmin/addCanteen";
import AdminDB from "./modules/admin/adminDB";
import Menu from "./modules/menu/menu";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        {/* Protected or main layout routes */}
        <Route element={<LayoutWrapper pageTitle="Naval Dashboard" />}>
          <Route path="/dashboard" element={<UserDashboard />} />
          <Route path="/view-all-items" element={<ItemsDashboard />} />
          <Route path="/finance-management" element={<FinanceDB />} />
          <Route path="/inventory-management" element={<InventoryDB />} />
          <Route path="/billing" element={<Billing />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/wallet" element={<Wallet />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/add-canteen" element={<AddCanteen />} />
          <Route path="/admin" element={<AdminDB />} />
          <Route path="/menu" element={<Menu />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
