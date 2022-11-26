import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
// import SendIcon from "@mui/icons-material/Send";
import MovieCard from "../components/MovieCard";
import axios from "axios";
import SearchIcon from "@mui/icons-material/Search";

const Main = () => {
  const [selectInput, setSelectInput] = useState("");
  const [randomFilms, setRandomFilms] = useState([]);
  const [page, setPage] = useState(1);
  console.log("page :>> ", page);

  console.log(selectInput);

  const API_KEY = process.env.REACT_APP_TMDB_KEY;
  // console.log(API_KEY);
  const RandomUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&page=${page}`;

  const selectUrl = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${selectInput}`;

  //! Sayfa ilk açılınca
  const getRandomFilm = async () => {
    const { data } = await axios(RandomUrl);
    setRandomFilms(data.results);
  };

  useEffect(() => {
    getRandomFilm();
  }, []);

  useEffect(() => {
    getRandomFilm();
  }, [page]);

  //!Search yaptığımızda
  const handleSearch = () => {
    getSelectFilm();
    setSelectInput("");
  };

  const getSelectFilm = async () => {
    const { data } = await axios(selectUrl);
    setRandomFilms(data.results);
  };

  //? Sayfaya göre filmler

  const handlePage = () => {
    if (page === 1 || page < 0) {
      return setPage(1);
    } else {
      return setPage(page - 1);
    }
  };

  return (
    <div className="mainDiv">
      <Box
        spacing={2}
        sx={{
          textAlign: "center",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          pt: 4,
        }}
      >
        <TextField
          onChange={(e) => setSelectInput(e.target.value)}
          size="medium"
          sx={{
            width: "20%",
            border: "none",
            backgroundColor: "white",
            boxShadow: "1rem 1rem 1rem 3rem yellow",
          }}
          label="Search"
          type="search"
          value={selectInput}
          error
        />
        <Button
          className=""
          sx={{
            ml: 4,
            backgroundColor: "red",
            color: "white",
            fontWeight: "bold",
            boxShadow: "1rem 1rem 1rem 3rem yellow",
            "&:hover": { background: "white", color: "red" },
          }}
          size="large"
          // variant="contained"
          endIcon={<SearchIcon />}
          onClick={handleSearch}
        >
          Send
        </Button>
      </Box>

      <MovieCard randomFilms={randomFilms} />
      <Box sx={{display:"flex", justifyContent:"center",alignItems:"center",gap:5 }}>
        <Box>
          <Button sx={{"&:hover":{boxShadow:"5px 5px 5px 5px white"}}} color="error" variant="contained" onClick={handlePage} type="text">
            BACK
          </Button>
        </Box>
        <Box>
          <Button sx={{"&:hover":{boxShadow:"5px 5px 5px 5px white"}}} color="success" variant="contained" onClick={() => setPage(page + 1)} type="text">
            NEXT
          </Button>
        </Box>
      </Box>
    </div>
  );
};

export default Main;
