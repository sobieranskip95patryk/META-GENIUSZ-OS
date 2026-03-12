import "./globals.css";
import type { ReactNode } from "react";
import Navigation from "../components/navigation";
import { ToastProvider } from "../components/toast";

export const metadata = {
  title: "META-GENIUSZ OS",
  description: "AI Powered Creator Operating System",
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="pl">
      <body className="bg-[#050505] text-white antialiased">
        <ToastProvider>
          <Navigation />

          <div className="animate-fade-in">{children}</div>

          <footer className="border-t border-white/10 mt-20">
            <div className="mx-auto max-w-7xl px-6 py-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-2 text-sm text-white/50">
                <span className="inline-flex h-5 w-5 items-center justify-center rounded bg-gradient-to-br from-pink-500 to-cyan-400 text-[8px] font-black text-white">
                  MG
                </span>
                META-GENIUSZ OS • Creator Economy Platform
              </div>
              <div className="flex gap-6 text-xs text-white/40">
                <span>© 2026 META-GENIUSZ</span>
                <span>v0.1.0 MVP</span>
              </div>
            </div>
          </footer>
        </ToastProvider>
      </body>
    </html>
  );
}