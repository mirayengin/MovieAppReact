import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contex/GlobalContext";
import { useContext } from "react";
import { LogoutSingUser } from "../auth/firebase";

function Navbar() {
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);

  console.log("navbar: ", currentUser);


  const handleLogout = (e) => {
    LogoutSingUser(navigate)
    // navigate("/")
  }






  return (
    <AppBar sx={{ maxWidth: "100rem", backgroundColor:"ActiveBorder" }} position="static">
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          paddingX: "2rem",
        }}
      >
        <Typography
          onClick={(e) => navigate("/")}
          variant="body2"
          sx={{
            // fontWeight:"bold",
            display: "flex",
            alignItems: "center",
            cursor: "pointer",
            minWidth: "3rem",
            color: "red",
            fontWeight: "bold",
            fontSize:"1rem"
          }}
        >
          Firebase Movie App
        </Typography>

        {!currentUser?.email ? (
          <Box sx={{ display: "flex", columnGap: "1rem" }}>
            <Button
              onClick={(e) => navigate("/login")}
              sx={{ my: 2 , fontWeight:"bold", color: "white", display: "block",fontSize:"1rem" }}
            >
              LOGİN
            </Button>
            <Button
              sx={{ my: 2 , fontWeight:"bold", color: "white", display: "block" ,fontSize:"1rem"}}
              onClick={(e) => navigate("/register")}
            >
              REGİSTER
            </Button>
          </Box>
        ) : (
          <Box sx={{ display: "flex", columnGap: "1rem" }}>
              <Typography variant="h3" component="h6" sx={{ color:"red" , fontWeight:"bold",fontSize:"1rem", display:"flex", alignItems:"center", justifyContent:"end"}}>
                {currentUser.displayName}
            </Typography>
            <Button
              sx={{ my: 2, color: "red", fontWeight:"bold", display: "block",fontSize:"1rem" }}
              onClick={handleLogout}
            >
              LOGOUT
            </Button>
          </Box>
        )}
      </Box>
    </AppBar>
  );
}
export default Navbar;
