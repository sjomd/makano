import { IoSearchSharp } from "react-icons/io5";
import Modal from "./Modal";

import MobileSearchContent from "./MobileSearchContent";
function MobileSearchBox({ onClose }) {
  return (
    <>
      <Modal>
        <Modal.Open opens="search">
          <section
            aria-label="بخش جستجوی اقامتگاه"
            className="sticky top-0 bg-base border-b border-border px-4 min-[450px]:px-8 py-3 w-full z-30 lg:hidden"
          >
            <button
              type="button"
              role="search"
              aria-haspopup="dialog"
              className="flex items-center w-full max-w-2xl mx-auto h-14 bg-card border border-border rounded-full px-3.5 gap-x-3 text-right shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:border-primary/50 transition-all duration-300 active:scale-[0.99]"
            >
              <span className="flex items-center justify-center text-primary text-2xl shrink-0">
                <IoSearchSharp />
              </span>

              <div className="flex flex-col items-start gap-y-0.5 overflow-hidden">
                <span className="font-SansDemiBold text-main text-xs min-[380px]:text-sm">
                  مقصد سفرت کجاست؟
                </span>
                <span className="font-SansRegular text-muted text-[10px] min-[380px]:text-xs truncate w-full">
                  جستجوی مقصد سفر، تاریخ، نفرات
                </span>
              </div>
            </button>
          </section>
        </Modal.Open>
        <Modal.Window name="search" title="انتخاب سریع">
          <MobileSearchContent onClose={onClose} />
        </Modal.Window>
      </Modal>
    </>
  );
}

export default MobileSearchBox;
