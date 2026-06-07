"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface User {
  id: string;
  name: string;
  email: string;
  favorites: string[];
}

interface StoredUser extends User {
  password: string;
}

interface UserContextType {
  user: User | null;
  authModalOpen: boolean;
  authModalTab: "signin" | "register" | "favorites";
  openAuth: (tab?: "signin" | "register" | "favorites") => void;
  closeAuth: () => void;
  login: (email: string, password: string) => string | null;
  register: (name: string, email: string, password: string) => string | null;
  logout: () => void;
  toggleFavorite: (listingId: string) => void;
  isFavorite: (listingId: string) => boolean;
}

const UserContext = createContext<UserContextType | null>(null);

function getStoredUsers(): StoredUser[] {
  try {
    return JSON.parse(localStorage.getItem("slreg_users") || "[]");
  } catch {
    return [];
  }
}

function saveStoredUsers(users: StoredUser[]) {
  localStorage.setItem("slreg_users", JSON.stringify(users));
}

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authModalTab, setAuthModalTab] = useState<"signin" | "register" | "favorites">("signin");

  useEffect(() => {
    try {
      const stored = localStorage.getItem("slreg_current_user");
      if (stored) setUser(JSON.parse(stored));
    } catch {}
  }, []);

  function openAuth(tab: "signin" | "register" | "favorites" = "signin") {
    setAuthModalTab(tab);
    setAuthModalOpen(true);
  }

  function closeAuth() {
    setAuthModalOpen(false);
  }

  function register(name: string, email: string, password: string): string | null {
    const users = getStoredUsers();
    if (users.find(u => u.email.toLowerCase() === email.toLowerCase())) {
      return "An account with this email already exists.";
    }
    const newUser: StoredUser = {
      id: Date.now().toString(),
      name: name.trim(),
      email: email.toLowerCase().trim(),
      password,
      favorites: [],
    };
    saveStoredUsers([...users, newUser]);
    const { password: _, ...userWithoutPw } = newUser;
    setUser(userWithoutPw);
    localStorage.setItem("slreg_current_user", JSON.stringify(userWithoutPw));
    setAuthModalOpen(false);
    return null;
  }

  function login(email: string, password: string): string | null {
    const users = getStoredUsers();
    const found = users.find(
      u => u.email.toLowerCase() === email.toLowerCase().trim() && u.password === password
    );
    if (!found) return "Invalid email or password.";
    const { password: _, ...userWithoutPw } = found;
    setUser(userWithoutPw);
    localStorage.setItem("slreg_current_user", JSON.stringify(userWithoutPw));
    setAuthModalOpen(false);
    return null;
  }

  function logout() {
    setUser(null);
    localStorage.removeItem("slreg_current_user");
  }

  function toggleFavorite(listingId: string) {
    if (!user) {
      openAuth("signin");
      return;
    }
    const users = getStoredUsers();
    const idx = users.findIndex(u => u.id === user.id);
    if (idx === -1) return;
    const isFav = users[idx].favorites.includes(listingId);
    users[idx].favorites = isFav
      ? users[idx].favorites.filter(id => id !== listingId)
      : [...users[idx].favorites, listingId];
    saveStoredUsers(users);
    const updated = { ...user, favorites: users[idx].favorites };
    setUser(updated);
    localStorage.setItem("slreg_current_user", JSON.stringify(updated));
  }

  function isFavorite(listingId: string): boolean {
    return user?.favorites.includes(listingId) ?? false;
  }

  return (
    <UserContext.Provider
      value={{ user, authModalOpen, authModalTab, openAuth, closeAuth, login, register, logout, toggleFavorite, isFavorite }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error("useUser must be used inside UserProvider");
  return ctx;
}
