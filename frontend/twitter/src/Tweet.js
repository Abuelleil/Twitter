import React, { useState, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Grid } from "@mui/material";
import Button from "@mui/material/Button";
import axios from "axios";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import TweetCard from "./TweetCard";
function Tweet() {
  const [tweet, setTweet] = useState("");
  const [error, setError] = useState(false);
  const [character, setCharacter] = useState(280);
  const [allUsers, setAllUsers] = useState([{}]);
  function handleAll(e) {
    var x = e;
    setAllUsers(x);
  }
  function createTweet() {
    axios({
      method: "post",
      url: `http://localhost:5000/api/users/writeTweet`,
      data: {
        text: tweet,
      },
    })
      .then((res) => {})
      .catch((err) => {
        console.log(err);
      });
  }
  function handleTweet(e) {
    var x = e.target.value;
    setCharacter(280 - x.length);
    setError(false);
    if (x.length > 280) {
      setError(true);
      return;
    }
    setTweet(x);
  }
  function getAllTweets() {
    axios({
      method: "get",
      url: `http://localhost:5000/api/users/getAllTweets`,
    })
      .then((res) => {
        handleAll(res.data.data);
        // console.log(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    getAllTweets();
  }, []);

  return (
    <Grid
      container
      display="flex"
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
    >
      <Box
        sx={{
          display: "flex",
          width: "100%",
          justifyContent: "center",
        }}
        margin="15px"
        padding="50px"
      >
        <TextField
          error={error}
          id="outlined-textarea"
          label="What is on your Mind ?"
          multiline
          sx={{
            width: "50%",
          }}
          margin="normal"
          display="flex"
          fullWidth
          value={tweet}
          helperText={
            "character limit for a tweet is 280, remaining characters " +
            character
          }
          onChange={handleTweet}
        />
        <Button
          onSubmit={createTweet}
          sx={{
            textTransform: "capitalize",
            marginTop: "15px",
            padding: "6px",
            marginLeft: "10px",
            width: "140px",
            height: "55px",
          }}
          size="small"
          variant="contained"
        >
          Tweet It
        </Button>
      </Box>
      {allUsers.map((tweets) => (
        <TweetCard tweets={tweets} />
      ))}
    </Grid>
  );
}

export default Tweet;
