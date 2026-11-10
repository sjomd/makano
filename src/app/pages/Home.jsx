// همون کارتی که بالا طراحی کردیم
import CardSection from "../../ui/CardSection";
import StayCard from "../../ui/SatyCard";
import CityCard from "../../ui/CityCard";
import CategoriesSection from "../../ui/CategoriesSection";
import SpecialOfferSection from "../../ui/SpecialOfferSection";
import Hero from "../../ui/Hero";
import BlogSection from "../../ui/BlogSection";
import TrustSection from "../../ui/TrustSection";
import SeoLinksSection from "../../ui/SeolinkSection";
import { useRegularCities } from "../../hooks/cities/useRegularCities";
import { useNortherncities } from "../../hooks/cities/useNorthernCities";

import { useStays } from "../../hooks/stays/useStays";
import { useSpecialOffer } from "../../hooks/stays/useSpecialOffer";
import MekanoLoader from "../../ui/MakanoLoader";

function Home() {
  const { regularCities, isLoading: isLoading1 } = useRegularCities();
  const { stays: economicStays, isLoading: isLoading2 } = useStays({
    maxPrice: 2000000,
    limit: 7,
  });
  const { stays: tehAndpoolStays, isLoading: isLoading3 } = useStays({
    "city-ilike": "تهران",
    amenities: "استخر",
  });
  const { northernCities, isLoading: isLoading4 } = useNortherncities();
  const { specialStay, isLoading: isLoading5 } = useSpecialOffer();
  if (isLoading1 || isLoading2 || isLoading3 || isLoading4 || isLoading5)
    return <MekanoLoader />;
  return (
    <>
      <Hero />
      <main className="">
        <CategoriesSection />
        <CardSection
          title="اجاره اقامتگاه در محبوب‌ترین شهرها"
          subtitle="پرطرفدارترین مقاصد مسافرتی برای تعطیلات پیش رو"
          to="/stays"
          data={regularCities}
          cardComponent={CityCard}
        />
        <CardSection
          title="اقتصادی و به‌صرفه"
          subtitle="پیشنهادهای ویژه با بیشترین تخفیف برای سفری باکیفیت و هوشمندانه"
          to="/stays?price_per_night-lte=2500000"
          data={economicStays}
          isStays={true}
          cardComponent={StayCard}
          bg="bg-green-800/15 dark:bg-green-800/15"
        />
        <CardSection
          title="آخر هفته تو استخر"
          subtitle="بهترین ویلاهای استخردار نزدیک تهران"
          to="/stays?city-ilike=tehran&amenities-in=pool"
          data={tehAndpoolStays}
          cardComponent={StayCard}
        />
        <CardSection
          title="اجاره اقامتگاه در شهرهای شمالی"
          subtitle="اجاره ویلا و اقامت تو شهرهای شمالی با ما"
          to="/stays"
          data={northernCities}
          cardComponent={CityCard}
        />
        <SpecialOfferSection {...specialStay} />
        <BlogSection />
        <TrustSection />
      </main>
      <SeoLinksSection />
    </>
  );
}

export default Home;
