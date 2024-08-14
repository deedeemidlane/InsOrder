import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/Home";
import LoginPage from "./pages/Login";
import AdminPage from "./pages/admin/Admin";
import ManagerPage from "./pages/shop/manager/Manager";
import StaffPage from "./pages/shop/staff/Staff";
import CustomerPage from "./pages/shop/customer/Customer";
import MenuManagementPage from "./pages/shop/manager/menu/Menu";
import StaffManagementPage from "./pages/shop/manager/staff/Staff";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/admin" element={<AdminPage />} />
      <Route path="/shop/manager">
        <Route index element={<ManagerPage />} />
        <Route path="menu" element={<MenuManagementPage />} />
        <Route path="staff" element={<StaffManagementPage />} />
      </Route>
      <Route path="/shop/staff" element={<StaffPage />} />
      <Route path="/shop/public/:shopName" element={<CustomerPage />} />
    </Routes>
  );
}

export default App;
