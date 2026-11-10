import { HiOutlineLogin } from "react-icons/hi";

export default function HeaderLoginBtn({ onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group inline-flex items-center gap-x-2 bg-primary hover:bg-primary-hover text-white text-xs font-PeydaBold px-4 py-2.5 rounded-2xl shadow-lg shadow-primary/25 hover:shadow-primary/40 active:scale-95 transition-all cursor-pointer"
    >
      <HiOutlineLogin className="text-base transition-transform group-hover:-translate-x-0.5" />
      <span>ورود</span>
      <span className="w-px h-3.5 bg-white/30" />
      <span>ثبت‌نام</span>
    </button>
  );
}
