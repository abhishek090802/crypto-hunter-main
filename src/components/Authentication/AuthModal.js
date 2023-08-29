// This is a React component called AuthModal that implements a login and sign-up modal using Material-UI components. Let's go through the code step-by-step:

import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { Button, Tab, Tabs, AppBar, Box } from "@material-ui/core";
import Signup from "./Signup";
import Login from "./Login";
import { useState } from "react";
import { CryptoState } from "../../CryptoContext";
import { auth } from "../../firebase";
import GoogleButton from "react-google-button";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

// The component imports various Material-UI components and hooks required for its functionality.


const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    width: 400,
    backgroundColor: theme.palette.background.paper,
    color: "white",
    borderRadius: 10,
  },
  google: {
    padding: 24,
    paddingTop: 0,
    display: "flex",
    flexDirection: "column",
    textAlign: "center",
    gap: 20,
    fontSize: 20,
  },
}));

// The makeStyles function from Material-UI is used to create custom styles for the component.

export default function AuthModal() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
// The component uses the useState hook to manage the open state, which controls the visibility of the modal.


  const { setAlert } = CryptoState();
// The CryptoState function is called to retrieve the setAlert function from the context.

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
// The handleOpen and handleClose functions are used to open and close the modal, respectively.

  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
// The value state and handleChange function are used to manage the currently selected tab (either login or sign-up).


  const googleProvider = new GoogleAuthProvider();
// A Google authentication provider (googleProvider) is created using the Firebase authentication API.


  const signInWithGoogle = () => {
    signInWithPopup(auth, googleProvider)
      .then((res) => {
        setAlert({
          open: true,
          message: `Sign Up Successful. Welcome ${res.user.email}`,
          type: "success",
        });

        handleClose();
      })
      .catch((error) => {
        setAlert({
          open: true,
          message: error.message,
          type: "error",
        });
        return;
      });
  };

// The signInWithGoogle function is used to sign in the user using Google authentication. It triggers a popup for Google sign-in and handles the success and error cases.


  return (
    <div>
      <Button
        variant="contained"
        style={{
          width: 85,
          height: 40,
          marginLeft: 15,
          backgroundColor: "#EEBC1D",
        }}
        onClick={handleOpen}
      >
        Login
      </Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <AppBar
              position="static"
              style={{
                backgroundColor: "transparent",
                color: "white",
              }}
            >
              <Tabs
                value={value}
                onChange={handleChange}
                variant="fullWidth"
                style={{ borderRadius: 10 }}
              >
                <Tab label="Login" />
                <Tab label="Sign Up" />
              </Tabs>
            </AppBar>
            {value === 0 && <Login handleClose={handleClose} />}
            {value === 1 && <Signup handleClose={handleClose} />}
            <Box className={classes.google}>
              <span>OR</span>
              <GoogleButton
                style={{ width: "100%", outline: "none" }}
                onClick={signInWithGoogle}
              />
            </Box>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}

// The component renders a button with the label "Login." When clicked, it opens the modal.

// The modal is implemented using the Modal, Backdrop, and Fade components from Material-UI. It contains an AppBar with two tabs, one for login and the other for sign-up. The content of the modal is conditionally rendered based on the selected tab using the value state.

// When the Google sign-in button is clicked, it triggers the signInWithGoogle function.


// Overall, this component provides a simple login and sign-up modal, with the option to sign in with Google using Firebase authentication. When the user successfully signs in or signs up, a success message is displayed using the setAlert function from the context. If there is an error during the sign-in process, an error message is displayed.
