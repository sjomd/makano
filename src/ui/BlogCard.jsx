import { HiChevronRight, HiOutlineClock } from "react-icons/hi";
import { Link } from "react-router";
import stay2 from "../assets/image/stays/stay2.webp";

function BlogCard({ article }) {
  return (
    <Link
      key={article.id}
      to={article.link}
      className="group flex flex-col card rounded-2xl overflow-hidden border border-border shadow-sm hover:shadow-xl hover:border-primary/40 transition-all duration-300 focus:outline-none"
    >
      {/* تصویر مقاله */}
      <div className="relative w-full aspect-16/10 overflow-hidden bg-base">
        <img
          src={stay2}
          alt={article.title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <div className="absolute top-2 right-2 sm:top-3 sm:right-3 bg-card/85 backdrop-blur-md main text-[10px] sm:text-[11px] font-PeydaMedium px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-lg border border-border shadow-sm">
          {article.category}
        </div>
      </div>

      <div className="flex flex-col flex-1 p-3 sm:p-4 text-right">
        <div className="flex items-center gap-x-1 muted text-[11px] sm:text-xs mb-1.5">
          <HiOutlineClock className="text-xs sm:text-sm shrink-0" />
          <span>{article.readTime}</span>
        </div>

        <h3 className="font-PeydaBlack main text-xs sm:text-sm line-clamp-2 group-hover:text-primary transition-colors leading-relaxed mb-3">
          {article.title}
        </h3>

        <div className="mt-auto pt-2.5 sm:pt-3 border-t border-border flex items-center justify-between text-primary text-[11px] sm:text-xs font-PeydaBold">
          <span>مطالعه مقاله</span>
          <HiChevronRight className="text-xs sm:text-sm transition-transform group-hover:-translate-x-1 rotate-180" />
        </div>
      </div>
    </Link>
  );
}

export default BlogCard;
