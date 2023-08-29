export const CoinList = (currency) =>
  `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=100&page=1&sparkline=false`;

  // Returns the URL to fetch a list of coins with their market data based on the provided currency.
// Parameters:
// currency: The currency in which the market data will be displayed (e.g., "usd", "eur", etc.).

export const SingleCoin = (id) =>
  `https://api.coingecko.com/api/v3/coins/${id}`;
// Returns the URL to fetch data for a specific coin based on the provided id.
// Parameters:
// id: The unique identifier of the coin.


export const HistoricalChart = (id, days = 365, currency) =>
  `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=${currency}&days=${days}`;

// Returns the URL to fetch historical market data for a specific coin over a certain number of days and based on the provided currency.
// Parameters:
// id: The unique identifier of the coin.
// days: The number of days for which historical data is needed (default is 365 days).
// currency: The currency in which the historical data will be displayed (e.g., "usd", "eur", etc.).


export const TrendingCoins = (currency) =>
  `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=gecko_desc&per_page=10&page=1&sparkline=false&price_change_percentage=24h`;

// Returns the URL to fetch a list of trending coins based on the provided currency.
// Parameters:
// currency: The currency in which the trending coins will be displayed (e.g., "usd", "eur", etc.).
// basically the trending coins from as we can see from the carousel from the banner

// These functions are useful for fetching cryptocurrency data from the CoinGecko API based on different criteria, such as specific coins, historical data, trending coins, and market lists.
