import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import AppLayout from "./ui/AppLayout";
import Home from "./app/pages/Home";
import Favorites from "./app/pages/Favorites";

import Tickets from "./app/pages/Tickets";
import Profile from "./app/pages/Profile";
import { DarkModeProvider } from "./context/DarkModecontext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Stays from "./app/pages/Stays";
import Stay from "./app/pages/Stay";

import ProfileLayout from "./app/pages/ProfileLayout";
import MyTripsPage from "./ui/booking/MyTripsPage";
import useAuth from "./hooks/auth/useAuth";
import NeonSpinner from "./ui/NeonSpinner";
import MyFavoritesPage from "./ui/favorite/MyFavoritesPage";
import MyAccountPage from "./ui/account/MyAccountpage";
import AuthPage from "./authentication/AuthPage";
import ProtectedRoute from "./authentication/ProtectedRoute";
import ResetPassword from "./authentication/forget-password/ResetPassword";
import { Toaster } from "react-hot-toast";
import { queryClient } from "./services/queryClient";

function App() {
  const { user, isLoading } = useAuth();
  if (isLoading) return <NeonSpinner />;
  return (
    <DarkModeProvider>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <BrowserRouter>
          <Routes>
            <Route element={<AppLayout />}>
              <Route index element={<Navigate replace to="home" />} />
              <Route path="home" element={<Home />} />
              <Route path="stays" element={<Stays />} />
              <Route path="/stays/:id" element={<Stay />} />
              <Route path="favorites" element={<Favorites />} />
              <Route path="tickets" element={<Tickets />} />
              <Route path="profile" element={<Profile />} />
              <Route element={<ProtectedRoute />}>
                <Route path="/profile" element={<ProfileLayout user={user} />}>
                  <Route index element={<Navigate to="trips" replace />} />
                  <Route
                    path="account"
                    element={<MyAccountPage user={user} />}
                  />
                  <Route path="trips" element={<MyTripsPage user={user} />} />
                  <Route path="favorites" element={<MyFavoritesPage />} />

                  <Route path="transactions" element={<p>تراکنش ها</p>} />
                  <Route path="tickets" element={<p>تیکت ها</p>} />
                </Route>
              </Route>
            </Route>
            <Route path="reset-password" element={<ResetPassword />} />
            <Route path="login" element={<AuthPage />} />
          </Routes>
          <Toaster
            position="top-center"
            containerStyle={{ margin: "8px" }}
            toastOptions={{
              success: {
                duration: 3000,
              },
              error: { duration: 5000 },
              style: {
                fontSize: "16px",
                maxWidth: "500px",
                padding: "16px 24px",
                backgroundColor: "var(--color-grey-0)",
                color: "var(--color-grey-700)",
              },
            }}
          />
        </BrowserRouter>
      </QueryClientProvider>
    </DarkModeProvider>
  );
}

export default App;
