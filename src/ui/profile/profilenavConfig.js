import {
  HiOutlineUser,
  HiOutlineBriefcase,
  HiOutlineHeart,
  HiOutlineCreditCard,
  HiOutlineChatAlt2,
} from "react-icons/hi";

export const PROFILE_NAV_ITEMS = [
  {
    id: "account",
    label: "اطلاعات حساب",
    path: "/profile/account",
    icon: HiOutlineUser,
  },
  {
    id: "trips",
    label: "سفرهای من",
    path: "/profile/trips",
    icon: HiOutlineBriefcase,
    badge: "۳",
  },
  {
    id: "favorites",
    label: "علاقه‌مندی‌ها",
    path: "/profile/favorites",
    icon: HiOutlineHeart,
  },
  {
    id: "transactions",
    label: "تراکنش‌ها",
    path: "/profile/transactions",
    icon: HiOutlineCreditCard,
  },
  {
    id: "tickets",
    label: "تیکت‌های پشتیبانی",
    path: "/profile/tickets",
    icon: HiOutlineChatAlt2,
  },
];
