import StayPersonas from "./StayPersonas";
import StayAboutAndMap from "./StayAboutAndMap";
import StayAmenities from "./StayAmenities";
import StayVibeBanner from "./StayVibeBanner";
import StayRules from "./StayRules";
import StayReviews from "./StayReviews";
import StayTrustBadge from "./StayTrustBadge";

export default function StayDetailsContent({ stay }) {
  if (!stay) return null;
  return (
    <div className="space-y-7 mt-7">
      <StayPersonas stay={stay} />
      <StayAboutAndMap
        description={stay?.description}
        locationTitle={stay?.address}
      />
      <StayAmenities stayAmenities={stay?.property_amenity} />
      <StayVibeBanner />
      <StayTrustBadge stay={stay} />
      <StayRules stayRules={stay?.property_rule} />
      <StayReviews rating={stay?.rating} count={stay?.reviews_count} />
    </div>
  );
}
