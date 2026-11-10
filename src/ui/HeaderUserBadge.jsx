import { useState } from "react";
import { HiChevronDown } from "react-icons/hi";
import UserDropdownMenu from "./UserDropdownMenu";
import useAuth from "@/hooks/auth/useAuth";
import useUserProfile from "@/authentication/useUserProfile";
import NeonSpinner from "./NeonSpinner";

export default function HeaderUserBadge() {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuth();
  const { profile, isLoading } = useUserProfile(user?.id);
  if (isLoading) return <NeonSpinner />;

  return (
    <div className="relative" dir="rtl">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className={`flex items-center gap-x-2.5 bg-card hover:bg-base border ${
          isOpen
            ? "border-primary ring-2 ring-primary/20"
            : "border-border hover:border-primary/40"
        } pl-3 pr-1.5 py-1.5 rounded-2xl transition-all cursor-pointer`}
      >
        {/* آواتار و بج آنلاین */}
        <div className="relative">
          <div className="w-8 h-8 rounded-xl bg-primary/15 border border-primary/30 text-primary font-PeydaBold text-xs flex items-center justify-center overflow-hidden">
            {profile ? (
              <img
                src={profile.avatar_url}
                alt={profile.full_name}
                className="w-full h-full object-cover"
              />
            ) : (
              profile.full_name.charAt(0)
            )}
          </div>
          <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-400 ring-2 ring-card" />
        </div>

        <span className="text-xs font-PeydaBold text-main max-w-27.5 truncate">
          {profile.full_name}
        </span>

        <HiChevronDown
          className={`text-muted text-sm transition-transform duration-200 ${
            isOpen ? "rotate-180 text-primary" : ""
          }`}
        />
      </button>

      {isOpen && (
        <UserDropdownMenu
          phone={profile.phone}
          role={profile.role}
          onClose={() => setIsOpen(false)}
        />
      )}
    </div>
  );
}
