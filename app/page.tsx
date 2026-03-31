"use client";

import React from "react";
import { useMailbox } from "@/context/MailboxContext";
import { LoginScreen } from "@/components/auth/LoginScreen";
import { WriterMode } from "@/components/modes/WriterMode";
import { ReplyMode } from "@/components/modes/ReplyMode";
import { PositiveNotes } from "@/components/features/PositiveNotes";
import { MemoryNotes } from "@/components/features/MemoryNotes";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";

export default function Home() {
  const { role, loading } = useMailbox();

  useEffect(() => {
    if (role) {
      window.scrollTo(0, 0);
    }
  }, [role]);

  if (!role) {
    return <LoginScreen />;
  }

  if (loading) {
     return (
       <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
         <div className="flex flex-col items-center gap-4">
           <div className="w-12 h-12 border-2 border-white/5 border-t-white/40 rounded-full animate-spin" />
           <div className="animate-pulse font-bebas text-white/40 tracking-[0.3em] uppercase text-sm">Syncing Heart...</div>
         </div>
       </div>
     );
  }

  return (
    <main className="min-h-screen bg-[var(--background)]">
      <AnimatePresence mode="wait">
        {role === "HER" ? (
          <motion.div
            key="her"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <WriterMode />
            <div className="max-w-4xl mx-auto px-6 md:px-12 pb-20 grid grid-cols-1 md:grid-cols-2 gap-12">
               <PositiveNotes />
               <MemoryNotes />
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="you"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <ReplyMode />
            <div className="max-w-4xl mx-auto px-6 md:px-12 pb-20 grid grid-cols-1 md:grid-cols-2 gap-12">
               <PositiveNotes />
               <MemoryNotes />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
