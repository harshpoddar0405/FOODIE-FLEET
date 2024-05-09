import RestaurantCategory from "./RestaurantCategory";
import Shimmer from "./Shimmer";
import { useParams } from "react-router-dom";
//import { MENU_API } from "../utils/constants";
import useRestaurantMenu from "../utils/useRestaurantMenu";
import { useState } from "react";

const RestaurantMenu = () => {
  //const [resInfo, setResInfo] = useState(null);
  const { resId } = useParams();
  const resInfo = useRestaurantMenu(resId);
  const [showIndex, setShowIndex] = useState(null);

  if (resInfo == null) return <Shimmer />;
  const { name, cuisines, costForTwoMessage } =
    resInfo?.cards[2]?.card?.card?.info;
  //const name = resInfo?.cards[0]?.card?.card?.info.name;
  // const costForTwoMessage =
  //     resInfo?.cards[0]?.card?.card?.info.costForTwoMessage;
  const { itemCards } =
    resInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards[1]?.card?.card;
  console.log(
    resInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards,
    "hello"
  );
  const categories =
    resInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards.filter(
      (c) =>
        c.card?.card?.["@type"] ==
        "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
    );
  //console.log(categories);
  // console.log(itemCards, "hello");
  // const rei =
  //   resInfo?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards[1]?.card?.card;

  return (
    <div className="text-center">
      <h1 className="font-bold text-2xl my-6">{name}</h1>
      <p className="text-bold text-lg">
        {cuisines.join(",")}-{costForTwoMessage}
      </p>
      {/* categories accordians */}
      {categories.map((category, index) => (
        <RestaurantCategory
          KEY={category?.card?.card?.title}
          data={category?.card?.card}
          showItems={index == showIndex ? true : false}
          setShowIndex={() => setShowIndex(index)}
        />
      ))}
    </div>
  );
};
export default RestaurantMenu;
