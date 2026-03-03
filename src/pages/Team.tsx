import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import ArcadeTeamSelect from "@/components/ArcadeTeamSelect";
import MeshBackground from "@/components/MeshBackground";

const Team = () => {
  return (
    <div className="relative h-screen bg-black text-white overflow-hidden flex flex-col">
      {/* Background */}
      <div className="fixed inset-0 z-0">
        <MeshBackground />
      </div>

      {/* Header / Nav */}
      <nav className="relative z-20 flex items-center justify-between p-4 md:p-6 bg-gradient-to-b from-black/80 to-transparent">
        <Link
          to="/"
          className="flex items-center gap-2 font-mono text-[10px] md:text-xs uppercase tracking-[0.2em] md:tracking-[0.3em] text-cyan-400 hover:text-cyan-300 transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          BACK_TO_HQ
        </Link>

        <div className="flex items-center gap-2 md:gap-3">
          <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-cyan-400 animate-pulse" />
          <span className="font-mono text-[10px] md:text-xs uppercase tracking-[0.2em] md:tracking-[0.3em] text-gray-500">
            LOC: SECTOR_TEAM_ALPHA
          </span>
        </div>
      </nav>

      {/* Main Content */}
      <main className="relative z-10 flex-1 overflow-auto">
        <ArcadeTeamSelect />
      </main>

      {/* Decorative footer */}
      <footer className="relative z-10 p-8 flex justify-center">
        <div className="font-mono text-[10px] text-gray-700 tracking-[0.5em] uppercase">
          Apex Techno Warriors // Team Apex v3.0.26
        </div>
      </footer>
    </div>
  );
};

export default Team;
