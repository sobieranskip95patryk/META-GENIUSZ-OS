import "./globals.css";
import type { ReactNode } from "react";

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
      <body className="bg-black text-white">
        <header className="border-b border-white/10">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
            <div className="font-bold tracking-widest text-sm">
              META-GENIUSZ OS
            </div>

            <nav className="flex gap-6 text-sm text-white/70">
              <a href="/hhu" className="hover:text-white">
                Hip Hop Universe
              </a>

              <a href="/rfg" className="hover:text-white">
                Rocket Fuell Girls
              </a>

              <a href="/ai-studio" className="hover:text-white">
                AI Studio
              </a>

              <a href="/admin" className="hover:text-white">
                Admin
              </a>
            </nav>
          </div>
        </header>

        {children}

        <footer className="border-t border-white/10 mt-20">
          <div className="mx-auto max-w-7xl px-6 py-6 text-sm text-white/50">
            META-GENIUSZ OS • Creator Economy Platform
          </div>
        </footer>
      </body>
    </html>
  );
}