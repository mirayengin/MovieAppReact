import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/system/Stack";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CreateUser, singWithGoogle } from "../auth/firebase";
import { AuthContext } from "../contex/GlobalContext";



const Register = () => {
  const navigate = useNavigate();
  const [firstName, setfirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setCurrentUser } = useContext(AuthContext);
  const [message, setMessage] = useState("");

  const handleCreate = (e) => {
    e.preventDefault();
    const displayName = `${firstName} ${lastName}`;

    console.log("displayName", displayName);
    CreateUser(
      email,
      password,
      navigate,
      displayName,
      setCurrentUser,
      setMessage
    );
    // loginStatus()
  };

  //?Google ile giriş

  const handleGoogle = () => {
    singWithGoogle(navigate);
  };

  return (
    <Box
      className="registerdiv"
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
        }}
      >
        <Box sx={{display:"flex", justifyContent:"center" }}>
          <TextField
            required
            onChange={(e) => setfirstName(e.target.value)}
            value={firstName}
            sx={{ textAling: "center",background:"white"}}
            error
            id="standard-error-helper-text"
            label="FirstName"
            variant="standard"
            type="text"
          />
        </Box>
        <Box sx={{display:"flex", justifyContent:"center" }}>
          <TextField
            required
            // warning="true"
            onChange={(e) => setLastName(e.target.value)}
            value={lastName}
            sx={{ textAling: "center",background:"white" }}
            error
            id="standard-error-helper-text1"
            label="LastName"
            variant="standard"
            type="text"
          />
        </Box>
        <Box sx={{display:"flex", justifyContent:"center" }}>
          <TextField
            required
            // warning="true"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            sx={{ textAling: "center",background:"white" }}
            error
            id="standard-error-helper-text2"
            label="Email"
            variant="standard"
            type="email"
          />
        </Box>

        <Box sx={{display:"flex", justifyContent:"center" }}>
          <TextField
            required
            error
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            id="standard-error-helper-text3"
            label="Password"
            helperText={message}
            variant="standard"
            type="password"
            sx={{background:"white"}}
          />
        </Box>

        <Stack spacing={2} direction="row" mt={4} justifyContent="center">
          <Button sx={{backgroundColor:"crimson",fontWeight:"bold", "&:hover":{backgroundColor:"white", color:"crimson"}}} onClick={handleCreate} variant="contained" type="submit">
            CREATE ACCOUNT
          </Button>
          <Button sx={{border:"solid 2px white", color:"crimson", "&:hover": {background:"crimson", color:"white", border:"none"}}} onClick={handleGoogle} variant="outlined">
            COUNTUNE WİTH GOOGLE
          </Button>
        </Stack>
      </Box>
    </Box>
  );
};

export default Register;
