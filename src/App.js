import { useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import Login from "./scenes/login";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Admin from "./scenes/admin";
import Team from "./scenes/team";
import Activities from "./scenes/activities";
import AddUser from "./scenes/add_user";
import AddActivity from "./scenes/add_activity";
import Request from "./scenes/request";
import Employee from "./scenes/employee";
import Sidebar1 from "./scenes/global/Sidebar1";
import Calendar from "./scenes/calendar/calendar";
import Voucher from "./scenes/voucher_manager";
import AddVoucher from "./scenes/add_voucher";

function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  const location = useLocation();

  // Kiểm tra nếu route hiện tại là trang đăng nhập
  const isLoginPage = location.pathname === "/";

  // Xác định sidebar nào sẽ hiển thị
  const isAdminRoute = location.pathname.startsWith("/admin");
  const isEmployeeRoute = location.pathname.startsWith("/employee");

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          {!isLoginPage && (
            <>
              {isAdminRoute && <Sidebar isSidebar={isSidebar} />}
              {isEmployeeRoute && <Sidebar1 isSidebar={isSidebar} />}
            </>
          )}
          <main className="content">
            {!isLoginPage && <Topbar setIsSidebar={setIsSidebar} />}
            <Routes>
              {/* Route dành cho trang login */}
              <Route path="/" element={<Login />} />

              {/* Các route dành cho admin */}
              <Route path="/admin" element={<Admin />} />
              <Route path="/admin/team" element={<Team />} />
              <Route path="/admin/activities" element={<Activities />} />
              <Route path="/admin/add_user" element={<AddUser />} />
              <Route path="/admin/add_activity" element={<AddActivity />} />
              <Route path="/admin/request" element={<Request />} />
              <Route path="/admin/voucher" element={<Voucher />} />
              <Route path="/admin/add_voucher" element={<AddVoucher />} />

              {/* Các route dành cho employee */}
              <Route path="/employee" element={<Employee />} />
              <Route path="/employee/calendar" element={<Calendar />} />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
