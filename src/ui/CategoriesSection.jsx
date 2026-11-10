import Section from "./Sections";
import {
  EcoLodgeIcon,
  SwissCabinIcon,
  LuxuryIcon,
  VillaIcon,
  ApartmentIcon,
} from "./CategoryIcons";
import { useNavigate } from "react-router";

const categoryData = [
  {
    id: 1,
    title: "بومگردی",
    icon: EcoLodgeIcon,
    slug: "ecotourism",
    url: "property_type-in=ecotourism",
    color:
      "hover:bg-orange-50/50 hover:border-orange-200 dark:hover:bg-orange-900/20 dark:hover:border-orange-800/50",
  },
  {
    id: 2,
    title: "سوئیسی",
    icon: SwissCabinIcon,

    url: "property_type-in=cottage",
    color:
      "hover:bg-amber-50/50 hover:border-amber-200 dark:hover:bg-amber-900/20 dark:hover:border-amber-800/50",
  },
  {
    id: 3,
    title: "سوئیت",
    icon: LuxuryIcon,
    url: "property_type-in=suite",
    color:
      "hover:bg-purple-50/50 hover:border-purple-200 dark:hover:bg-purple-900/20 dark:hover:border-purple-800/50",
  },
  {
    id: 4,
    title: "ویلایی",
    icon: VillaIcon,
    url: "property_type-in=villa",
    color:
      "hover:bg-blue-50/50 hover:border-blue-200 dark:hover:bg-blue-900/20 dark:hover:border-blue-800/50",
  },
  {
    id: 5,
    title: "آپارتمان",
    icon: ApartmentIcon,
    url: "property_type-in=apartment",
    color:
      "hover:bg-cyan-50/50 hover:border-cyan-200 dark:hover:bg-cyan-900/20 dark:hover:border-cyan-800/50",
  },
];

function CategoriesSection() {
  const navigate = useNavigate();
  return (
    <Section bg="bg-base z-10 relative">
      <Section.Header>
        <Section.Titles
          title="دسته‌بندی اقامتگاه‌ها"
          subtitle="برای هر سلیقه‌ای، یک تجربه خاص"
        />
        <Section.Actions to="/stays" />
      </Section.Header>

      <Section.Content>
        <div className="flex w-full h-25 sm:h-45 lg:h-55 gap-3 lg:gap-4 overflow-x-auto lg:overflow-visible hide-scrollbar snap-x md:justify-center pb-4 lg:pb-0">
          {categoryData.map((item) => (
            <button
              key={item.id}
              onClick={() => navigate(`/stays?${item.url}`)}
              type="button"
              className={`
                group relative flex flex-col items-center justify-center shrink-0 
                w-27.5 lg:w-auto lg:flex-1 lg:hover:flex-[2.5]
                rounded-4xl bg-card border border-border/80 
                transition-[flex,colors,transform] duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]
                overflow-hidden cursor-pointer snap-center
                shadow-[0_4px_20px_-12px_rgba(0,0,0,0.1)] hover:shadow-lg
                ${item.color}
              `}
            >
              <div className="text-muted group-hover:text-primary transition-all duration-500 ease-out transform group-hover:scale-125 lg:group-hover:-translate-y-4">
                <item.icon className="w-10 h-10 sm:w-12 sm:h-12 drop-shadow-sm" />
              </div>

              <div className="mt-3 lg:mt-0 lg:absolute lg:bottom-6 lg:opacity-0 lg:translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 delay-75">
                <span className="font-PeydaBlack text-xs sm:text-sm text-main group-hover:text-primary whitespace-nowrap">
                  {item.title}
                </span>
              </div>

              <div className="absolute inset-0 bg-linear-to from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
            </button>
          ))}
        </div>
      </Section.Content>
    </Section>
  );
}

export default CategoriesSection;
