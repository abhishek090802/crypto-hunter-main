// Snack Component - https://material-ui.com/components/snackbars/

// This code defines a React component called Alert that implements a snackbar to display alert messages using Material-UI components.

// Here's how the Alert component works:

import { Snackbar } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import { CryptoState } from "../CryptoContext";

//  It imports the necessary components and functions from Material-UI and the CryptoContext module.

const Alert = () => {
  const { alert, setAlert } = CryptoState();
// The Alert component is a functional component that retrieves the alert state and setAlert function from the CryptoState context using the useContext hook. This allows the component to access and modify the alert state.


  const handleCloseAlert = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setAlert({ open: false });
  };
// The handleCloseAlert function is defined to handle the snackbar closing event. It checks the reason parameter to determine if the snackbar is being closed due to a click-away event. If so, it returns early, as the snackbar should not be closed in that case. Otherwise, it sets the open property of the alert state to false, effectively closing the snackbar.


  return (
    <Snackbar
      open={alert.open}
      autoHideDuration={3000}
      onClose={handleCloseAlert}
    >
      <MuiAlert
        onClose={handleCloseAlert}
        elevation={10}
        variant="filled"
        severity={alert.type}
      >
        {alert.message}
      </MuiAlert>
    </Snackbar>
  );
};

//The Snackbar component is used to render the snackbar container. It receives the open prop from the alert state to determine whether the snackbar should be displayed or hidden.

// The autoHideDuration prop is set to 3000, which means the snackbar will automatically disappear after 3000 milliseconds (3 seconds).

// The onClose prop is set to the handleCloseAlert function, which will be called when the snackbar is closed either by the user or when the auto-hide duration expires.

// Inside the Snackbar component, a MuiAlert component is rendered. This component is used to customize the appearance of the alert.

// The onClose prop of MuiAlert is also set to the handleCloseAlert function to ensure the snackbar is closed when the user clicks the "close" button on the alert.

// The elevation prop is set to 10, which controls the shadow depth of the alert.

// The variant prop is set to "filled", which displays the alert with a filled background.

// The severity prop is set to alert.type, which determines the color and icon of the alert based on the severity type (e.g., "error," "warning," "info," or "success").

// The content of the alert is set to alert.message, which will display the actual message content inside the alert.


export default Alert;

// Overall, this Alert component provides a simple and reusable way to display alert messages using a snackbar with various severity levels (e.g., error, warning, info, or success) using Material-UI's Snackbar and MuiAlert components.
