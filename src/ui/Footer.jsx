import { Link } from "react-router";
import {
  HiOutlineMail,
  HiOutlinePhone,
  HiOutlineLocationMarker,
} from "react-icons/hi";
import { FaInstagram, FaTelegram, FaTwitter, FaLinkedin } from "react-icons/fa";

function Footer() {
  return (
    <footer
      className="w-full border-t border-border bg-base text-right mt-12"
      dir="rtl"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {/* ردیف اصلی فوتر */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-12 border-b border-border/60">
          {/* ستون اول و دوم: درباره برند (عریض‌تر) */}
          <div className="lg:col-span-2 flex flex-col items-start">
            <Link
              to="/"
              className="font-PeydaBlack main text-2xl tracking-wider mb-4"
            >
              مکانو <span className="text-primary">.</span>
            </Link>
            <p className="font-SansRegular muted text-xs sm:text-sm leading-relaxed max-w-sm mb-6">
              مکانو پلتفرم تخصصی رزرو و اجاره اقامتگاه‌های خاص و منحصربه‌فرد در
              سراسر ایران است. ما با دقت و وسواس، بهترین‌ها را برای تجربه‌ای امن
              و بی‌نقص برای شما گلچین کرده‌ایم.
            </p>

            {/* شبکه‌های اجتماعی */}
            <div className="flex items-center gap-3">
              <a
                href="#"
                className="w-9 h-9 rounded-xl card border border-border flex items-center justify-center muted hover:text-primary hover:border-primary/50 transition-all"
              >
                <FaInstagram className="text-sm" />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-xl card border border-border flex items-center justify-center muted hover:text-primary hover:border-primary/50 transition-all"
              >
                <FaTelegram className="text-sm" />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-xl card border border-border flex items-center justify-center muted hover:text-primary hover:border-primary/50 transition-all"
              >
                <FaTwitter className="text-sm" />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-xl card border border-border flex items-center justify-center muted hover:text-primary hover:border-primary/50 transition-all"
              >
                <FaLinkedin className="text-sm" />
              </a>
            </div>
          </div>

          {/* ستون سوم: دسترسی سریع */}
          <div className="flex flex-col items-start">
            <h4 className="font-PeydaBold main text-sm sm:text-base mb-4">
              دسترسی سریع
            </h4>
            <ul className="flex flex-col gap-2.5">
              <li>
                <Link
                  to="/stays"
                  className="font-SansRegular muted hover:text-primary text-xs sm:text-sm transition-colors"
                >
                  همه اقامتگاه‌ها
                </Link>
              </li>
              <li>
                <Link
                  to="/cities"
                  className="font-SansRegular muted hover:text-primary text-xs sm:text-sm transition-colors"
                >
                  شهرهای محبوب
                </Link>
              </li>
              <li>
                <Link
                  to="/blog"
                  className="font-SansRegular muted hover:text-primary text-xs sm:text-sm transition-colors"
                >
                  مجلات و مقالات
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="font-SansRegular muted hover:text-primary text-xs sm:text-sm transition-colors"
                >
                  درباره ما
                </Link>
              </li>
            </ul>
          </div>

          {/* ستون چهارم: راهنمای مشتریان */}
          <div className="flex flex-col items-start">
            <h4 className="font-PeydaBold main text-sm sm:text-base mb-4">
              راهنمای مشتریان
            </h4>
            <ul className="flex flex-col gap-2.5">
              <li>
                <Link
                  to="/rules"
                  className="font-SansRegular muted hover:text-primary text-xs sm:text-sm transition-colors"
                >
                  قوانین و مقررات
                </Link>
              </li>
              <li>
                <Link
                  to="/faq"
                  className="font-SansRegular muted hover:text-primary text-xs sm:text-sm transition-colors"
                >
                  سوالات متداول
                </Link>
              </li>
              <li>
                <Link
                  to="/privacy"
                  className="font-SansRegular muted hover:text-primary text-xs sm:text-sm transition-colors"
                >
                  حریم خصوصی
                </Link>
              </li>
              <li>
                <Link
                  to="/support"
                  className="font-SansRegular muted hover:text-primary text-xs sm:text-sm transition-colors"
                >
                  پشتیبانی ۲۴ ساعته
                </Link>
              </li>
            </ul>
          </div>

          {/* ستون پنجم: اطلاعات تماس */}
          <div className="flex flex-col items-start">
            <h4 className="font-PeydaBold main text-sm sm:text-base mb-4">
              ارتباط با ما
            </h4>
            <ul className="flex flex-col gap-3">
              <li className="flex items-start gap-2 muted text-xs sm:text-sm">
                <HiOutlineLocationMarker className=" text-primary shrink-0 mt-0.5" />
                <span className="font-SansRegular">
                  تهران، خیابان ولیعصر، پلاک توحید
                </span>
              </li>
              <li className="flex items-center gap-2 muted text-xs sm:text-sm">
                <HiOutlinePhone className=" text-primary shrink-0" />
                <span className="font-SansRegular" dir="ltr">
                  ۰۲۱ - ۲۸۴۲۰۰۰۰
                </span>
              </li>
              <li className="flex items-center gap-2 muted text-xs sm:text-sm">
                <HiOutlineMail className=" text-primary shrink-0" />
                <span className="font-SansRegular">support@mekano.ir</span>
              </li>
            </ul>
          </div>
        </div>

        {/* بخش پایینی: کپی‌رایت و نمادها */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-right">
          <p className="font-SansRegular muted text-xs">
            تمامی حقوق مادی و معنوی این وب‌سایت متعلق به{" "}
            <span className="font-PeydaBold main">مکانو</span> می‌باشد. © ۱۴۰۵
          </p>
          <div className="flex items-center gap-4">
            <span className="text-[11px] muted font-SansRegular bg-card border border-border px-3 py-1.5 rounded-xl">
              طراحی شده توسط امید فراهانی 🚀
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
