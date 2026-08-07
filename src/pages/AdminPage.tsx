import React, { useState } from "react";
import { AdminLoginView } from "../features/admin/AdminLoginView";
import { AdminDashboardView } from "../features/admin/AdminDashboardView";

export const AdminPage: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <div>
      {isAuthenticated ? (
        <AdminDashboardView onLogout={() => setIsAuthenticated(false)} />
      ) : (
        <AdminLoginView onLoginSuccess={() => setIsAuthenticated(true)} />
      )}
    </div>
  );
};
