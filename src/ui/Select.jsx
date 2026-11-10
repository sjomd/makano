import { useState, useRef, useEffect } from "react";
import { HiOutlineSortDescending } from "react-icons/hi";

function Select({ options, value, changeHandler }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleOptionClick = (optionValue) => {
    changeHandler({ target: { value: optionValue } });
    setIsOpen(false);
  };
  const selectedOption = options.find((option) => option.value === value);

  return (
    <div className="relative inline-block text-right z-10 " ref={dropdownRef}>
      {/* دکمه اصلی (تریگر) - دقیقاً مثل دکمه "ترتیب" تو عکس */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-x-1.5 px-3 py-2 rounded-xl transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 cursor-pointer ${
          isOpen ? "bg-hover" : "bg-transparent hover:bg-hover"
        }`}
      >
        <HiOutlineSortDescending className="text-xl text-main shrink-0" />
        <span className="text-sm font-SansMedium text-main mt-0.5">
          {selectedOption ? selectedOption.label : "ترتیب"}
        </span>
      </button>
      <div
        className={`absolute max-[1650px]:left-3 mt-2 w-48 bg-card border border-border/40 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] overflow-hidden transition-all duration-200 origin-top-right ${
          isOpen
            ? "opacity-100 scale-100 pointer-events-auto"
            : "opacity-0 scale-95 pointer-events-none"
        }`}
      >
        <ul className="py-1.5 flex flex-col">
          {options.map((option) => {
            const isActive = value === option.value;

            return (
              <li key={option.value}>
                <button
                  type="button"
                  onClick={() => handleOptionClick(option.value)}
                  className={`w-full text-right px-4 py-2.5 text-sm transition-colors duration-150 flex items-center justify-between cursor-pointer ${
                    isActive
                      ? "bg-primary/5 text-primary font-PeydaBlack"
                      : "text-main hover:bg-hover font-SansMedium"
                  }`}
                >
                  {option.label}

                  {/* نقطه کوچک کنار آیتم فعال (برای زیبایی بیشتر) */}
                  {isActive && (
                    <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default Select;
