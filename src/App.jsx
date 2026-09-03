import { Sidebar } from "./Components/SideBar";
import { DashboardPage } from "./Pages/DashBoard";
import { CalendarPage } from "./Pages/Calendar";
import { Routes, Route, Navigate } from "react-router-dom";
export default function StudyDashboard() {
  return (
    <div className="min-h-screen bg-[#0B0F19] text-slate-200 font-sans flex items-center justify-center">
      {/* Outer Dashboard Container */}
      <div className="flex w-screen h-screen bg-[#121624] overflow-hidden shadow-2xl border border-white/5">
        <Sidebar />
        <Routes>
          <Route path="/" />

          {/* Automatically redirect from "/" to "/Dashboard" */}
          <Route index element={<Navigate to="/Dashboard" replace />} />
          <Route path="/Dashboard" element={<DashboardPage />}></Route>
          <Route path="/Calendar" element={<CalendarPage />}></Route>
        </Routes>
      </div>
    </div>
  );
}
