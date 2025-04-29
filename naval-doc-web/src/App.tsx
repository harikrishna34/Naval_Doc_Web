import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

import LayoutWrapper from "./components/layout/layoutWrapper";
import AdminDB from "./modules/admin/adminDB";
import FinanceDB from "./modules/finance/dashboard";
import InventoryDB from "./modules/inventory/dashboard";
import Menu from "./modules/menu/menu";
import Profile from "./modules/profile/profile";
import Wallet from "./modules/wallet/wallet";
import Billing from "./modules/billing";
import Notifications from "./modules/notifications/notifications";
import Cart from "./modules/cart/cart";
import SuperAdminDashboard from "./modules/superAdmin/dashboard";
import CanteenList from "./modules/superAdmin/canteensList";
import UsersList from "./modules/users/userList";
import ItemsList from "./modules/items/itemsList";
import MenuList from "./modules/adminMenus/menuList";
import NotFound from "./components/common/notFound";
import ProtectedRoute from "./auth/protectedRoute";
import LoginScreen from "./auth/loginScreen";
import CanteenAdminDB from "./modules/admin/canteenAdminDB";

const isAuthenticated = Boolean(localStorage.getItem("Token"));

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginScreen />} />
        <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} />}>
          <Route element={<LayoutWrapper pageTitle="Naval Dashboard" />}>
            <Route path="/dashboard" element={<SuperAdminDashboard />} />
            <Route path="/finance-management" element={<FinanceDB />} />
            <Route path="/inventory-management" element={<InventoryDB />} />
            <Route path="/billing" element={<Billing />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/wallet" element={<Wallet />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/admin" element={<AdminDB />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/canteens-list" element={<CanteenList />} />
            <Route path="/canteens-list/canteen-dashboard/:canteenId/users-list" element={<UsersList />} />
            <Route path="/items-list" element={<ItemsList />} />
            <Route path="/menus-list" element={<MenuList />} />
            <Route path="/canteens-list/canteen-dashboard/:canteenId" element={<CanteenAdminDB/>}/>
          </Route>
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
