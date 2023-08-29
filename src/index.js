import React from "react";
// The core library for building React components and managing the virtual DOM.

import ReactDOM from "react-dom";
//  The library responsible for rendering React components into the actual DOM.

import "./index.css";
import App from "./App";
import "react-alice-carousel/lib/alice-carousel.css";
// Importing additional CSS:

// "react-alice-carousel/lib/alice-carousel.css": Importing a CSS file for styling the "react-alice-carousel" component, which seems to be a carousel library used in the project.

import CryptoContext from "./CryptoContext";

ReactDOM.render(
  <React.StrictMode>
    <CryptoContext>
      <App />
    </CryptoContext>
  </React.StrictMode>,
  document.getElementById("root")
);

// Rendering the application:

// ReactDOM.render(...): This function is used to render the application. It takes two arguments:

// The first argument is the JSX code wrapped in a "React.StrictMode" component. "StrictMode" is used to enable additional runtime checks in development mode.

// The second argument is the element in the HTML file where the React application should be rendered. In this case, it is the element with the ID "root".
