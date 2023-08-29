// This is a React component called Carousel that implements a dynamic carousel to display trending cryptocurrencies using Material-UI components and React Router.

// Let's go through the code step-by-step:

import { makeStyles } from "@material-ui/core";
import axios from "axios";
import { useEffect, useState } from "react";
import AliceCarousel from "react-alice-carousel";
import { Link } from "react-router-dom";
import { TrendingCoins } from "../../config/api";
import { CryptoState } from "../../CryptoContext";
import { numberWithCommas } from "../CoinsTable";


// The component imports various libraries and components, including Material-UI's makeStyles, axios for making API requests, useEffect and useState from React for handling component lifecycle and state, AliceCarousel for the carousel functionality, Link from React Router for navigation, and other utility functions like CryptoState and numberWithCommas.

const Carousel = () => {
  const [trending, setTrending] = useState([]);
  const { currency, symbol } = CryptoState();

// The Carousel component defines a state variable trending to hold the list of trending cryptocurrencies fetched from the API. It also retrieves the current currency and symbol from the context using the CryptoState function.


  const fetchTrendingCoins = async () => {
    const { data } = await axios.get(TrendingCoins(currency));

    setTrending(data);
  };
// The component defines an asynchronous function fetchTrendingCoins to fetch trending cryptocurrencies based on the selected currency using the TrendingCoins API endpoint. The fetched data is then stored in the trending state.



  useEffect(() => {
    fetchTrendingCoins();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currency]);

// The useEffect hook is used to fetch trending cryptocurrencies whenever the currency changes.

  const useStyles = makeStyles((theme) => ({
    carousel: {
      height: "50%",
      display: "flex",
      alignItems: "center",
    },
    carouselItem: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      cursor: "pointer",
      textTransform: "uppercase",
      color: "white",
    },
  }));

  // The component defines custom styles using the makeStyles hook. It sets up styles for the carousel container and individual carousel items.

  const classes = useStyles();

  const items = trending.map((coin) => {
    let profit = coin?.price_change_percentage_24h >= 0;

    return (
      <Link className={classes.carouselItem} to={`/coins/${coin.id}`}>
        <img
          src={coin?.image}
          alt={coin.name}
          height="80"
          style={{ marginBottom: 10 }}
        />
        <span>
          {coin?.symbol}
          &nbsp;
          <span
            style={{
              color: profit > 0 ? "rgb(14, 203, 129)" : "red",
              fontWeight: 500,
            }}
          >
            {profit && "+"}
            {coin?.price_change_percentage_24h?.toFixed(2)}%
          </span>
        </span>
        <span style={{ fontSize: 22, fontWeight: 500 }}>
          {symbol} {numberWithCommas(coin?.current_price.toFixed(2))}
        </span>
      </Link>
    );
  });

  const responsive = {
    0: {
      items: 2,
    },
    512: {
      items: 4,
    },
  };

// Inside the component, an array of items is created using the trending data. Each item in the array represents a single cryptocurrency in the carousel. It contains an image of the coin, its symbol, price change percentage in the last 24 hours, and the current price. The price change percentage is styled based on whether it is positive or negative.


  return (
    <div className={classes.carousel}>
      <AliceCarousel
        mouseTracking
        infinite
        autoPlayInterval={1000}
        animationDuration={1500}
        disableDotsControls
        disableButtonsControls
        responsive={responsive}
        items={items}
        autoPlay
      />
    </div>
  );
};

// The AliceCarousel component is used to create the dynamic carousel. It receives various props like items, responsive, autoPlay, autoPlayInterval, animationDuration, and others to customize the carousel behavior.

// The responsive object defines the number of items to be displayed at different breakpoints, making the carousel responsive on different screen sizes.

// The AliceCarousel component renders the carousel with the items, and it has auto-play and infinite loop functionality enabled.


export default Carousel;

// Overall, this Carousel component fetches trending cryptocurrencies from an API based on the selected currency, dynamically creates carousel items with cryptocurrency information, and displays them in a responsive carousel using the AliceCarousel library. Users can click on the individual coins in the carousel to navigate to the detailed page of each cryptocurrency.





