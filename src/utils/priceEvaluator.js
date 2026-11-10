import { formatToman } from "./helpers";

// ۱. محاسبه امتیاز وزنی اقامتگاه بر اساس امکانات، متراژ و قوانین
const calculateFeatureScore = (stay) => {
  let score = 100; // امتیاز پایه

  // تاثیر ظرفیت و اتاق (اطلاعات موجود در کارت)
  score += (stay.rooms || 1) * 20;
  score += (stay.capacity || 2) * 8;
  score += ((stay.area || 100) / 10) * 3; // به ازای هر ۱۰ متر زیربنا ۳ امتیاز

  // تاثیر امکانات رفاهی (Amenities)
  const amenities = stay.amenities || [];
  if (amenities.some((a) => a.includes("استخر"))) score += 45;
  if (amenities.some((a) => a.includes("جکوزی"))) score += 25;
  if (amenities.some((a) => a.includes("بیلیارد"))) score += 15;
  score += amenities.length * 4;

  // تاثیر انعطاف‌پذیری قوانین (قوانین سخت‌گیرانه امتیاز را کمی تعدیل می‌کنند)
  if (stay.pet_allowed) score += 10;

  return score;
};

// ۲. تابع اصلی مقایسه با اقامتگاه‌های مشابه
export const evaluateStayPrice = (currentStay, allStays = []) => {
  if (!currentStay) return null;

  // قیمت نهایی شبانه (با احتساب تخفیف فعلی)
  const currentFinalPrice = currentStay.discount
    ? currentStay.price_per_night * (1 - currentStay.discount / 100)
    : currentStay.price_per_night;

  // فیلتر کردن اقامتگاه‌های مشابه (مثلاً هم‌منطقه یا با تعداد اتاق نزدیک)
  const similarStays = allStays.filter(
    (s) =>
      s.id !== currentStay.id &&
      (s.region === currentStay.region ||
        Math.abs((s.rooms || 1) - (currentStay.rooms || 1)) <= 1),
  );

  const currentScore = calculateFeatureScore(currentStay);
  let fairEstimatedPrice = currentStay.price_per_night; // پیش‌فرض در صورت نبودن دیتای مشابه

  // اگر دیتای اقامتگاه‌های دیگر موجود بود، میانگین ارزش بازار را درمی‌آوریم
  if (similarStays.length > 0) {
    const avgPricePerPoint =
      similarStays.reduce((acc, s) => {
        const sPrice = s.discount
          ? s.price_per_night * (1 - s.discount / 100)
          : s.price_per_night;
        return acc + sPrice / calculateFeatureScore(s);
      }, 0) / similarStays.length;

    fairEstimatedPrice =
      Math.round((avgPricePerPoint * currentScore) / 50000) * 50000;
  }

  // درصد اختلاف قیمت این ویلا با ارزش واقعی بازار
  const diffRatio =
    ((currentFinalPrice - fairEstimatedPrice) / fairEstimatedPrice) * 100;

  // تعیین سطح قیمت و مکان نشانگر روی نوار (بین 10 تا 90 درصد عرض نوار)
  const markerPosition = Math.min(90, Math.max(10, 50 + diffRatio * 1.5));

  if (diffRatio <= -8) {
    return {
      status: "great",
      badge: "بسیار خوش‌قیمت",
      title: `${Math.abs(Math.round(diffRatio))}% ارزان‌تر از موارد مشابه`,
      desc: ` با توجه به ${currentStay.capacity || 6} نفر ظرفیت، امکانات و متراژ، ارزش تخمینی این اقامتگاه حدود ${formatToman(fairEstimatedPrice)} تومان است.`,
      color: "text-emerald-400",
      bgBadge: "bg-emerald-500/15 border-emerald-500/30 text-emerald-400",
      markerPosition,
    };
  }

  if (diffRatio <= 10) {
    return {
      status: "fair",
      badge: "قیمت منصفانه",
      title: "منطبق با میانگین منطقه",
      desc: "قیمت این ویلا کاملاً متناسب با امکانات رفاهی، متراژ و شرایط آن تعیین شده است.",
      color: "text-sky-400",
      bgBadge: "bg-sky-500/15 border-sky-500/30 text-sky-400",
      markerPosition,
    };
  }

  return {
    status: "high",
    badge: "لوکس / بالاتر از میانگین",
    title: `${Math.round(diffRatio)}% بالاتر از میانگین منطقه`,
    desc: "به دلیل موقعیت خاص، کیفیت ساخت یا امکانات ویژه، قیمت این مورد بالاتر از میانگین است.",
    color: "text-amber-400",
    bgBadge: "bg-amber-500/15 border-amber-500/30 text-amber-400",
    markerPosition,
  };
};
