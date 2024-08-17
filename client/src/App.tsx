import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/Home";
import LoginPage from "./pages/Login";
import AdminPage from "./pages/admin/Admin";
import ManagerPage from "./pages/shop/manager/Manager";
import StaffPage from "./pages/shop/staff/Staff";
import MenuManagementPage from "./pages/shop/manager/menu/Menu";
import StaffManagementPage from "./pages/shop/manager/staff/Staff";
import OrderTrackingPage from "./pages/shop/customer/OrderTracking";
import ShopInfoPage from "./pages/shop/customer/ShopInfo";
import MenuPage from "./pages/shop/customer/Menu";
import CartPage from "./pages/shop/customer/Cart";
import ConfirmPaymentPage from "./pages/shop/customer/ConfirmPayment";
import QrPaymentPage from "./pages/shop/customer/QrPayment";
import AfterPaymentPage from "./pages/shop/customer/AfterPayment";
import { useAuthContext } from "./context/AuthContext";

function App() {
  const { authUser, isLoading } = useAuthContext();

  if (isLoading) return null;

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/admin" element={<AdminPage />} />
      <Route path="/shop/manager">
        <Route
          index
          element={
            authUser?.role !== "MANAGER" ? <LoginPage /> : <ManagerPage />
          }
        />
        <Route
          path="menu"
          element={
            authUser?.role !== "MANAGER" ? (
              <LoginPage />
            ) : (
              <MenuManagementPage />
            )
          }
        />
        <Route
          path="staff"
          element={
            authUser?.role !== "MANAGER" ? (
              <LoginPage />
            ) : (
              <StaffManagementPage />
            )
          }
        />
      </Route>
      <Route path="/shop/staff" element={<StaffPage />} />
      <Route path="/shop/public/:shopName">
        <Route index element={<MenuPage />} />
        <Route path="order-tracking" element={<OrderTrackingPage />} />
        <Route path="shop-info" element={<ShopInfoPage />} />
        <Route path="cart" element={<CartPage />} />
        <Route path="confirm-payment" element={<ConfirmPaymentPage />} />
        <Route path="qr-pay" element={<QrPaymentPage />} />
        <Route path="after-payment" element={<AfterPaymentPage />} />
      </Route>
    </Routes>
  );
}

export default App;
