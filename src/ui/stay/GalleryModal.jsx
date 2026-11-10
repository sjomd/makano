import { useEffect, useState } from "react";
import { HiX, HiChevronRight, HiChevronLeft } from "react-icons/hi";

function GalleryModal({
  images = [],
  isOpen,
  onClose,
  initialIndex = 0,
  title,
}) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  console.log(images);
  const allimages = images.map((img) => img.image_url);
  // هر بار که مودال باز می‌شود، ایندکس را روی عکس کلیک‌شده تنظیم کن
  useEffect(() => {
    setCurrentIndex(initialIndex);
  }, [initialIndex]);

  // بستن مودال با دکمه Esc و جابجایی با فلش‌های کیبورد
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") nextImage();
      if (e.key === "ArrowLeft") prevImage();
    };

    window.addEventListener("keydown", handleKeyDown);
    // جلوگیری از اسکرول صفحه اصلی وقتی مودال باز است
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "auto";
    };
  }, [isOpen, currentIndex]);

  if (!isOpen) return null;

  const nextImage = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex flex-col justify-between p-4 sm:p-6 lg:p-8 animate-fadeIn">
      {/* هدر مودال: عنوان اقامتگاه، شمارنده و دکمه بستن */}
      <div className="flex items-center justify-between text-white z-10">
        <div className="flex items-center gap-x-3">
          <span className="bg-white/10 backdrop-blur-md px-3 py-1 rounded-xl text-xs font-PeydaMedium border border-white/20">
            {currentIndex + 1} از {images.length}
          </span>
          <h2 className="font-PeydaBold text-sm sm:text-base line-clamp-1">
            {title}
          </h2>
        </div>

        <button
          onClick={onClose}
          className="bg-white/10 hover:bg-white/20 backdrop-blur-md p-2.5 rounded-full text-white transition-all border border-white/20"
          title="بستن (Esc)"
        >
          <HiX className="text-xl" />
        </button>
      </div>

      {/* تصویر اصلی وسط مودال همراه با دکمه‌های ناوبری */}
      <div className="relative flex-1 flex items-center justify-center my-4 overflow-hidden">
        {images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-2 sm:left-6 z-10 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white p-3 rounded-full transition-all border border-white/20"
            >
              <HiChevronLeft className="text-xl" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-2 sm:right-6 z-10 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white p-3 rounded-full transition-all border border-white/20"
            >
              <HiChevronRight className="text-xl" />
            </button>
          </>
        )}

        <img
          src={allimages[currentIndex]}
          alt={`${title} - ${currentIndex + 1}`}
          className="max-h-[75vh] max-w-full object-contain rounded-2xl shadow-2xl transition-transform duration-300"
          onError={(e) => {
            e.currentTarget.src = "/images/placeholder-villa.jpg";
          }}
        />
      </div>

      {/* نوار تصاویر بندانگشتی (Thumbnails) پایین مودال */}
      <div className="hidden sm:flex items-center justify-center gap-2 overflow-x-auto py-2 z-10 max-w-4xl mx-auto w-full">
        {allimages.map((img, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`relative h-16 w-24 shrink-0 rounded-xl overflow-hidden border-2 transition-all ${
              currentIndex === index
                ? "border-primary scale-105 shadow-[0_0_15px_rgba(var(--primary-rgb),0.5)]"
                : "border-transparent opacity-50 hover:opacity-100"
            }`}
          >
            <img
              src={img}
              alt={`thumbnail-${index}`}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.src = "/images/placeholder-villa.jpg";
              }}
            />
          </button>
        ))}
      </div>
    </div>
  );
}

export default GalleryModal;
