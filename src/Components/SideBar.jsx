import {
  LayoutDashboard,
  Calendar,
  CheckSquare,
  BookOpen,
  PenTool,
  FileText,
  BarChart2,
  Settings,
  GraduationCap,
} from "lucide-react";
import { Link } from "react-router-dom";

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", active: true },
  { icon: Calendar, label: "Calendar" },
  { icon: CheckSquare, label: "Tasks" },
  { icon: BookOpen, label: "Subjects" },
  { icon: PenTool, label: "Exams" },
  { icon: FileText, label: "Notes" },
  { icon: BookOpen, label: "Resources" },
  { icon: BarChart2, label: "Progress" },
  { icon: Settings, label: "Settings" },
];

export const Sidebar = () => {
  return (
    <aside className="w-64 bg-[#161B2B] p-6 flex flex-col border-r border-white/5">
      {/* Logo Area */}
      <div className="w-12 h-12 bg-purple-600 rounded-xl flex items-center justify-center mb-10 text-white shadow-lg shadow-purple-600/20">
        <GraduationCap className="w-7 h-7" />
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-2">
        {navItems.map((item, idx) => (
          <Link to={"/"+item.label}>
            <button
              key={idx}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-sm font-medium
              ${
                item.active
                  ? "bg-purple-600 text-white shadow-md shadow-purple-900/30"
                  : "text-slate-400 hover:text-slate-200 hover:bg-white/5"
              }`}
            >
              <item.icon className="w-5 h-5" />
              {item.label}
            </button>
          </Link>
        ))}
      </nav>

      {/* Quote Box */}
      <div className="mt-auto bg-[#1A1F2C] p-5 rounded-2xl border border-white/5">
        <span className="text-2xl text-purple-500 font-serif leading-none">
          "
        </span>
        <p className="text-sm tracking-widest text-slate-400 font-medium leading-relaxed">
          Discipline today
          <br />
          freedom tomorrow.
        </p>
      </div>
    </aside>
  );
};
