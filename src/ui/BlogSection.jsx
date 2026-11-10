import { Link } from "react-router";
import { HiChevronRight } from "react-icons/hi";
import BlogCard from "./BlogCard";

const blogArticles = [
  {
    id: 1,
    title: "راهنمای جامع سفر به رامسر؛ جاهای دیدنی و اقامتگاه‌ها",
    category: "راهنمای سفر",
    readTime: "۵ دقیقه مطالعه",
    image:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600&q=80",
    link: "/blog/ramsar-travel-guide",
  },
  {
    id: 2,
    title: "بهترین کلبه‌های جنگلی ماسال برای یک آخر هفته رویایی",
    category: "معرفی اقامتگاه",
    readTime: "۴ دقیقه مطالعه",
    image:
      "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=600&q=80",
    link: "/blog/masal-wooden-villas",
  },
  {
    id: 3,
    title: "صفر تا صد رزرو ویلای استخردار در کردان و اطراف تهران",
    category: "نکات رزرو",
    readTime: "۶ دقیقه مطالعه",
    image:
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=600&q=80",
    link: "/blog/kordan-villa-tips",
  },
  {
    id: 4,
    title: "راهنمای انتخاب بهترین بوم‌گردی‌های بافت تاریخی یزد",
    category: "فرهنگ سفر",
    readTime: "۵ دقیقه مطالعه",
    image:
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=600&q=80",
    link: "/blog/yazd-eco-lodges",
  },
];

function BlogSection() {
  return (
    <section className="w-full py-10" dir="rtl">
      <div className="max-w-382.5 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-6 sm:mb-8 text-right">
          <div>
            <h2 className="font-PeydaBlack main text-xl sm:text-2xl mb-1.5">
              مجلات و راهنمای سفر مکانو
            </h2>
            <p className="font-SansRegular muted text-xs sm:text-sm">
              خواندنی‌ترین مطالب برای برنامه‌ریزی یک سفر بی‌نقص و خاطره‌انگیز
            </p>
          </div>

          <Link
            to="/blog"
            className="hidden sm:flex items-center gap-x-1 text-primary hover:text-primary-hover font-PeydaBold text-xs sm:text-sm transition-colors"
          >
            <span>مشاهده همه مقالات</span>
            <HiChevronRight className="text-sm rotate-180" />
          </Link>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5 text-right">
          {blogArticles.map((article) => (
            <BlogCard key={article.id} article={article} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default BlogSection;
