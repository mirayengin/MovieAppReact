import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/system/Stack";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { resetPassword, SingInUser } from "../auth/firebase";
import LoginFoto from "../assets/login.jpg";
// import { Typography } from "@mui/material";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");

  const hangleSingin = () => {
    SingInUser(email, password, navigate, setError, setMessage);
    setPassword("")
    setEmail("")
  };

  const handleResetPassword = () => {
    resetPassword(email, setError, setMessage);
  };

  return (
    <div className="logindiv">
      <Box
        sx={{
          height: "90vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { m: 1, width: "25ch" },
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}

        >
          <div>
            <TextField
              sx={{ border: "none", color:"white" }}
              error
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              
              label="Email"
              type="email"
              color=""
            />
          </div>

          <div>
            <TextField
              error
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              warning
              
              label="Password"
              helperText={message}
             
              type="password"
            />
          </div>

          <Stack spacing={2} direction="row" mt={4} justifyContent="center">
            <Button sx={{backgroundColor:"red", "&:hover": {background:"black", color:"white"}}} onClick={hangleSingin} variant="contained">
              LOGİN
            </Button>
            <Button sx={{backgroundColor:"red",color:"white",border:"none", "&:hover": {background:"black", color:"white",border:"none"}}} onClick={(e) => navigate("/register")} variant="outlined">
              REGİSTER
            </Button>
            {error && (
              <Button sx={{backgroundColor:"red",color:"white",border:"none", "&:hover": {background:"black", color:"white",border:"none"}}} onClick={handleResetPassword} variant="outlined">
                Forget Password
              </Button>
            )}
          </Stack>
          {/* <Typography variant="h5" component="p">{ message}</Typography> */}
        </Box>
      </Box>
    </div>
  );
};

export default Login;
