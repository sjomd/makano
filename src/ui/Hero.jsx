import { HiOutlinePlay } from "react-icons/hi2";
import heroBG from "../assets/image/hero.png";

import CompositeSearchBar from "./CompositeSearchBar";
function Hero() {
  return (
    <section className="relative w-full mb-10 lg:mb-28">
      <div className="relative w-full h-87.5 sm:h-112.5 lg:h-130 2xl:h-175 lg:rounded-b-[40px] overflow-hidden">
        <div className="absolute inset-0 bg-muted">
          <img
            src={heroBG}
            alt="نمای اقامتگاه لوکس مکانو"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="absolute inset-0 bg-linear-to-r from-black/80 via-black/40 to-transparent"></div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 min-[450px]:px-8 h-full flex flex-col justify-center items-start text-white">
          <h2 className="font-PeydaBlack text-3xl sm:text-4xl lg:text-5xl leading-tight mb-4">
            جایی برای ماندن،
            <br />
            چیزی برای به خاطر سپردن.
          </h2>
          <p className="font-SansRegular text-sm sm:text-base opacity-90 max-w-md mb-8">
            با انتخاب اقامتگاه‌های خاص مکانو، سفری متفاوت را تجربه کنید.
          </p>

          <button className="flex items-center gap-x-2 border border-white/50 hover:bg-white/20 backdrop-blur-sm px-5 py-2.5 rounded-full transition-all duration-300">
            <HiOutlinePlay className="text-xl" />
            <span className="font-SansMedium text-sm mt-0.5">مشاهده ویدیو</span>
          </button>
        </div>
      </div>
      <div className="hidden lg:block absolute -bottom-8 left-1/2 transform -translate-x-1/2 w-full max-w-5xl z-20 px-4">
        <CompositeSearchBar variant="hero" />
      </div>
    </section>
  );
}

export default Hero;
