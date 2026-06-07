"use client";

import { UserProvider } from "@/lib/userContext";
import AuthModal from "@/components/AuthModal";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <UserProvider>
      {children}
      <AuthModal />
    </UserProvider>
  );
}
