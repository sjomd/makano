import {
  cloneElement,
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";
import { createPortal } from "react-dom";
import { HiOutlineX } from "react-icons/hi";

const ModalContext = createContext();

function Modal({ children }) {
  const [openName, setOpenName] = useState("");
  const close = () => setOpenName("");
  const open = setOpenName;

  return (
    <ModalContext.Provider value={{ openName, close, open }}>
      {children}
    </ModalContext.Provider>
  );
}

function Open({ children, opens: opensWindowName }) {
  const { open } = useContext(ModalContext);
  return cloneElement(children, { onClick: () => open(opensWindowName) });
}

function Window({ children, name, title, proFilter = false }) {
  const { openName, close } = useContext(ModalContext);
  const isOpen = name === openName;

  const [shouldRender, setShouldRender] = useState(false);
  const [isClosing, setIsClosing] = useState(true);

  useEffect(() => {
    let timer1;
    let timer2;

    if (isOpen) {
      timer1 = setTimeout(() => {
        setShouldRender(true);
      }, 0);

      timer2 = setTimeout(() => setIsClosing(false), 10);
      document.body.style.overflow = "hidden";
    } else if (shouldRender) {
      // این بخش هم رفت تو تایمر تا لینتر کلاً خفه بشه
      timer1 = setTimeout(() => {
        setIsClosing(true);
      }, 0);
      document.body.style.overflow = "unset";

      timer2 = setTimeout(() => {
        setShouldRender(false);
      }, 300);
    }

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, shouldRender]);

  if (!shouldRender) return null;

  return createPortal(
    <div className="fixed inset-0 z-100 flex items-end sm:items-center justify-center p-0">
      <div
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300 ${
          isClosing ? "opacity-0" : "opacity-100"
        }`}
        onClick={close}
      />

      <div
        className={`relative w-full lg:max-w-lg bg-base border border-border/50 lg:rounded-t-2xl sm:rounded-2xl shadow-2xl z-10 flex flex-col max-[1024px]:h-full ${
          proFilter ? "max-h-[70vh]" : "h-[70vh]"
        } overflow-hidden transform transition-all duration-300 ease-in-out ${
          isClosing
            ? "translate-y-full opacity-0 sm:translate-y-8"
            : "translate-y-0 opacity-100 sm:translate-y-0"
        }`}
        dir="rtl"
      >
        <div className="w-full flex justify-center pt-3 pb-1 sm:hidden shrink-0">
          <div className="w-12 h-1.5 bg-border rounded-full" />
        </div>

        <div className="flex items-center gap-x-3.5 px-5 pb-4 pt-2 sm:pt-5 border-b border-border/60 shrink-0">
          <button
            onClick={close}
            className="p-1.5 bg-hover rounded-full text-muted hover:text-main transition-colors cursor-pointer"
          >
            <HiOutlineX className="text-xl" />
          </button>
          <h2 className="text-lg font-PeydaBlack text-main">{title}</h2>
        </div>

        <div className="flex-1 overflow-y-auto hide-scrollbar p-5 flex flex-col justify-between">
          {cloneElement(children, { onClose: close })}
        </div>
      </div>
    </div>,
    document.body,
  );
}

Modal.Open = Open;
Modal.Window = Window;

export default Modal;
