import RestaurantCard from "./RestaurantCard";
import resList from "../utils/mockData";
import { useState, useEffect } from "react";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";

//const restaurantlist = resList;
const Body = () => {
  //Local State Variable-Super powerful
  const [listRestrau, setlistRestrau] = useState([]);
  const [searchText, setsearchText] = useState("");
  const [filteredRestrau, setfileteredRestrau] = useState([]);
  console.log("flist", listRestrau);

  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    const data = await fetch(
      "https://www.swiggy.com/dapi/restaurants/list/v5?lat=22.51800&lng=88.38320&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
    );
    const json = await data.json();

    setlistRestrau(
      json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants
    );
    setfileteredRestrau(
      json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants
    );
  };

  const onLineStatus = useOnlineStatus();
  if (onLineStatus == false)
    return (
      <h1>Looks like you're offline! Please check your internet connection;</h1>
    );

  return listRestrau.length == 0 ? (
    <Shimmer />
  ) : (
    <div className="body">
      <div className="filter flex">
        <div className="search m-4 p-4 ">
          <input
            type="text"
            className="border border-solid border-black"
            value={searchText}
            onChange={(e) => {
              setsearchText(e.target.value);
            }}
          />
          <button
            className="px-2 py-1 bg-green-100 m-3 items-center"
            onClick={() => {
              //Filter the restaurant card and update the UI
              //searchText
              //console.log(searchText);
              const filteredrestaraunt = listRestrau.filter((res) =>
                res.info.name.toLowerCase().includes(searchText.toLowerCase())
              );
              setfileteredRestrau(filteredrestaraunt);
            }}
          >
            Search
          </button>
        </div>
        <button
          className="px-3 py-1  bg-gray-200 m-3"
          onClick={() => {
            const filteredList = listRestrau.filter(
              (restaurants) => restaurants.info.avgRating > 4
            );

            setfileteredRestrau(filteredList);
          }}
        >
          Top Rated Restaurant
        </button>
      </div>
      <div className="flex flex-wrap">
        {filteredRestrau.map((restaurants) => (
          // if(!resturant.data.id){
          //   console.log("res",restaurant);
          // }
          <Link
            key={restaurants?.info?.id}
            to={"/restaurants/" + restaurants?.info?.id}
          >
            <RestaurantCard resData={restaurants} />
          </Link>
        ))}
      </div>
    </div>
  );
};
export default Body;
