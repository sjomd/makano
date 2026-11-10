import { Outlet, useNavigate } from "react-router";
import { PROFILE_NAV_ITEMS } from "@/ui/profile/profilenavConfig";
import AppSidebar from "@/ui/AppSidebar";
import PanelContentShell from "@/ui/PanelContentShell";
import ProfileMobileHeader from "@/ui/ProfileMobileHeader";
import SidebarPromoCard from "@/ui/profile/SidebarPromoCard";
import { logout } from "@/services/authApi";
import useUserProfile from "@/authentication/useUserProfile";

export default function ProfileLayout({ user }) {
  const { profile, isLoading } = useUserProfile(user?.id);
  const navigate = useNavigate();
  function handleLogout() {
    logout?.();
  }
  if (!user) navigate("/");
  return (
    <div className="min-h-screen lg:mt-20 bg-base text-main" dir="rtl">
      {/* هدر مخصوص موبایل و تبلت (تا 1024px) */}
      <ProfileMobileHeader
        user={profile}
        onLogout={handleLogout}
        navItems={PROFILE_NAV_ITEMS}
      />

      {/* گرید دسکتاپ: سایدبار ریوزبل + قاب دورگرد محتوا */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-5 lg:py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <AppSidebar
            user={profile}
            navItems={PROFILE_NAV_ITEMS}
            footerSlot={<SidebarPromoCard />}
            onLogout={handleLogout}
          />

          <PanelContentShell>
            <Outlet />
          </PanelContentShell>
        </div>
      </div>
    </div>
  );
}
