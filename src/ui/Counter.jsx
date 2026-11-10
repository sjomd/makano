import { LuPlus } from "react-icons/lu";
import { TiMinus } from "react-icons/ti";

export default function Counter({ value = 0, onChange, max = 20, title }) {
  return (
    <div className="flex items-center justify-between w-full py-3">
      {/* بخش متنی (راست) */}
      <div className="flex flex-col items-start gap-y-1.5">
        <span className="text-[16px] font-semibold text-main">
          تعداد {title}
        </span>
        <span className="text-sm font-medium text-gray-500">
          {value > 0 ? `${value} ${title}` : "مهم نیست"}
        </span>
      </div>

      {/* بخش کنترلر اعداد (چپ) */}
      <div className="flex items-center gap-x-4">
        {/* دکمه افزایش */}
        <button
          type="button"
          disabled={value >= max}
          onClick={() => onChange(value + 1)}
          className="flex items-center justify-center text-xl text-white bg-gray-900 hover:bg-gray-800 rounded-lg p-1.5 transition-all active:scale-95 shadow-sm disabled:opacity-40 disabled:cursor-not-allowed disabled:active:scale-100 cursor-pointer"
        >
          <LuPlus />
        </button>

        {/* عدد */}
        {/* استفاده از tabular-nums باعث میشه عرض اعداد ثابت بمونه و پرش نداشته باشه */}
        <span className="w-6 text-main text-center text-lg font-bold tabular-nums ">
          {value}
        </span>

        {/* دکمه کاهش */}
        <button
          type="button"
          disabled={value === 0}
          onClick={() => onChange(value - 1)}
          className={`flex items-center justify-center text-xl p-1.5 rounded-lg transition-all disabled:active:scale-100 ${
            value > 0
              ? "border border-gray-200 text-gray-800 hover:bg-gray-50 active:scale-95"
              : "text-gray-300 opacity-50 cursor-not-allowed"
          } cursor-pointer`}
        >
          <TiMinus />
        </button>
      </div>
    </div>
  );
}
