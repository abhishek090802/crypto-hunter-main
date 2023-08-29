// The SelectButton is a custom React component that renders a selectable button with specific styles. It takes the following props:


import { makeStyles } from "@material-ui/core";

const SelectButton = ({ children, selected, onClick }) => {

  // children: The content to be displayed inside the button, which can be any valid React elements, such as text or icons.

  // selected: A boolean value that determines whether the button should be visually selected (highlighted) or not.

  // onClick: A callback function that will be executed when the button is clicked.

  // Here's a breakdown of the component:

  const useStyles = makeStyles({
    selectbutton: {
      border: "1px solid gold",
      borderRadius: 5,
      padding: 10,
      fontFamily: "Montserrat",
      cursor: "pointer",
      backgroundColor: selected ? "gold" : "",
      color: selected ? "black" : "",
      fontWeight: selected ? 700 : 500,
      "&:hover": {
        backgroundColor: "gold",
        color: "black",
      },
      width: "23%",
      textAlign: "center",
    },
  });

  //  The SelectButton component uses the makeStyles function from @material-ui/core to define custom styles for the button. The styles are defined using an object with CSS properties.

// The selectbutton style is applied to the button. It includes properties such as border, border radius, padding, font family, cursor, background color, text color, font weight, and hover styles to change the appearance of the button based on its selected state.


  const classes = useStyles();
// The useStyles hook is called to get the classes object that contains the generated CSS classes based on the defined styles.


  return (
    <span onClick={onClick} className={classes.selectbutton}>
      {children}
    </span>
  );
};
// The component returns a <span> element that acts as the button. The onClick prop is attached to the <span> element to handle click events.

// The className attribute of the <span> element is set to the CSS class selectbutton from the classes object, which applies the custom styles to the button based on its selected state.

// The content of the button (children) is rendered inside the <span> element.

export default SelectButton;

// Overall, this SelectButton component provides a reusable button with custom styles that can be used in various parts of the application. It can visually indicate whether it is selected or not based on the selected prop and provides a callback (onClick) to handle click events on the button.
