// The code provided is a well-structured and complete implementation of a CryptoContext component and corresponding Crypto context using React's createContext and useContext hooks. It manages the state related to cryptocurrency data, user authentication, and watchlist using Firebase Firestore.

// Here's a summary of the functionality:


import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "./firebase";
import axios from "axios";
import { CoinList } from "./config/api";
import { onSnapshot, doc } from "firebase/firestore";


const Crypto = createContext();
// A Crypto context is created using createContext. This context will be used to pass data and functions down the component tree.


const CryptoContext = ({ children }) => {
  const [currency, setCurrency] = useState("INR");
  const [symbol, setSymbol] = useState("₹");
  const [alert, setAlert] = useState({
    open: false,
    message: "",
    type: "success",
  });
  const [user, setUser] = useState(null);
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [watchlist, setWatchlist] = useState([]);

  useEffect(() => {
    if (user) {
      const coinRef = doc(db, "watchlist", user?.uid);
      var unsubscribe = onSnapshot(coinRef, (coin) => {
        if (coin.exists()) {
          console.log(coin.data().coins);
          setWatchlist(coin.data().coins);
        } else {
          console.log("No Items in Watchlist");
        }
      });

      return () => {
        unsubscribe();
      };
    }
  }, [user]);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) setUser(user);
      else setUser(null);
      console.log(user);
    });
    
  }, []);

  const fetchCoins = async () => {
    setLoading(true);
    const { data } = await axios.get(CoinList(currency));

    setCoins(data);
    setLoading(false);
  };

  useEffect(() => {
    if (currency === "INR") setSymbol("₹");
    else if (currency === "USD") setSymbol("$");

    fetchCoins();
  }, [currency]);

  return (
    <Crypto.Provider
      value={{
        currency,
        setCurrency,
        symbol,
        alert,
        setAlert,
        user,
        coins,
        loading,
        watchlist,
      }}
    >
      {children}
    </Crypto.Provider>
  );
};

export default CryptoContext;

export const CryptoState = () => {
  return useContext(Crypto);
};

// The CryptoContext functional component is defined. It serves as a provider for the Crypto context and wraps the application's main components.


// State variables managed within the context are:

// currency: Represents the selected currency (e.g., "INR" or "USD").

// symbol: Represents the currency symbol based on the selected currency.

// alert: Represents an alert message to display to the user.

// user: Represents the currently authenticated user (obtained from Firebase).

// coins: Represents an array of cryptocurrency coins fetched from the API.

// loading: A boolean flag to indicate if the data is currently being fetched.

// watchlist: An array of cryptocurrency coins that the user has added to their watchlist.

// The CryptoContext component has two useEffect hooks to manage the watchlist data and user authentication:

// The first useEffect hook listens to changes in the user state. If there is a user (i.e., the user is authenticated), it fetches the user's watchlist from Firestore using the onSnapshot function and sets the watchlist state accordingly.

// The second useEffect hook listens to changes in the currency state. When the currency is changed, it updates the symbol state accordingly and fetches the cryptocurrency data using the fetchCoins function.

// The fetchCoins function is an asynchronous function that fetches the list of cryptocurrency coins from the API based on the selected currency and updates the coins state.

// The CryptoContext component returns the Crypto context provider, passing down the states and functions as context values.

// The CryptoState function is defined, which uses the useContext hook to access the data from the Crypto context.

// The CryptoContext component and CryptoState function are exported to be used in other parts of the application.


// Overall, this code sets up a context provider to manage cryptocurrency data and user watchlist using Firebase Firestore for a React application. Other components within the application can access and update the state managed within this context using the CryptoState function provided by the context.
