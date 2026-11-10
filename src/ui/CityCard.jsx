import { Link } from "react-router"; // یا "react-router-dom"
function CityCard({
  name,
  slug,
  image_url,
  link = `/stays?city-ilike=${slug}`,
}) {
  return (
    <Link
      to={link}
      className="group relative flex flex-col w-50 sm:w-57.5 h-70 sm:h-80 shrink-0 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-500 snap-start focus:outline-none"
    >
      {/* تصویر پوستر شهر با انیمیشن زوم */}
      <img
        src={image_url}
        alt={name}
        loading="lazy"
        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
      />

      {/* گرادیان چندلایه حرفه‌ای: سنگین در پایین برای خوانایی متن، محو شونده در بالا */}
      <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/40 to-transparent opacity-80 group-hover:opacity-95 transition-opacity pointer-events-none"></div>

      {/* محتوای متنی کاملاً سفید و خوانا */}
      <div className="absolute inset-x-0 bottom-0 p-4 flex flex-col items-start z-10 text-white">
        <h3 className="font-PeydaBlack text-white sm:text-lg mb-1 group-hover:text-amber-400 transition-colors drop-shadow-md">
          {name}
        </h3>
      </div>
    </Link>
  );
}

export default CityCard;
