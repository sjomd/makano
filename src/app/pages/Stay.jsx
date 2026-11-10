import { useStay } from "@/hooks/stays/useStay";
import NeonSpinner from "@/ui/NeonSpinner";
import GalleryModal from "@/ui/stay/GalleryModal";
import StayGallery from "@/ui/stay/StayGallery";
import StayHeaderInfo from "@/ui/stay/StayHeaderInfo";
import StayBookingCard from "../../ui/stay/StayBookingCard";
import { useState } from "react";

import StayDetailsContent from "@/ui/stay/StayDetailsContent";
import StayPriceRadar from "@/ui/stay/StayPriceRadar";
import { useRelatedStays } from "@/ui/stay/useRelatedStays";
import CardSection from "@/ui/CardSection";

import StayCard from "@/ui/SatyCard";
// import { useStays } from "@/hooks/stays/useStays";

function Stay() {
  const [isModalOpen, setisModalOpen] = useState(false);
  const [modalInitialState, setModalInitialState] = useState(0);
  const { stay, isLoading } = useStay();
  // const { stays } = useStays();
  const images = stay?.stay_images;
  const { relatedStays, isLoading: isLoading2 } = useRelatedStays(stay);
  if (isLoading || isLoading2) return <NeonSpinner />;
  const relateStaysFilterUrl = `city-ilike=${stay.cities.slug}&property_type-in=${stay.property_types.slug}`;

  return (
    <div className="container w-full">
      <StayGallery
        images={images}
        title={stay?.title}
        onOpenModal={() => {
          setModalInitialState(0);
          setisModalOpen(true);
        }}
      />
      <GalleryModal
        images={images}
        title={stay?.title}
        isOpen={isModalOpen}
        initialIndex={modalInitialState}
        onClose={() => setisModalOpen(false)}
      />
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:mt-30 lg:mt-28">
        <div className="lg:col-span-8">
          <StayHeaderInfo data={stay} isLoading={isLoading} />
          <StayDetailsContent stay={stay} />
        </div>
        <div className="lg:col-span-4 lg:sticky top-30">
          <StayPriceRadar stay={stay} className="mt-50" />
          <StayBookingCard stay={stay} />
        </div>
      </div>
      <CardSection
        title="اقامتگاه های متشابه"
        subtitle="اقامتگاه هایی که ممکنه به انتخاب مدنظرتون نزدیک باشه"
        to={`/stays?${relateStaysFilterUrl}`}
        data={relatedStays}
        cardComponent={StayCard}
      />
    </div>
  );
}

export default Stay;
