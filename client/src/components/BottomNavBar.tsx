import { Link, useLocation } from "react-router-dom";

interface BottomNavBarProps {
  onOpenCreateModal: () => void;
}

export default function BottomNavBar({ onOpenCreateModal }: BottomNavBarProps) {
  const location = useLocation();

  const leftItems = [
    {
      to: "/dashboard",
      label: "Início",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
          <path d="M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z" />
          <path d="M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H5.625a1.875 1.875 0 01-1.875-1.875v-6.198a2.29 2.29 0 00.091-.086L12 5.432z" />
        </svg>
      ),
    },
    {
      to: "/activities",
      label: "Tarefas",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
          <path fillRule="evenodd" d="M7.502 6h7.128A3.375 3.375 0 0118 9.375v9.375a3 3 0 003-3V6.108c0-1.505-1.125-2.811-2.664-2.94a48.972 48.972 0 00-8.583-.063c-1.476.106-2.633 1.27-2.74 2.715a31.568 31.568 0 00-.011.182zM3.75 21h7.5a3.75 3.75 0 003.75-3.75v-8.5A3.75 3.75 0 0011.25 5h-7.5A3.75 3.75 0 000 8.75v8.5A3.75 3.75 0 003.75 21zm1.5-12.5a.75.75 0 000 1.5h4.5a.75.75 0 000-1.5h-4.5zm0 3a.75.75 0 000 1.5h4.5a.75.75 0 000-1.5h-4.5zm0 3a.75.75 0 000 1.5h4.5a.75.75 0 000-1.5h-4.5z" clipRule="evenodd" />
        </svg>
      ),
    },
  ];

  const rightItems = [
    {
      to: "/planner",
      label: "Semana",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
          <path fillRule="evenodd" d="M6.75 2.25A.75.75 0 017.5 3v1.5h9V3A.75.75 0 0118 3v1.5h.75a3 3 0 013 3v11.25a3 3 0 01-3 3H5.25a3 3 0 01-3-3V7.5a3 3 0 013-3H6V3a.75.75 0 01.75-.75zm13.5 9a1.5 1.5 0 00-1.5-1.5H5.25a1.5 1.5 0 00-1.5 1.5v7.5a1.5 1.5 0 001.5 1.5h13.5a1.5 1.5 0 001.5-1.5v-7.5z" clipRule="evenodd" />
        </svg>
      ),
    },
    {
      to: "/subjects",
      label: "Matérias",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
          <path d="M11.25 4.533A9.707 9.707 0 006 3a9.735 9.735 0 00-3.25.555.75.75 0 00-.5.707v14.25a.75.75 0 001 .707A8.237 8.237 0 016 18.75c1.995 0 3.823.708 5.25 1.898V4.533zM12.75 20.648A8.237 8.237 0 0118 18.75c1.995 0 3.823.708 5.25 1.898a.75.75 0 001-.707V5.612a.75.75 0 00-.5-.707A9.735 9.735 0 0018 3a9.707 9.707 0 00-5.25 1.533v16.115z" />
        </svg>
      ),
    },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-indigo-950/95 border-t border-indigo-900/20 backdrop-blur-lg shadow-lg shadow-black/30">
      <div className="max-w-md mx-auto flex items-center justify-around h-16 px-4">
        
        {/* Left navigation items */}
        {leftItems.map((item) => {
          const isActive = location.pathname === item.to;
          return (
            <Link
              key={item.to}
              to={item.to}
              className={`flex flex-col items-center gap-0.5 px-2.5 py-1.5 rounded-xl transition-all duration-200 min-w-[56px] ${
                isActive ? "text-white scale-105 font-bold" : "text-indigo-300/60 hover:text-indigo-200"
              }`}
            >
              <span className={isActive ? "scale-105 transition-transform" : "transition-transform"}>
                {item.icon}
              </span>
              <span className={`text-[9px] font-bold uppercase tracking-wider ${isActive ? "text-white" : ""}`}>
                {item.label}
              </span>
            </Link>
          );
        })}

        {/* Highlighted Central "+" Button */}
        <button
          onClick={onOpenCreateModal}
          className="relative -top-3 w-12 h-12 flex items-center justify-center rounded-full bg-black hover:bg-neutral-900 border border-white/15 text-white shadow-lg shadow-black/40 ring-4 ring-indigo-950 transition-all active:scale-95 cursor-pointer shrink-0 z-50 hover:scale-105"
          title="Criar Item"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
        </button>

        {/* Right navigation items */}
        {rightItems.map((item) => {
          const isActive = location.pathname === item.to;
          return (
            <Link
              key={item.to}
              to={item.to}
              className={`flex flex-col items-center gap-0.5 px-2.5 py-1.5 rounded-xl transition-all duration-200 min-w-[56px] ${
                isActive ? "text-white scale-105 font-bold" : "text-indigo-300/60 hover:text-indigo-200"
              }`}
            >
              <span className={isActive ? "scale-105 transition-transform" : "transition-transform"}>
                {item.icon}
              </span>
              <span className={`text-[9px] font-bold uppercase tracking-wider ${isActive ? "text-white" : ""}`}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
      {/* Safe area support for notch screens */}
      <div className="h-[env(safe-area-inset-bottom)]" />
    </nav>
  );
}
