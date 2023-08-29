// This code defines a React component called CoinInfo that displays historical price data of a cryptocurrency using a Line chart from react-chartjs-2 library. It also provides buttons to select the number of days for which historical data should be displayed.

// Here's a summary of how the component works:


import axios from "axios";
import { useEffect, useState } from "react";
import { HistoricalChart } from "../config/api";
import { Line } from "react-chartjs-2";
import {
  CircularProgress,
  createTheme,
  makeStyles,
  ThemeProvider,
} from "@material-ui/core";
import SelectButton from "./SelectButton";
import { chartDays } from "../config/data";
import { CryptoState } from "../CryptoContext";


const CoinInfo = ({ coin }) => {
  const [historicData, setHistoricData] = useState();
  const [days, setDays] = useState(1);
  const { currency } = CryptoState();

  // The CoinInfo component receives a coin prop, which represents the selected cryptocurrency.

// It defines state variables historicData and days. historicData will hold the historical price data of the cryptocurrency, and days will hold the number of days for which historical data should be displayed.

  const useStyles = makeStyles((theme) => ({
    container: {
      width: "75%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      marginTop: 25,
      padding: 40,
      [theme.breakpoints.down("md")]: {
        width: "100%",
        marginTop: 0,
        padding: 20,
        paddingTop: 0,
      },
    },
  }));

  const classes = useStyles();

// Inside the component, a useStyles hook is used to define custom styles for the container.


  const fetchHistoricData = async () => {
    const { data } = await axios.get(HistoricalChart(coin.id, days, currency));

    setHistoricData(data.prices);
  };

// The component defines an asynchronous function fetchHistoricData to fetch historical price data for the selected cryptocurrency using the HistoricalChart API endpoint. The data is fetched based on the coin.id, days, and currency (retrieved from the context).


  useEffect(() => {
    fetchHistoricData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [days, currency]);

  // The useEffect hook is used to fetch historical data whenever the days or currency changes.


  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      type: "dark",
    },
  });
// A dark theme is created using createTheme from Material-UI.

  return (
    <ThemeProvider theme={darkTheme}>
      <div className={classes.container}>
        {!historicData ? (
          <CircularProgress
            style={{ color: "gold" }}
            size={250}
            thickness={1}
          />

          // The component renders a container (<div className={classes.container}>) to hold the Line chart and buttons.

        ) : (
          <>
            <Line
              data={{
                labels: historicData.map((coin) => {
                  let date = new Date(coin[0]);
                  let time =
                    date.getHours() > 12
                      ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                      : `${date.getHours()}:${date.getMinutes()} AM`;
                  return days === 1 ? time : date.toLocaleDateString();
                }),

                datasets: [
                  {
                    data: historicData.map((coin) => coin[1]),
                    label: `Price ( Past ${days} Days ) in ${currency}`,
                    borderColor: "#EEBC1D",
                  },
                ],
              }}
              options={{
                elements: {
                  point: {
                    radius: 1,
                  },
                },
              }}
            />
            <div
              style={{
                display: "flex",
                marginTop: 20,
                justifyContent: "space-around",
                width: "100%",
              }}

// If historicData is not available (i.e., still fetching data), a CircularProgress component is displayed, indicating loading.

// If historicData is available, the Line chart is displayed using the Line component from react-chartjs-2. The chart data is provided in the data prop, and options to customize the chart appearance are provided in the options prop.

            >
              {chartDays.map((day) => (
                <SelectButton
                  key={day.value}
                  onClick={() => setDays(day.value)}
                  selected={day.value === days}
                >
                  {day.label}
                </SelectButton>
              ))}
            </div>
          </>
        )}
      </div>
    </ThemeProvider>
  );
};

// The chart displays the cryptocurrency's historical price data on the Y-axis and timestamps on the X-axis. The timestamps are either in AM/PM format or in the format of the local date, depending on the selected number of days (days).

// Below the chart, there is a row of buttons, each representing a specific number of days. Users can click on these buttons to change the time frame for which historical data is displayed. The currently selected button is visually differentiated using the selected prop in the SelectButton component.

// The component wraps its content inside a ThemeProvider to apply the dark theme.



export default CoinInfo;

// Overall, this CoinInfo component provides a Line chart displaying historical price data of a cryptocurrency. Users can select the number of days for which data should be displayed using the buttons, and the chart automatically updates to show the data accordingly. The component also shows a loading spinner (CircularProgress) while fetching the historical data.

