import React, { Suspense, lazy } from "react";
import ReactDOM from "react-dom/client";
import Header from "./components/Header";
import Body from "./components/Body";
import About from "./components/About";
import Error from "./components/Error";
import Contact from "./components/Contact";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import RestaurantMenu from "./components/RestaurantMenu";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";
import Cart from "./components/Cart";
//import Grocery from "./components/Grocery";
// const resObj = {
//   info: {
//     id: "454936",
//     name: "Kaligodam",
//     cloudinaryImageId: "abw2pffyeyupiaolatg8",
//     locality: "Lake Road",
//     areaName: "South Kolkata",
//     costForTwo: "₹250 for two",
//     cuisines: ["Sweets"],
//     avgRating: 4.5,
//     veg: true,
//     parentId: "18682",
//     avgRatingString: "4.5",
//     totalRatingsString: "1K+",
//     sla: {
//       deliveryTime: 27,
//       lastMileTravel: 3.6,
//       serviceability: "SERVICEABLE",
//       slaString: "25-30 mins",
//       lastMileTravelString: "3.6 km",
//       iconType: "ICON_TYPE_EMPTY",
//     },
//     availability: {
//       nextCloseTime: "2024-02-24 21:00:00",
//       opened: true,
//     },
//     badges: {},
//     isOpen: true,
//     aggregatedDiscountInfoV2: {},
//     type: "F",
//     badgesV2: {
//       entityBadges: {
//         imageBased: {},
//         textBased: {},
//         textExtendedBadges: {},
//       },
//     },
//     orderabilityCommunication: {
//       title: {},
//       subTitle: {},
//       message: {},
//       customIcon: {},
//     },
//     differentiatedUi: {
//       displayType: "ADS_UI_DISPLAY_TYPE_ENUM_DEFAULT",
//       differentiatedUiMediaDetails: {
//         mediaType: "ADS_MEDIA_ENUM_IMAGE",
//         lottie: {},
//         video: {},
//       },
//     },
//     reviewsSummary: {},
//     displayType: "RESTAURANT_DISPLAY_TYPE_DEFAULT",
//     restaurantOfferPresentationInfo: {},
//   },
// };

const Grocery = lazy(() => import("./components/Grocery"));
const AppLayout = () => {
  return (
    <Provider store={appStore}>
      <div className="app">
        <Header />
        <Outlet />
      </div>
    </Provider>
  );
};
const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Body />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/grocery",
        element: (
          <Suspense fallback={<h1>Loading....</h1>}>
            <Grocery />
          </Suspense>
        ),
      },
      {
        path: "/restaurants/:resId",
        element: <RestaurantMenu />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
    ],
    errorElement: <Error />,
  },
]);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={appRouter} />);
