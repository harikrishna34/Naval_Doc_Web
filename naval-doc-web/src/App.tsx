import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
import OrdersDashboard from "./modules/orders/ordersDB";
import Contact from "./modules/support/contactSupport";
import ExamplePaymentResponse from "./components/paymentmethods/paymentResponse";
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginScreen />} />
        <Route
          path="/paymentResponse"
          element={<ExamplePaymentResponse />}
        />{" "}
        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
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
            <Route path="contact-support" element={<Contact />} />
            <Route
              path="/canteens-list/canteen-dashboard/:canteenId/users-list"
              element={<UsersList />}
            />
            <Route path="/items-list" element={<ItemsList />} />
            <Route path="/menus-list" element={<MenuList />} />
            <Route path="/orders" element={<OrdersDashboard />} />
            <Route
              path="/canteens-list/canteen-dashboard/:canteenId/:canteenName"
              element={<CanteenAdminDB />}
            />
            <Route
              path="/canteens-list/canteen-dashboard/:canteenId/:canteenName/orders"
              element={<OrdersDashboard />}
            />
            <Route
              path="/canteens-list/canteen-dashboard/:canteenId/:canteenName/menu"
              element={<MenuList />}
            />
          </Route>
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>

      {/* Toast Container at root level */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
        theme="light"
        aria-label="Notification container"
      />
    </Router>
  );
};

export default App;
