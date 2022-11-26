import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import React, { useContext } from "react";
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contex/GlobalContext";
import Hata from "../assets/hata.png"
 
const MovieCard = ({ randomFilms }) => {
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);
  console.log("cuurentUser card:>> ", currentUser);

  const getVoteClass = (vote) => {
    if (vote >= 8) {
      return "green";
    } else if (vote >= 6) {
      return "yellow";
    } else {
      return "red";
    }
  };
  

  return (
    <Grid container spacing={4} sx={{ mt: 2, p: 5 }}>
      {randomFilms?.map((item) => {
        const { vote_average, title, poster_path, overview, id } = item;
        return (
          <Grid item container key={id} xs={12} sm={6} md={4} lg={3}>

            <Card
             id="hoverPlace"
              sx={{
                width:"360px",
                position: "relative",
                overflow: "hidden",
                boxShadow: "5px 5px 5px 5px white",
                borderRadius: "15px",
                background: "grey",
              }}
            >
              <CardMedia
              
                component="img"
                alt="Foto Yüklenmedi"
                height="480"
                image={poster_path ? `https://image.tmdb.org/t/p/w1280${poster_path}`: `https://cdn.pixabay.com/photo/2014/04/03/00/28/ladybug-308408_960_720.png` }
              />
              <CardContent>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    height: "3rem",
                  }}
                >
                  <Typography
                    sx={{ color: "white", mt: 2 }}
                    gutterBottom
                    variant="h5"
                    component="div"
                  >
                    {title}
                  </Typography>
                  {currentUser.email !== "" && (
                    <Typography
                      sx={{
                        paddingX: "0.2rem",
                        width: "2.5rem",
                        textAlign: "center",
                      }}
                      variant="h6"
                      component="span"
                    >
                      <span style={{padding:"0.2rem", borderRadius:"1rem"}} className={`tag ${getVoteClass(vote_average)}`}> {vote_average && vote_average.toFixed(1)}</span>
                    </Typography>
                  )}
                </Box>
                <CardActions>
                  <Typography
                    id="overview"
                    sx={{
                      position: "absolute",
                      backgroundColor: "rgba(255, 255, 255, 0.7)",
                      color: "#000",
                      bottom: "133px",
                      left: "0",
                      right: "0",
                      overflow: "auto",
                      maxHeight: "100%",
                      padding: "1rem",
                      transform: "translateX(100%)",
                      transition: "transform 0.3s ease-in-out",
                    }}
                    variant="body2"
                    component="div"
                    color="text.secondary"
                  >
                    {overview}
                  </Typography>
                </CardActions>
              </CardContent>
              <CardActions
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "end",
                }}
              >
                <Button
                  onClick={(e) => navigate(`details/:${id}`)}
                  sx={{
                    backgroundColor: "red",
                    color: "white",
                    fontWeight: "bold",
                    "&:hover": {
                      backgroundColor: "white",
                      color: "red",
                      fontWeight: "bold",
                    },
                  }}
                  size="small"
                >
                  Detail
                </Button>
              </CardActions>
            </Card>
          </Grid>
        );
      })}
    </Grid>
  );
};

export default MovieCard;
