function Logo({ size = "size-12", className = "" }) {
  return (
    <img
      src="/light-mode.png"
      alt="لوگوی سایت مکانو"
      className={`object-contain transition-transform duration-300 hover:scale-105 ${size} ${className}`}
    />
  );
}

export default Logo;
