// The chartDays constant is an array of objects that represents options for selecting different time periods for cryptocurrency charts. Each object in the array has two properties:

export const chartDays = [
  {
    label: "24 Hours",
    value: 1,
  },
  {
    label: "30 Days",
    value: 30,
  },
  {
    label: "3 Months",
    value: 90,
  },
  {
    label: "1 Year",
    value: 365,
  },
];

// label: A human-readable label representing the time period option.
// value: The corresponding numerical value representing the number of days for the time period.
// The array provides options for time periods of 24 hours, 30 days, 3 months, and 1 year. It can be used in a dropdown or any other interface element to allow users to select the desired time frame for viewing cryptocurrency data charts.

// For example, the chartDays constant can be used in conjunction with the HistoricalChart function mentioned earlier to fetch historical data for the selected time period. The selected value can be passed as an argument to the HistoricalChart function to get historical data for the specified number of days.
