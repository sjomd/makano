import { useState, useRef, useEffect } from "react";

export function useSearchMenu() {
  const [activeTab, setActiveTab] = useState(null);
  const menuRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setActiveTab(null);
      }
    }

    // فقط وقتی منو باز است لیسنر را اضافه می‌کنیم تا پرفورمنس افت نکند
    if (activeTab) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [activeTab]);

  return { activeTab, setActiveTab, menuRef };
}
