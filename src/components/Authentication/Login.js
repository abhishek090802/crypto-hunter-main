// This is a React functional component named "Login" that represents a login form using Material-UI for styling. Let's go through the code step by step:

// The component imports various dependencies from different packages. The packages used here are:

import { Box, Button, TextField } from "@material-ui/core";
import { useState } from "react";
import { CryptoState } from "../../CryptoContext";
import { auth } from "../../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

// @material-ui/core/Box, @material-ui/core/Button, @material-ui/core/TextField: For Material-UI components used in the login form.
// react, useState: For managing component state.
// ../../CryptoContext: A custom context (not shown here) used for managing cryptocurrency-related state.
// ../../firebase: Firebase configuration and setup.
// firebase/auth: Firebase authentication method for signing in with email and password.


const Login = ({ handleClose }) => {
  // The functional component Login is defined. It takes a prop handleClose, which is a function to close the authentication modal when the login process is completed.

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  //  Inside the component, it uses useState to manage the state of the email and password fields (email and password).

  const { setAlert } = CryptoState();

  const handleSubmit = async () => {
    if (!email || !password) {
      setAlert({
        open: true,
        message: "Please fill all the Fields",
        type: "error",
      });
      return;
    }
  //  The component structure consists of a Box component that contains the login form elements. The form includes two TextField components for entering the email and password, and a Button for submitting the login details.

// The TextField components are used to capture the email and password input from the user. They are controlled components, and their values are updated using the email and password states and the onChange event handlers.

// The Button component is used to trigger the login submission. When clicked, it calls the handleSubmit function.


    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      setAlert({
        open: true,
        message: `Sign Up Successful. Welcome ${result.user.email}`,
        type: "success",
      });

// Inside the handleSubmit function, it checks if the email and password fields are filled. If either of them is empty, it sets an alert message using the setAlert method from the CryptoState context and returns without proceeding further.

// If both email and password fields are filled, it attempts to sign in with the provided credentials using the signInWithEmailAndPassword method from Firebase's auth object. If the login is successful, it sets a success message using the setAlert method and calls the handleClose function to close the authentication modal.


      handleClose();
    } catch (error) {
      setAlert({
        open: true,
        message: error.message,
        type: "error",
      });
      return;
    }
  };

  // if there is an error during the login process, it catches the error, sets an error message using the setAlert method, and returns without closing the modal.

  return (
    <Box
      p={3}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "20px",
      }}
    >
      <TextField
        variant="outlined"
        type="email"
        label="Enter Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        fullWidth
      />
      <TextField
        variant="outlined"
        label="Enter Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        fullWidth
      />
      <Button
        variant="contained"
        size="large"
        onClick={handleSubmit}
        style={{ backgroundColor: "#EEBC1D" }}
      >
        Login
      </Button>
    </Box>
  );
};

// Overall, this component provides a simple login form that captures the user's email and password, and it uses Firebase authentication to validate the user's credentials. It also displays appropriate success or error messages using the setAlert method from the CryptoState context.

export default Login;
