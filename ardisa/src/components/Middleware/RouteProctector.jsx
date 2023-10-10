"use client";
import { useEffect, useLayoutEffect } from "react";
import { redirect } from "next/navigation";
import { useAuthStore } from "@/Store/authStore";

// Higher order components for protecting routed
function RouteProctector({ children }) {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  useLayoutEffect(() => {
    if (!isAuthenticated) {
      redirect("/");
    }
  }, [isAuthenticated]);

  return children;
}

export default RouteProctector;
