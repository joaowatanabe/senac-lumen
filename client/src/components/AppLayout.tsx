import { useState, useEffect } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import BottomNavBar from "./BottomNavBar";

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
  const navigate = useNavigate();

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

  // Global Creation Handler
  function handleSelectCreateOption(type: "activity" | "planner" | "subject" | "pomodoro") {
    setIsCreateModalOpen(false);
    if (type === "activity") {
      navigate("/activities?create=true");
    } else if (type === "planner") {
      navigate("/planner?create=true");
    } else if (type === "subject") {
      navigate("/subjects?create=true");
    } else if (type === "pomodoro") {
      navigate("/pomodoro");
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-950 via-primary-900 to-primary-800 text-white font-sans overflow-x-hidden">
      
      {/* 1. SIDEBAR DESKTOP */}
      {!isFocusMode && (
        <aside className="hidden lg:flex fixed inset-y-0 left-0 w-64 bg-primary-950/40 border-r border-white/10 flex-col justify-between p-6 z-30 backdrop-blur-xl">
          <div className="space-y-8">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary-500/20 border border-primary-400/30 flex items-center justify-center">
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
                    className={`flex items-center gap-3 px-4.5 py-3.5 rounded-xl text-sm font-semibold transition-all duration-200 cursor-pointer ${
                      isActive
                        ? "bg-white/10 text-white shadow-sm"
                        : "text-primary-300 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    {item.icon}
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* User Profile Card */}
          <div className="border-t border-white/10 pt-4.5 space-y-3">
            <div className="flex items-center gap-3 px-1.5">
              <div className="w-9 h-9 rounded-xl bg-primary-600 flex items-center justify-center font-bold text-white text-sm shadow-md shadow-primary-950/20 shrink-0">
                {initials}
              </div>
              <div className="min-w-0">
                <p className="text-sm font-bold text-white truncate leading-tight">{firstName}</p>
                <p className="text-[11px] text-primary-400 truncate leading-none mt-0.5">{user?.email}</p>
              </div>
            </div>
            <button
              onClick={logout}
              className="w-full py-2.5 px-4.5 rounded-xl bg-white/5 hover:bg-red-500/10 hover:text-red-400 text-primary-300 text-xs font-semibold border border-white/10 transition-all cursor-pointer text-center block"
            >
              Sair da conta
            </button>
          </div>
        </aside>
      )}

      {/* 2. TOPBAR DESKTOP */}
      {!isFocusMode && (
        <header className="hidden lg:flex fixed top-0 right-0 left-64 h-16 bg-primary-950/20 backdrop-blur-xl border-b border-white/10 z-20 items-center justify-between px-8">
          {/* Search Box */}
          <div className="relative w-80">
            <span className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-primary-400">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.637 10.637z" />
              </svg>
            </span>
            <input
              type="text"
              placeholder="Buscar tarefas, matérias..."
              className="w-full bg-white/5 border border-white/10 rounded-xl py-2 pl-9 pr-4 text-xs text-white placeholder-primary-400/80 outline-none transition-all focus:border-primary-500 focus:ring-2 focus:ring-primary-500/15"
            />
          </div>

          {/* Right Action buttons */}
          <div className="flex items-center gap-4">
            {/* Create CTA Button (Black background) */}
            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="h-10 px-4.5 inline-flex items-center justify-center gap-2 rounded-xl bg-black border border-white/10 hover:bg-neutral-900 text-white text-xs font-bold transition-all shadow-md shadow-black/10 active:scale-98 cursor-pointer"
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
                className="w-9 h-9 rounded-xl bg-primary-600/30 border border-primary-500/30 flex items-center justify-center font-bold text-primary-200 text-xs shadow-inner cursor-pointer hover:border-primary-400/50 hover:bg-primary-600/40 transition-all"
              >
                {initials}
              </button>

              {isProfileDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-primary-900/95 border border-white/10 rounded-2xl shadow-xl p-2 z-50 backdrop-blur-lg animate-[fadeIn_0.15s_ease-out]">
                  <p className="px-3.5 py-2 text-xs font-semibold text-primary-300 border-b border-white/5 truncate">
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
                    className="w-full text-left block px-3.5 py-2.5 rounded-xl hover:bg-red-500/10 hover:text-red-400 text-xs font-medium text-primary-300 transition-colors cursor-pointer"
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
      <div className={`transition-all duration-300 ${!isFocusMode ? "lg:pl-64 lg:pt-16" : ""}`}>
        <Outlet context={{ isFocusMode, setIsFocusMode }} />
      </div>

      {/* 4. MOBILE BOTTOM NAVBAR */}
      {!isFocusMode && (
        <div className="lg:hidden">
          <BottomNavBar onOpenCreateModal={() => setIsCreateModalOpen(true)} />
        </div>
      )}

      {/* 5. GLOBAL CREATION SHEET/MODAL */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Overlay backdrop */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setIsCreateModalOpen(false)}
          />

          {/* Modal content */}
          <div className="relative w-full max-w-sm bg-primary-900/95 backdrop-blur-lg border border-white/10 rounded-3xl p-6 shadow-2xl animate-[fadeIn_0.15s_ease-out]">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-lg font-bold text-white tracking-tight">Criar Novo Item</h3>
              <button
                onClick={() => setIsCreateModalOpen(false)}
                className="w-8 h-8 flex items-center justify-center rounded-xl bg-white/5 text-primary-300 hover:bg-white/10 hover:text-white transition-colors cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Menu Options */}
            <div className="grid grid-cols-1 gap-2.5">
              <button
                onClick={() => handleSelectCreateOption("activity")}
                className="flex items-center gap-3.5 px-4.5 py-3.5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/10 text-white font-semibold text-sm transition-all duration-200 cursor-pointer shadow-sm text-left active:scale-[0.99]"
              >
                <span className="text-lg">📋</span>
                <div>
                  <p className="leading-tight">Nova Tarefa</p>
                  <p className="text-[11px] text-primary-300/70 font-medium leading-none mt-0.5">Adicionar na lista de atividades</p>
                </div>
              </button>

              <button
                onClick={() => handleSelectCreateOption("planner")}
                className="flex items-center gap-3.5 px-4.5 py-3.5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/10 text-white font-semibold text-sm transition-all duration-200 cursor-pointer shadow-sm text-left active:scale-[0.99]"
              >
                <span className="text-lg">📅</span>
                <div>
                  <p className="leading-tight">Novo Bloco de Estudo</p>
                  <p className="text-[11px] text-primary-300/70 font-medium leading-none mt-0.5">Planejar na grade da semana</p>
                </div>
              </button>

              <button
                onClick={() => handleSelectCreateOption("subject")}
                className="flex items-center gap-3.5 px-4.5 py-3.5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/10 text-white font-semibold text-sm transition-all duration-200 cursor-pointer shadow-sm text-left active:scale-[0.99]"
              >
                <span className="text-lg">📚</span>
                <div>
                  <p className="leading-tight">Nova Matéria</p>
                  <p className="text-[11px] text-primary-300/70 font-medium leading-none mt-0.5">Cadastrar disciplina e cor</p>
                </div>
              </button>

              <button
                onClick={() => handleSelectCreateOption("pomodoro")}
                className="flex items-center gap-3.5 px-4.5 py-3.5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/10 text-white font-semibold text-sm transition-all duration-200 cursor-pointer shadow-sm text-left active:scale-[0.99]"
              >
                <span className="text-lg">🍅</span>
                <div>
                  <p className="leading-tight">Iniciar Pomodoro</p>
                  <p className="text-[11px] text-primary-300/70 font-medium leading-none mt-0.5">Iniciar o timer de foco</p>
                </div>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
