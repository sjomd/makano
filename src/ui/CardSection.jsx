import { useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Section from "./Sections";

function CardSection({
  title,
  subtitle,
  to = "/",
  data = [],
  bg = "bg-transparent",
  cardComponent: CardComponent, // کامپوننت کارتی که قراره رندر بشه رو به عنوان پراپ می‌گیره
}) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    direction: "rtl",
    align: "start",
    dragFree: true,
  });

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  if (!data.length || !CardComponent) return null;

  return (
    <Section bg={`py-6 sm:py-8 ${bg}`}>
      <Section.Header>
        <Section.Titles title={title} subtitle={subtitle} />
        <Section.Actions
          to={to}
          needSlider={true}
          onNext={scrollNext}
          onPrev={scrollPrev}
        />
      </Section.Header>

      <Section.Content>
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex gap-4 sm:gap-5 py-2">
            {data.map((item) => (
              <div key={item.id} className="w-65 sm:w-70 flex shrink-0">
                {/* رندر کردن پویا و هوشمند کارت */}
                <CardComponent {...item} />
              </div>
            ))}
          </div>
        </div>
      </Section.Content>
    </Section>
  );
}
export default CardSection;
