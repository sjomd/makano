import { useState, useEffect } from "react";
import Logo from "./Logo";
import { HiOutlinePhone } from "react-icons/hi";
import { Link, useLocation, useNavigate } from "react-router";
import DarkModeToggle from "./DarkModeToggle";
import CompositeSearchBar from "./CompositeSearchBar";
import useAuth from "@/hooks/auth/useAuth";
import HeaderLoginBtn from "./HeaderLoginBtn";
import HeaderUserBadge from "./HeaderUserBadge";

function Header({ isInPannel }) {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState();
  const navigate = useNavigate();
  const isHome = location.pathname === "/home";
  const { user, isLoading } = useAuth();
  useEffect(() => {
    if (!isHome) {
      return;
    }
    const handleScroll = () => {
      if (window.scrollY > 700 && isHome) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHome]);

  return (
    <header
      className={`lg:fixed top-0 z-50 w-full bg-base border-b border-border transition-all duration-300`}
    >
      <div className="flex items-center justify-between w-full container min-[450px]:px-8 py-3">
        <div className="flex items-center gap-x-3 shrink-0">
          <Link
            to="/"
            aria-label="صفحه اصلی مکانو"
            className="flex items-center gap-x-2 focus:outline-none focus-visible:ring-2 ring-primary rounded-lg"
          >
            <Logo size="w-8 h-8 sm:w-10 sm:h-10 lg:w-11 lg:h-11" />
            <div className="flex flex-col justify-center">
              <span className="font-PeydaBlack text-main text-lg sm:text-xl lg:text-2xl mt-0.5">
                مکانو
              </span>
              <span className="lg:hidden text-[9px] min-[380px]:text-[10px] text-muted font-SansRegular whitespace-nowrap overflow-hidden text-ellipsis max-w-42.5 sm:max-w-full">
                اجاره انواع اقامتگاه در شهرهای مرکزی ایران
              </span>
            </div>
          </Link>
        </div>
        <div className="hidden lg:flex w-full">
          {!isInPannel && (
            <CompositeSearchBar
              variant="header"
              className={`
              ${
                isHome
                  ? isScrolled
                    ? "opacity-100 scale-100 pointer-events-auto"
                    : "opacity-0 scale-95 pointer-events-none"
                  : "opacity-100 scale-100 pointer-events-auto"
              }
            `}
            />
          )}
        </div>

        <div className="flex items-center gap-x-4 shrink-0">
          <a
            href="tel:0216550000"
            aria-label="تماس با پشتیبانی"
            dir="ltr"
            className="hidden lg:flex items-center gap-x-2 text-main font-SansMedium text-sm hover:text-primary transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 rounded-lg px-2 py-1"
          >
            <HiOutlinePhone className="text-xl" />
            <span className="mt-0.5 tracking-wider">021 - 655 0000</span>
          </a>
          <DarkModeToggle />
          <div className="hidden lg:block w-px h-5 bg-border" />

          <div>
            {!user && <HeaderLoginBtn onClick={() => navigate("/login")} />}
            {!isLoading && user && <HeaderUserBadge />}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
