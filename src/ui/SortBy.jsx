import { useSearchParams } from "react-router";
import Select from "./Select";

function SortBy({ options }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const sortBy = searchParams.get("sortBy") || "مرتب سازی";
  function changeHandler(e) {
    searchParams.set("sortBy", e.target.value);
    setSearchParams(searchParams);
  }

  return (
    <Select options={options} value={sortBy} changeHandler={changeHandler} />
  );
}

export default SortBy;
