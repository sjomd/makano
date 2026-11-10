import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import { Link } from "react-router"; // تغییر به react-router-dom

function Section({ children, bg = "" }) {
  return (
    <section className={`w-full ${bg}`}>
      <div className="xl:container px-3 py-2.5 mx-auto">{children}</div>
    </section>
  );
}

function Header({ children }) {
  return (
    <div className="flex items-end justify-between mb-6 sm:mb-8">
      {children}
    </div>
  );
}

function Titles({ title, subtitle }) {
  return (
    // کلمه return اضافه شد
    <div className="flex flex-col items-start gap-y-1.5">
      <h2 className="font-PeydaBlack text-main text-lg sm:text-xl md:text-2xl">
        {title}
      </h2>
      {subtitle && (
        <p className="font-SansRegular text-muted text-[11px] sm:text-xs md:text-sm">
          {subtitle}
        </p>
      )}
    </div>
  );
}

function Actions({ to, needSlider, onNext, onPrev }) {
  return (
    // چیدمان افقی شد (flex-row به جای flex-col)
    <div className="flex flex-col items-start gap-y-4 shrink-0">
      {to && (
        <Link
          to={to} // پراپ to اضافه شد
          className="flex items-center gap-x-1 text-primary text-sm hover:text-primary-hover transition-colors"
        >
          <span className="hidden sm:flex items-center gap-x-1 text-primary hover:text-primary-hover font-PeydaBold text-xs sm:text-sm transition-colors">
            مشاهده‌همه
          </span>
          <HiChevronLeft className="text-lg" />
        </Link>
      )}

      {needSlider && (
        <div className="hidden sm:flex items-center gap-x-2">
          {/* دکمه‌های اسلایدر به تگ button تبدیل شدند تا قابلیت کلیک داشته باشند */}
          <button
            type="button"
            onClick={onPrev}
            className="flex items-center justify-center w-8 h-8 rounded-full border border-border hover:bg-base text-main"
          >
            <HiChevronRight className="text-lg" />
          </button>
          <button
            type="button"
            onClick={onNext}
            className="flex items-center justify-center w-8 h-8 rounded-full border border-border hover:bg-base text-main"
          >
            <HiChevronLeft className="text-lg" />
          </button>
        </div>
      )}
    </div>
  );
}

function Content({ children }) {
  return <div className="w-full">{children}</div>;
}

// اتصال فرزندها به پدر (الگوی Compound)
Section.Header = Header;
Section.Titles = Titles;
Section.Actions = Actions;
Section.Content = Content;

export default Section;
