import {
  HiOutlineLocationMarker,
  HiUser,
  HiHome,
  HiCheckCircle,
  HiStar,
  HiOutlineSparkles,
  HiOutlineShieldCheck,
  HiOutlineOfficeBuilding,
  HiOutlineGlobeAlt,
  HiArrowLeft,
} from "react-icons/hi";
import { Link } from "react-router";
import { calculateDiscountPrice, formatToman } from "../utils/helpers";

function SpecialOfferSection({
  id,
  title,
  description,
  cities,
  neighborhood,
  price_per_night,
  discount,
  rooms_count,
  capacity,
  rating,
  cover_image,
  image_url,
  property_types,
  region_types,
  property_amenity = [],
  property_rule = [],
  link = ` /stays/${id}`,
}) {
  const finalPrice = calculateDiscountPrice(price_per_night, discount);
  const displayImage = cover_image || image_url;

  const amenitiesList =
    property_amenity?.map((item) => item.amenities).filter(Boolean) || [];
  const rulesList =
    property_rule?.map((item) => item.rules).filter(Boolean) || [];

  return (
    <section className="w-full py-8">
      <div className="max-w-[1570px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="group relative bg-card/40 backdrop-blur-2xl rounded-4xl overflow-hidden border border-white/10 shadow-2xl hover:border-primary/40 hover:shadow-[0_0_40px_rgba(var(--primary-rgb),0.15)] transition-all duration-500">
          <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-primary/10 rounded-full blur-[80px] pointer-events-none group-hover:bg-primary/20 transition-all duration-500"></div>

          <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
            <div className="relative lg:col-span-6 aspect-16/10 sm:16/9 lg:aspect-auto lg:min-h-110 w-full overflow-hidden bg-base">
              <img
                src={displayImage}
                alt={title}
                className="w-full h-full object-cover lg:absolute lg:inset-0 transition-transform duration-1000 ease-out group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-black/30 lg:bg-linear-to-l lg:from-black/60 lg:via-transparent lg:to-black/40 pointer-events-none"></div>

              {/* بج پیشنهاد ویژه و درصد تخفیف (بالا راست) */}
              <div className="absolute top-4 right-4 flex flex-wrap items-center gap-2 z-10">
                <div className="bg-primary/90 backdrop-blur-md text-white text-xs font-PeydaBold px-3.5 py-1.5 rounded-xl shadow-[0_0_15px_rgba(var(--primary-rgb),0.5)] flex items-center gap-x-1.5 border border-white/20">
                  <HiCheckCircle className="text-base animate-pulse" />
                  <span>پیشنهاد ویژه مکانو</span>
                </div>
                {discount > 0 && (
                  <div className="bg-rose-500/90 backdrop-blur-md text-white text-xs font-PeydaBlack px-3 py-1.5 rounded-xl shadow-lg border border-white/20">
                    {discount}٪ تخفیف
                  </div>
                )}
              </div>

              {rating && (
                <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-md border border-white/15 text-white text-xs px-3 py-1.5 rounded-xl flex items-center gap-x-1.5 z-10 shadow-lg">
                  <span className="font-SansDemiBold pt-0.5 text-sm">
                    {rating}
                  </span>
                  <HiStar className="text-yellow-400 text-[16px] drop-shadow-[0_0_8px_rgba(250,204,21,0.6)]" />
                </div>
              )}

              <div className="absolute bottom-4 right-4 flex flex-wrap items-center gap-2 z-10">
                {property_types?.name && (
                  <span className="bg-black/60 backdrop-blur-md border border-white/15 text-white text-xs font-PeydaMedium px-3 py-1.5 rounded-lg flex items-center gap-x-1.5">
                    <HiOutlineOfficeBuilding className="text-primary text-sm" />
                    {property_types.name}
                  </span>
                )}
                {region_types?.name && (
                  <span className="bg-black/60 backdrop-blur-md border border-white/15 text-white text-xs font-PeydaMedium px-3 py-1.5 rounded-lg flex items-center gap-x-1.5">
                    <HiOutlineGlobeAlt className="text-emerald-400 text-sm" />
                    منطقه {region_types.name}
                  </span>
                )}
              </div>
            </div>

            <div className="lg:col-span-6 flex flex-col justify-between p-6 sm:p-8 lg:p-9 relative z-10">
              <div className="space-y-4">
                <div>
                  <div className="flex items-center gap-x-1.5 text-primary text-xs sm:text-sm font-PeydaMedium mb-1.5">
                    <HiOutlineLocationMarker className="shrink-0 text-base" />
                    <span>
                      {cities?.name} {neighborhood ? `, ${neighborhood}` : ""}
                    </span>
                  </div>
                  <h3 className="font-PeydaBlack text-main text-xl sm:text-2xl leading-snug group-hover:text-primary transition-colors">
                    {title}
                  </h3>
                </div>

                <p className="font-SansRegular text-muted text-xs sm:text-sm line-clamp-2 leading-relaxed">
                  {description}
                </p>

                <div className="flex flex-wrap items-center gap-3 pt-1">
                  <div className="flex items-center gap-x-2 bg-white/5 border border-border/60 px-3.5 py-2 rounded-xl text-xs text-main">
                    <HiUser className="text-primary text-[16px]" />
                    <span className="font-SansDemiBold">
                      ظرفیت تا {capacity} نفر
                    </span>
                  </div>
                  {rooms_count > 0 ? (
                    <div className="flex items-center gap-x-2 bg-white/5 border border-border/60 px-3.5 py-2 rounded-xl text-xs text-main">
                      <HiHome className="text-primary text-[16px]" />
                      <span className="font-SansDemiBold">
                        {rooms_count} اتاق خواب
                      </span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-x-2 bg-white/5 border border-border/60 px-3.5 py-2 rounded-xl text-xs text-main">
                      <HiHome className="text-primary text-[16px]" />
                      <span className="font-SansDemiBold">
                        بدون اتاق (سوئیت)
                      </span>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3 border-t border-border/50">
                  {amenitiesList.length > 0 && (
                    <div className="space-y-2">
                      <span className="text-xs font-PeydaBold text-muted flex items-center gap-x-1.5">
                        <HiOutlineSparkles className="text-primary text-sm" />
                        امکانات برجسته:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {amenitiesList.slice(0, 4).map((amenity) => (
                          <span
                            key={amenity.id}
                            className="text-[11px] font-SansRegular bg-primary/10 text-main border border-primary/20 px-2.5 py-1 rounded-lg"
                          >
                            {amenity.name}
                          </span>
                        ))}
                        {amenitiesList.length > 4 && (
                          <span className="text-[11px] font-SansMedium bg-white/5 text-muted px-2 py-1 rounded-lg border border-border">
                            +{amenitiesList.length - 4} مورد دیگر
                          </span>
                        )}
                      </div>
                    </div>
                  )}

                  {rulesList.length > 0 && (
                    <div className="space-y-2">
                      <span className="text-xs font-PeydaBold text-muted flex items-center gap-x-1.5">
                        <HiOutlineShieldCheck className="text-amber-500 text-sm" />
                        قوانین اقامتگاه:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {rulesList.slice(0, 2).map((rule) => (
                          <span
                            key={rule.id}
                            className="text-[11px] font-SansRegular bg-white/5 text-muted border border-border/80 px-2.5 py-1 rounded-lg"
                          >
                            {rule.name}
                          </span>
                        ))}
                        {rulesList.length > 2 && (
                          <span className="text-[11px] font-SansMedium bg-white/5 text-muted px-2 py-1 rounded-lg border border-border">
                            +{rulesList.length - 2}
                          </span>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pt-5 mt-6 border-t border-border/60">
                <div className="flex flex-col">
                  <span className="text-xs text-muted font-SansRegular mb-1">
                    شروع قیمت برای هر شب:
                  </span>
                  <div className="flex items-baseline gap-x-2.5">
                    {discount > 0 && (
                      <span className="line-through text-xs sm:text-sm text-muted opacity-60 font-SansMedium">
                        {formatToman(price_per_night)}
                      </span>
                    )}
                    <div className="flex items-baseline gap-x-1">
                      <span className="font-PeydaBlack text-xl sm:text-2xl text-primary drop-shadow-[0_0_12px_rgba(var(--primary-rgb),0.3)]">
                        {formatToman(
                          discount > 0 ? finalPrice : price_per_night,
                        )}
                      </span>
                      <span className="text-xs font-SansRegular text-muted">
                        تومان
                      </span>
                    </div>
                  </div>
                </div>

                <Link
                  to={link}
                  className="group/btn relative inline-flex items-center justify-center gap-x-2 bg-primary hover:bg-primary-hover text-white font-PeydaBold text-xs sm:text-sm px-6 py-3.5 rounded-xl shadow-[0_0_20px_rgba(var(--primary-rgb),0.3)] hover:shadow-[0_0_25px_rgba(var(--primary-rgb),0.5)] transition-all duration-300 active:scale-95"
                >
                  <span>مشاهده و رزرو اقامتگاه</span>
                  <HiArrowLeft className="text-base transition-transform duration-300 group-hover/btn:-translate-x-1" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SpecialOfferSection;
