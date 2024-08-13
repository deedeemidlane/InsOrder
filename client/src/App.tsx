import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/Home";
import LoginPage from "./pages/Login";
import AdminPage from "./pages/admin/Admin";
import ManagerPage from "./pages/shop/manager/Manager";
import StaffPage from "./pages/shop/staff/Staff";
import CustomerPage from "./pages/shop/customer/Customer";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/admin" element={<AdminPage />} />
      <Route path="/shop/manager" element={<ManagerPage />} />
      <Route path="/shop/staff" element={<StaffPage />} />
      <Route path="/shop/public/:shopName" element={<CustomerPage />} />
    </Routes>
  );
}

export default App;
