import { useState, useEffect } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import BottomNavBar from "./BottomNavBar";
import GlobalCreateModal from "./GlobalCreateModal";

// ─── Icon Components ───────────────────────────────────────────────
const DashboardIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z" />
    <path d="M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H5.625a1.875 1.875 0 01-1.875-1.875v-6.198a2.29 2.29 0 00.091-.086L12 5.432z" />
  </svg>
);

const SubjectsIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M11.25 4.533A9.707 9.707 0 006 3a9.735 9.735 0 00-3.25.555.75.75 0 00-.5.707v14.25a.75.75 0 001 .707A8.237 8.237 0 016 18.75c1.995 0 3.823.708 5.25 1.898V4.533zM12.75 20.648A8.237 8.237 0 0118 18.75c1.995 0 3.823.708 5.25 1.898a.75.75 0 001-.707V5.612a.75.75 0 00-.5-.707A9.735 9.735 0 0018 3a9.707 9.707 0 00-5.25 1.533v16.115z" />
  </svg>
);

const ActivitiesIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path fillRule="evenodd" d="M7.502 6h7.128A3.375 3.375 0 0118 9.375v9.375a3 3 0 003-3V6.108c0-1.505-1.125-2.811-2.664-2.94a48.972 48.972 0 00-8.583-.063c-1.476.106-2.633 1.27-2.74 2.715a31.568 31.568 0 00-.011.182zM3.75 21h7.5a3.75 3.75 0 003.75-3.75v-8.5A3.75 3.75 0 0011.25 5h-7.5A3.75 3.75 0 000 8.75v8.5A3.75 3.75 0 003.75 21zm1.5-12.5a.75.75 0 000 1.5h4.5a.75.75 0 000-1.5h-4.5zm0 3a.75.75 0 000 1.5h4.5a.75.75 0 000-1.5h-4.5zm0 3a.75.75 0 000 1.5h4.5a.75.75 0 000-1.5h-4.5z" clipRule="evenodd" />
  </svg>
);

const CalendarIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path fillRule="evenodd" d="M6.75 2.25A.75.75 0 017.5 3v1.5h9V3A.75.75 0 0118 3v1.5h.75a3 3 0 013 3v11.25a3 3 0 01-3 3H5.25a3 3 0 01-3-3V7.5a3 3 0 013-3H6V3a.75.75 0 01.75-.75zm13.5 9a1.5 1.5 0 00-1.5-1.5H5.25a1.5 1.5 0 00-1.5 1.5v7.5a1.5 1.5 0 001.5 1.5h13.5a1.5 1.5 0 001.5-1.5v-7.5z" clipRule="evenodd" />
  </svg>
);

const PomodoroIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 6a.75.75 0 00-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 000-1.5h-3.75V6z" clipRule="evenodd" />
  </svg>
);

const FlashcardIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M4.5 3.75a.75.75 0 00-1.5 0v16.5a.75.75 0 001.5 0V3.75zM7.9 3h8.2c.94 0 1.7.76 1.7 1.7v14.6c0 .94-.76 1.7-1.7 1.7H7.9c-.94 0-1.7-.76-1.7-1.7V4.7c0-.94.76-1.7 1.7-1.7z" />
  </svg>
);

const PlusIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
    <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
  </svg>
);

// ─── Nav Items ──────────────────────────────────────────────────────
const NAV_ITEMS = [
  { to: "/dashboard", label: "Dashboard", icon: <DashboardIcon /> },
  { to: "/subjects", label: "Disciplinas", icon: <SubjectsIcon /> },
  { to: "/activities", label: "Tarefas", icon: <ActivitiesIcon /> },
  { to: "/planner", label: "Calendário", icon: <CalendarIcon /> },
  { to: "/pomodoro", label: "Sessões de Estudo", icon: <PomodoroIcon /> },
  { to: "/flashcards", label: "Flashcards", icon: <FlashcardIcon /> },
];

// ─── Lúmen Logo Image ───────────────────────────────────────────────
const LumenLogo = () => (
  <img src="/favicon.png" alt="Lúmen Logo" className="w-8 h-8 object-contain shrink-0" />
);

export default function AppLayout() {
  const { logout } = useAuth();
  const location = useLocation();

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  // Close modal on location change
  useEffect(() => {
    setIsCreateModalOpen(false);
  }, [location.pathname]);

  return (
    <div className="flex flex-col h-screen bg-surface font-sans">

      {/* ── DESKTOP HORIZONTAL TOPBAR ────────────────────────────── */}
      <header className="hidden lg:flex h-14 bg-white border-b border-border sticky top-0 z-40 shrink-0 select-none w-full">
        <div className="max-w-6xl mx-auto w-full px-6 flex items-center justify-between h-full">
          
          {/* Left side: Logo + Text */}
          <div className="flex items-center gap-2 h-full">
            <LumenLogo />
            <span className="text-base font-bold text-text-primary tracking-tight">Lúmen</span>
          </div>

          {/* Center: NAV_ITEMS in horizontal line */}
          <div className="h-full flex items-stretch">
            <nav className="flex items-stretch gap-1">
              {NAV_ITEMS.map((item) => {
                const isActive = location.pathname === item.to;
                return (
                  <Link
                    key={item.to}
                    to={item.to}
                    className={`flex items-center px-4 border-b-2 transition-all duration-200 text-sm font-medium ${
                      isActive
                        ? "bg-primary-light text-primary border-primary"
                        : "text-zinc-500 hover:text-zinc-950 border-transparent hover:border-zinc-200"
                    }`}
                  >
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Right side: Actions */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-primary hover:bg-primary-hover text-white rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer"
            >
              <PlusIcon />
              <span>Nova tarefa</span>
            </button>
            <button
              onClick={logout}
              className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold text-zinc-500 hover:text-red-500 hover:bg-red-50 transition-all cursor-pointer"
              title="Sair da conta"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 shrink-0">
                <path fillRule="evenodd" d="M3 4.25A2.25 2.25 0 015.25 2h5.5A2.25 2.25 0 0113 4.25v2a.75.75 0 01-1.5 0v-2a.75.75 0 00-.75-.75h-5.5a.75.75 0 00-.75.75v11.5c0 .414.336.75.75.75h5.5a.75.75 0 00.75-.75v-2a.75.75 0 011.5 0v2A2.25 2.25 0 0110.75 18h-5.5A2.25 2.25 0 013 15.75V4.25z" clipRule="evenodd" />
                <path fillRule="evenodd" d="M6 10a.75.75 0 01.75-.75h9.546l-1.048-.943a.75.75 0 111.004-1.114l2.5 2.25a.75.75 0 010 1.114l-2.5 2.25a.75.75 0 11-1.004-1.114l1.048-.943H6.75A.75.75 0 016 10z" clipRule="evenodd" />
              </svg>
              <span>Sair</span>
            </button>
          </div>

        </div>
      </header>

      {/* ── PAGE CONTENT ───────────────────────────────────────── */}
      <main className="flex-1 overflow-y-auto">
        <Outlet />
      </main>

      {/* ── MOBILE BOTTOM NAVBAR ───────────────────────────────────── */}
      <div className="lg:hidden">
        <BottomNavBar onOpenCreateModal={() => setIsCreateModalOpen(true)} />
      </div>

      {/* ── GLOBAL CREATE MODAL ────────────────────────────────────── */}
      <GlobalCreateModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />
    </div>
  );
}
