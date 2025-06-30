import { Link, useLocation } from "react-router";

const shopItems = [
  {
    _id: 1,
    title: "Baby Stars",
    age: "0-2 years",
    color: "#FFEFBF",
    minAge: 0,
    maxAge: 2,
  },
  {
    _id: 2,
    title: "Little Stars",
    age: "3-5 years",
    color: "#EBFF94",
    minAge: 3,
    maxAge: 5,
  },
  {
    _id: 3,
    title: "Shining Stars",
    age: "6-11 years",
    color: "#7DEAFF",
    minAge: 6,
    maxAge: 11, // Fixed incorrect max age (was 12, should be 11)
  },
  {
    _id: 4,
    title: "Super Stars",
    age: "12 and above",
    color: "#E7D4FF",
    minAge: 12,
    maxAge: Infinity,
  },
];

export function ShopByAge() {
  // Helper function to get query parameters from URL
  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  };

  const query = useQuery();
  const minAge = parseInt(query.get("minAge")) || 0;
  const maxAge = parseInt(query.get("maxAge")) || Infinity;

  // Corrected filtering logic: Ensure items overlap with the query range
  const filteredShopItems = shopItems.filter(
    (item) => item.maxAge >= minAge && item.minAge <= maxAge
  );

  return (
    <div className="mx-auto w-11/12">
      <h1 className="font-poppins text-center text-2xl font-bold sm:text-3xl md:text-4xl">
        Shop by Age
      </h1>
      <div className="mt-10 grid grid-cols-2 gap-2 md:grid-cols-4 md:gap-4 lg:gap-5">
        {filteredShopItems.map((item) => (
          <Link
            to={`/ageCategory/${item._id}?minAge=${item.minAge}&maxAge=${item.maxAge}`}
            title={`View details for ${item.title}`}
            aria-label={`View details for ${item.title}`}
            key={item._id}
            className="flex flex-col items-center justify-center space-y-3 rounded-3xl border-4 border-solid border-[#3E3E3E] p-4 text-center transition-transform duration-300 hover:scale-105 hover:cursor-pointer lg:p-5"
            style={{ backgroundColor: item.color }}>
            <h1 className="font-poppins text-sm font-normal text-[#3E3E3E] sm:text-lg lg:text-2xl">
              {item.title}
            </h1>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl">Age {item.age}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
