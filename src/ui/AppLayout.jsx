import { Outlet, useLocation } from "react-router";
import BottomNav from "./BottomNav";
import Header from "./Header";
import MobileSearchBox from "./MobileSearchBox";
import Footer from "./Footer";

function AppLayout() {
  const location = useLocation();
  const isInPannel = location.pathname.startsWith("/profile");

  return (
    <div className="relative mb-20.5">
      <Header isInPannel={isInPannel} />
      {!isInPannel && <MobileSearchBox />}
      <main>
        <Outlet />
      </main>
      <BottomNav />
      <Footer />
    </div>
  );
}

export default AppLayout;
