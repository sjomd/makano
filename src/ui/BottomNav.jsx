import { HiHeart, HiHome, HiOutlineHeart, HiOutlineHome } from "react-icons/hi";
import { RiSuitcase2Fill, RiSuitcase2Line } from "react-icons/ri";
import {
  IoChatboxEllipsesOutline,
  IoChatboxEllipsesSharp,
} from "react-icons/io5";
import { FaRegUser, FaUser } from "react-icons/fa";
import { useLocation } from "react-router"; // اضافه شده برای ریکت خام
import BottomNavItem from "./BottomNavItem";

function BottomNav() {
  const role = "guest";

  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <nav
      aria-label="منوی دسترسی سریع موبایل"
      className="block lg:hidden fixed bottom-0 left-0 right-0 z-30 bg-card border-t border-border shadow-[0_-4px_20px_rgba(0,0,0,0.03)] pb-safe"
    >
      <ul className="flex items-center justify-around w-full max-w-md mx-auto px-2 pt-2 pb-3 sm:pb-4">
        {role === "guest" ? (
          <>
            <BottomNavItem
              to="/"
              icon={<HiOutlineHome />}
              activeIcon={<HiHome />}
              text="خانه"
              isActive={currentPath === "/home"}
            />
            <BottomNavItem
              to="/favorites"
              icon={<HiOutlineHeart />}
              activeIcon={<HiHeart />}
              text="علاقه‌ها"
              isActive={currentPath === "/favorites"}
            />
            <BottomNavItem
              to="/trips"
              icon={<RiSuitcase2Line />}
              activeIcon={<RiSuitcase2Fill />}
              text="سفرهای من"
              isActive={currentPath === "/trips"}
            />
            <BottomNavItem
              to="/tickets"
              icon={<IoChatboxEllipsesOutline />}
              activeIcon={<IoChatboxEllipsesSharp />}
              text="تیکت‌ها"
              isActive={currentPath === "/tickets"}
            />
            <BottomNavItem
              to="/profile"
              icon={<FaRegUser />}
              activeIcon={<FaUser />}
              text="حساب کاربری"
              isActive={currentPath === "/profile"}
            />
          </>
        ) : (
          <li className="w-full text-center text-main font-SansMedium py-4">
            <p>پنل ادمین</p>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default BottomNav;
