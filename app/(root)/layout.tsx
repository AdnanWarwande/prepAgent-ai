import Link from "next/link";
import Image from "next/image";
import { ReactNode } from "react";
import { redirect } from "next/navigation";

import { isAuthenticated } from "@/lib/actions/auth.action";
import LogoutButton from "@/components/LogoutButton";

const Layout = async ({ children }: { children: ReactNode }) => {
  const isUserAuthenticated = await isAuthenticated();
  if (!isUserAuthenticated) redirect("/sign-in");

  return (
    <div className="min-h-screen bg-bg-secondary">
      {/* Header/Navigation */}
      <header className="app-header">
        <div className="header-container">
          <Link href="/" className="logo-container">
            <Image src="/logo.png" alt="PrepAgent Logo" width={40} height={40} className="rounded-lg" />
            <span className="logo-text">PrepAgent</span>
          </Link>

          <LogoutButton />
        </div>
      </header>

      {/* Main Content */}
      <main className="main-layout">
        {children}
      </main>
    </div>
  );
};

export default Layout;
