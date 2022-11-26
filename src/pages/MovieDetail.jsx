import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import CardActions from "@mui/material/CardActions";

import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const MovieDetail = () => {
  const navigate = useNavigate();
  const [film, setFilm] = useState([]);
  const { id } = useParams();

  const newFilm = id.replace(":", "");
  // console.log(newFilm);

  const API_KEY = process.env.REACT_APP_TMDB_KEY;
  const url = `https://api.themoviedb.org/3/movie/${newFilm}?api_key=${API_KEY}`;
  const { vote_average, title, overview, poster_path } = film;

  const getFilm = async () => {
    try {
      const { data } = await axios(url);
      console.log(data);
      setFilm(data);
    } catch (error) {
      console.log(error);
    }
  };


  useEffect(() => {
    getFilm();
  }, []);

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
    <div className="detailDiv">
      <Grid
        container
        // spacing={1}
        sx={{ p: 5, display: "flex", justifyContent: "center" }}
      >
        <Grid container key={id} item xs={12} sm={6} md={4} lg={3}>
          {/* <Card  sx={{position:"relative",display:"flex", justifyContent:"end", alignItems:"center", flexDirection:"column"}}> */}
          <Card id="hoverPlace" sx={{ position: "relative", backgroundColor:"grey", width:"360px", }}>
            <CardMedia
              component="img"
              alt="green iguana"
              height="420"
              image={`https://image.tmdb.org/t/p/w1280${poster_path}`}
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
                <Typography gutterBottom variant="h5" component="div">
                  {title}
                </Typography>
                <Typography
                  sx={{
                    paddingX: "0.2rem",
                    width: "2rem",
                    textAlign: "center",
                  }}
                  variant="h6"
                  component="div"
                >
                  <span style={{padding:"0.2rem", borderRadius:"1rem"}} className={`tag ${getVoteClass(vote_average)}`}> {vote_average && vote_average.toFixed(1)}</span>
                  {/* {vote_average && vote_average.toFixed(1)} */}
                </Typography>
              </Box>
              <Typography
                id="overview"
                sx={{
                  position: "absolute",
                  backgroundColor: "rgba(255, 255, 255, 0.7)",
                  color: "#000",
                  bottom: "126px",
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
                // color="text.secondary"
              >
                {overview}
              </Typography>
            </CardContent>
            <CardActions
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "end",
              }}
            >
              <Button
                onClick={(e) => navigate(-1)}
                sx={{background:"crimson", color:"white",fontWeight:"bold", "&:hover":{background:"white", color: "red"} }}
                size="small"
              >
                Go Back
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default MovieDetail;
