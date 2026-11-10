import { useState } from "react";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";

function StayGallery({ images = [], title, onOpenModal }) {
  const formattedImage = Array.isArray(images)
    ? images.map((img) => (typeof img === "string" ? img : img.image_url))
    : [];

  // اگر عکسی موجود نبود، یک تصویر پیش‌فرض در نظر می‌گیریم
  const mainImage = formattedImage[0] || "/images/placeholder-villa.jpg";
  const gridImages = formattedImage.slice(1, 5); // حداکثر ۴ تصویر برای گرید کوچک

  const [currentMobileIndex, setCurrentMobileIndex] = useState(0);

  const nextMobileImage = () => {
    setCurrentMobileIndex((prev) =>
      prev === images?.length - 1 ? 0 : prev + 1,
    );
  };
  const prevMobileImage = () => {
    setCurrentMobileIndex((prev) =>
      prev === 0 ? images?.length - 1 : prev - 1,
    );
  };

  return (
    <div className="w-full mx-auto pb-6 mt-3 lg:mt-30">
      {/* --- نمای دسکتاپ و تبلت (گرید مدرن ۵ تایی) --- */}
      <div className="hidden md:grid grid-cols-4 gap-3 h-[400px] lg:h-[480px] rounded-3xl relative group">
        {/* تصویر بزرگ سمت راست */}
        <div
          className="col-span-2 h-full overflow-hidden cursor-pointer relative rounded-r-3xl"
          onClick={onOpenModal}
        >
          <img
            src={mainImage}
            alt={title}
            className="w-full max-h-150 object-cover transition-transform duration-700 group-hover:scale-105"
            onError={(e) => {
              e.currentTarget.src = "/images/placeholder-villa.jpg";
            }}
          />
          <div className="absolute inset-0 bg-black/10 hover:bg-transparent transition-colors"></div>
        </div>

        {/* تصاویر کوچک سمت چپ (۲ ستون و ۲ ردیف با ارتفاع مساوی) */}
        <div className="col-span-2 grid grid-cols-2 grid-rows-2 gap-3 h-full">
          {gridImages.map((img, index) => {
            // تعیین کلاس گوشه‌های گرد بر اساس موقعیت در گرید ۲ در ۲
            let roundedClass = "";
            if (index === 1) roundedClass = "rounded-tl-3xl"; // بالای راست
            if (index === 3) roundedClass = "rounded-bl-3xl"; // پایین راست

            return (
              <div
                key={index}
                className={`h-full w-full overflow-hidden cursor-pointer relative group/item ${roundedClass}`}
                onClick={onOpenModal}
              >
                <img
                  src={img}
                  alt={`${title} - ${index + 1}`}
                  className="w-full h-full object-cover max-h-70  transition-transform duration-500 group-hover/item:scale-105"
                  onError={(e) => {
                    e.currentTarget.src = "/images/placeholder-villa.jpg";
                  }}
                />
                <div className="absolute inset-0 bg-black/10 group-hover/item:bg-transparent transition-colors"></div>

                {/* دکمه "مشاهده همه" روی آخرین عکس */}
                {index === 3 && images.length > 5 && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onOpenModal();
                    }}
                    className={`absolute inset-0 bg-black/50 backdrop-blur-[2px] flex flex-col items-center justify-center gap-y-1 text-white font-semibold text-sm hover:bg-black/60 transition-all ${roundedClass}`}
                  >
                    <span>مشاهده همه ({images.length} عکس)</span>
                  </button>
                )}
              </div>
            );
          })}

          {/* پر کردن جاهای خالی گرید اگر تعداد عکس‌ها کمتر از ۵ بود */}
          {gridImages.length < 4 &&
            Array.from({ length: 4 - gridImages.length }).map((_, i) => (
              <div
                key={`empty-${i}`}
                className="bg-gray-100 rounded-lg h-full w-full"
              />
            ))}
        </div>
      </div>

      {/* --- نمای موبایل (اسلایدر لمسی) --- */}
      <div className="relative md:hidden w-full h-[280px] sm:h-[350px] rounded-2xl overflow-hidden ">
        <img
          src={images[currentMobileIndex]?.image_url || mainImage}
          alt={title}
          className="w-full h-full object-cover transition-all duration-300"
          onError={(e) => {
            e.currentTarget.src = "/images/placeholder-villa.jpg";
          }}
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none"></div>

        {images.length > 1 && (
          <>
            <button
              onClick={prevMobileImage}
              className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/50 backdrop-blur-md text-white p-2 rounded-full shadow-md z-10 hover:bg-black/70 transition-colors"
            >
              <HiChevronLeft className="text-lg" />
            </button>
            <button
              onClick={nextMobileImage}
              className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/50 backdrop-blur-md text-white p-2 rounded-full shadow-md z-10 hover:bg-black/70 transition-colors"
            >
              <HiChevronRight className="text-lg" />
            </button>
          </>
        )}

        <div
          onClick={onOpenModal}
          className="absolute bottom-4 left-4 cursor-pointer bg-black/60 backdrop-blur-md border border-white/20 text-white text-xs font-medium px-3 py-1.5 rounded-xl flex items-center gap-x-1.5 shadow-lg z-10"
        >
          {/* <HiOutlinePhotograph className="text-sm" /> */}
          <span>
            {currentMobileIndex + 1} / {images.length || 1}
          </span>
        </div>
      </div>
    </div>
  );
}

export default StayGallery;
