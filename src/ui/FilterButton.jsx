function FilterButton({ onClick, children, variant = "submit" }) {
  const styleFilterButton =
    variant === "submit"
      ? "flex-1 py-2.5 bg-muted/10 hover:bg-card hover:bg-card text-main rounded-xl text-sm font-medium shadow-sm cursor-pointer"
      : "px-4 py-2.5 text-sm hover:bg-card text-main transition-colors cursor-pointer rounded-xl";
  return (
    <button
      onClick={onClick}
      className={`font-PeydaBold transition-colors duration-150 delay-75 ${styleFilterButton}`}
    >
      {children}
    </button>
  );
}

export default FilterButton;
