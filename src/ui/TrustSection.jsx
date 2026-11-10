import {
  HiOutlineShieldCheck,
  HiOutlineSparkles,
  HiOutlineSupport,
  HiOutlineBadgeCheck,
} from "react-icons/hi";
import trust from "../assets/image/trust.JPG";
const trustFeatures = [
  {
    id: 1,
    icon: HiOutlineShieldCheck,
    title: "مالکیت اختصاصی",
    description: "همه اقامتگاه‌ها متعلق به مکانو هستند",
  },
  {
    id: 2,
    icon: HiOutlineSparkles,
    title: "کیفیت تضمینی",
    description: "همراه شما در تمام لحظات",
  },
  {
    id: 3,
    icon: HiOutlineBadgeCheck,
    title: "کیفیت تضمین‌شده",
    description: "بازرسی نظارت در تمام لحظات",
  },
  {
    id: 4,
    icon: HiOutlineSupport,
    title: "رزرو آسان و سریع",
    description: "در چند کلیک، آماده سفر باشید",
  },
];

function TrustSection() {
  return (
    <section className="w-full py-12 sm:py-16" dir="rtl">
      <div className=" container mx-auto px-4 sm:px-6 lg:px-8">
        {/* کانتینر بنر عریض با یک عکس تک و حرفه‌ای */}
        <div className="relative w-full rounded-3xl overflow-hidden shadow-2xl bg-base">
          {/* تصویر پس‌زمینه تک و عریض */}
          <div className="absolute inset-0">
            <img
              src={trust}
              alt="انتخاب شده، نه جمع‌آوری شده"
              className="w-full h-full object-cover"
            />
            {/* گرادیان تیره مدرن برای خوانایی کامل متن روی عکس */}
            <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/60 to-black/30"></div>
          </div>

          {/* محتوای روی عکس */}
          <div className="relative z-10 p-6 sm:p-10 lg:p-12 flex flex-col text-white">
            {/* بخش بالایی: تیتر و شعار */}
            <div className="max-w-2xl mb-8 sm:mb-10 text-right">
              <span className="bg-primary/20 text-amber-300 border border-amber-400/30 backdrop-blur-md font-PeydaMedium text-xs sm:text-sm px-3.5 py-1 rounded-full mb-3 inline-block">
                چرا مکانو؟
              </span>
              <h2 className="font-PeydaBlack text-2xl sm:text-3xl lg:text-4xl mb-3 text-white">
                انتخاب شده، نه جمع‌آوری‌شده.
              </h2>
              <p className="font-SansRegular text-gray-200 text-xs sm:text-sm leading-relaxed">
                ما در مکانو، تمام اقامتگاه‌های خود را با دقت انتخاب و مدیریت
                می‌کنیم تا خیالتان از کیفیت، امنیت و تجربه‌ی یک سفر بی‌نقص راحت
                باشد.
              </p>
            </div>

            {/* بخش پایینی: ۴ ویژگی کلیدی در یک گرید شیشه‌ای و تمیز */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 pt-6 border-t border-white/15 text-right">
              {trustFeatures.map((item) => {
                const IconComponent = item.icon;
                return (
                  <div
                    key={item.id}
                    className="flex flex-col items-start bg-white/10 backdrop-blur-md p-4 sm:p-5 rounded-2xl border border-white/10 transition-all duration-300 hover:bg-white/15"
                  >
                    <div className="text-amber-400 mb-2.5 text-2xl">
                      <IconComponent />
                    </div>
                    <h3 className="font-PeydaBold text-sm sm:text-[16px] mb-1 text-white">
                      {item.title}
                    </h3>
                    <p className="font-SansRegular text-gray-300 text-[11px] sm:text-xs leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default TrustSection;
