import { useState, useEffect } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import BottomNavBar from "./BottomNavBar";
import GlobalCreateModal from "./GlobalCreateModal";

// Icons as SVG components
const HomeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z" />
    <path d="M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H5.625a1.875 1.875 0 01-1.875-1.875v-6.198a2.29 2.29 0 00.091-.086L12 5.432z" />
  </svg>
);

const TasksIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path fillRule="evenodd" d="M7.502 6h7.128A3.375 3.375 0 0118 9.375v9.375a3 3 0 003-3V6.108c0-1.505-1.125-2.811-2.664-2.94a48.972 48.972 0 00-8.583-.063c-1.476.106-2.633 1.27-2.74 2.715a31.568 31.568 0 00-.011.182zM3.75 21h7.5a3.75 3.75 0 003.75-3.75v-8.5A3.75 3.75 0 0011.25 5h-7.5A3.75 3.75 0 000 8.75v8.5A3.75 3.75 0 003.75 21zm1.5-12.5a.75.75 0 000 1.5h4.5a.75.75 0 000-1.5h-4.5zm0 3a.75.75 0 000 1.5h4.5a.75.75 0 000-1.5h-4.5zm0 3a.75.75 0 000 1.5h4.5a.75.75 0 000-1.5h-4.5z" clipRule="evenodd" />
  </svg>
);

const PlannerIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path fillRule="evenodd" d="M6.75 2.25A.75.75 0 017.5 3v1.5h9V3A.75.75 0 0118 3v1.5h.75a3 3 0 013 3v11.25a3 3 0 01-3 3H5.25a3 3 0 01-3-3V7.5a3 3 0 013-3H6V3a.75.75 0 01.75-.75zm13.5 9a1.5 1.5 0 00-1.5-1.5H5.25a1.5 1.5 0 00-1.5 1.5v7.5a1.5 1.5 0 001.5 1.5h13.5a1.5 1.5 0 001.5-1.5v-7.5z" clipRule="evenodd" />
  </svg>
);

const SubjectsIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M11.25 4.533A9.707 9.707 0 006 3a9.735 9.735 0 00-3.25.555.75.75 0 00-.5.707v14.25a.75.75 0 001 .707A8.237 8.237 0 016 18.75c1.995 0 3.823.708 5.25 1.898V4.533zM12.75 20.648A8.237 8.237 0 0118 18.75c1.995 0 3.823.708 5.25 1.898a.75.75 0 001-.707V5.612a.75.75 0 00-.5-.707A9.735 9.735 0 0018 3a9.707 9.707 0 00-5.25 1.533v16.115z" />
  </svg>
);

export default function AppLayout() {
  const { user, logout } = useAuth();
  const location = useLocation();

  const [isFocusMode, setIsFocusMode] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

  // Close dropdown on location change
  useEffect(() => {
    setIsProfileDropdownOpen(false);
    setIsCreateModalOpen(false);
  }, [location.pathname]);

  const initials = user?.name
    ? user.name.split(" ").map((n) => n[0]).slice(0, 2).join("").toUpperCase()
    : "ES";

  const firstName = user?.name ? user.name.split(" ")[0] : "Estudante";

  const menuItems = [
    { to: "/dashboard", label: "Início", icon: <HomeIcon /> },
    { to: "/activities", label: "Tarefas", icon: <TasksIcon /> },
    { to: "/planner", label: "Semana", icon: <PlannerIcon /> },
    { to: "/subjects", label: "Matérias", icon: <SubjectsIcon /> },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-indigo-900 to-violet-950 text-white font-sans overflow-x-hidden">
      
      {/* 1. SIDEBAR DESKTOP */}
      {!isFocusMode && (
        <aside className="hidden lg:flex fixed inset-y-0 left-0 w-64 bg-gradient-to-b from-indigo-950 to-[#1e1b4b] border-r border-indigo-900/30 flex-col justify-between p-6 z-30">
          <div className="space-y-8">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
                <span className="text-xl">💡</span>
              </div>
              <span className="text-xl font-bold text-white tracking-tight">Lúmen</span>
            </div>

            {/* Menu Navigation */}
            <nav className="flex flex-col gap-1.5">
              {menuItems.map((item) => {
                const isActive = location.pathname === item.to;
                return (
                  <Link
                    key={item.to}
                    to={item.to}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 cursor-pointer ${
                      isActive
                        ? "bg-white/10 text-white shadow-sm"
                        : "text-indigo-200 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    <span className={isActive ? "text-indigo-400" : "text-indigo-300/80"}>
                      {item.icon}
                    </span>
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* User Profile Card */}
          <div className="border-t border-indigo-900/40 pt-4.5 space-y-3">
            <div className="flex items-center gap-3 px-1.5">
              <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center font-bold text-white text-xs shadow-md shrink-0">
                {initials}
              </div>
              <div className="min-w-0">
                <p className="text-xs font-bold text-white truncate leading-tight">{firstName}</p>
                <p className="text-[10px] text-indigo-300/70 truncate leading-none mt-0.5">{user?.email}</p>
              </div>
            </div>
            <button
              onClick={logout}
              className="w-full py-2 px-3 rounded-xl bg-white/5 hover:bg-red-500/15 hover:text-red-300 hover:border-red-500/20 text-indigo-200 text-[10px] font-semibold border border-indigo-900/30 transition-all cursor-pointer text-center block"
            >
              Sair da conta
            </button>
          </div>
        </aside>
      )}

      {/* 2. TOPBAR DESKTOP */}
      {!isFocusMode && (
        <header className="hidden lg:flex fixed top-0 right-0 left-64 h-16 bg-indigo-950 border-b border-indigo-900/20 z-20 items-center justify-between px-8 text-white">
          {/* Spacer to push search box to center */}
          <div className="w-48 shrink-0" />

          {/* Search Box - Centralized */}
          <div className="relative w-80">
            <span className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-indigo-300">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.2} stroke="currentColor" className="w-3.5 h-3.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.637 10.637z" />
              </svg>
            </span>
            <input
              type="text"
              placeholder="Buscar tarefas, matérias..."
              className="w-full bg-white/10 border border-indigo-900/30 rounded-xl py-2 pl-9 pr-4 text-xs text-white placeholder-indigo-300/50 outline-none transition-all focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/15"
            />
          </div>

          {/* Right Action buttons */}
          <div className="flex items-center gap-4 shrink-0">
            {/* Create CTA Button (Black background) */}
            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="h-10 px-4 inline-flex items-center justify-center gap-2 rounded-xl bg-black hover:bg-neutral-900 text-white text-xs font-bold transition-all shadow-md shadow-black/10 active:scale-98 cursor-pointer border border-white/5"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
              </svg>
              Novo item
            </button>

            {/* Avatar Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                className="w-8 h-8 rounded-full bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center font-bold text-indigo-200 text-[10px] shadow-inner cursor-pointer hover:border-indigo-400/50 hover:bg-indigo-600/35 transition-all"
              >
                {initials}
              </button>

              {isProfileDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-indigo-950 border border-indigo-900/40 rounded-2xl shadow-xl p-2 z-50 backdrop-blur-lg animate-[fadeIn_0.15s_ease-out]">
                  <p className="px-3.5 py-2 text-xs font-semibold text-indigo-300 border-b border-white/5 truncate">
                    Olá, {firstName}
                  </p>
                  <Link
                    to="/subjects"
                    className="w-full text-left block px-3.5 py-2.5 rounded-xl hover:bg-white/5 text-xs font-medium text-white transition-colors cursor-pointer"
                  >
                    Configurações
                  </Link>
                  <button
                    onClick={logout}
                    className="w-full text-left block px-3.5 py-2.5 rounded-xl hover:bg-red-500/10 hover:text-red-400 text-xs font-medium text-indigo-350 transition-colors cursor-pointer"
                  >
                    Desconectar
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>
      )}

      {/* 3. MAIN CONTENT WINDOW */}
      <div className={`transition-all duration-300 min-h-screen bg-[#f8fafc] text-gray-900 ${
        !isFocusMode ? "lg:pl-64 lg:pt-16" : ""
      }`}>
        <Outlet context={{ isFocusMode, setIsFocusMode }} />
      </div>

      {/* 4. MOBILE BOTTOM NAVBAR */}
      {!isFocusMode && (
        <div className="lg:hidden">
          <BottomNavBar onOpenCreateModal={() => setIsCreateModalOpen(true)} />
        </div>
      )}

      {/* 5. GLOBAL CREATION SHEET/MODAL */}
      <GlobalCreateModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />
    </div>
  );
}
