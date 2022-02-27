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

function TweetCard({ tweets }) {
  const [comments, setComments] = useState([{}]);
  function handleAll(e) {
    var x = e;
    console.log(x);
    setComments(x);
  }
  function getAllComments(id) {
    axios({
      method: "get",
      url: `http://localhost:5000/api/users/getTweet/${id}`,
    })
      .then((res) => {
        console.log(res);
        handleAll(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    if (tweets.comment >= 1) {
      tweets.comment.map((comment) => getAllComments(comment));
    }
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        justifyContent: "center",
      }}
      margin="15px"
      padding="50px"
    >
      <Card
        sx={{
          width: "500px",
        }}
        margin="15px"
        padding="50px"
      >
        <Box display="flex">
          <Avatar
            sx={{ margin: "15px 5px 5px 15px" }}
            src="/broken-image.jpg"
          />
          <CardContent>
            <Typography variant="h6" color="#00acee">
              {tweets.author}
            </Typography>
          </CardContent>
        </Box>

        <CardContent>
          <Typography variant="body1">
            {tweets.text}
            <br />
          </Typography>
        </CardContent>

        <CardActions>
          <TextField
            id="outlined-textarea"
            label="Comment"
            variant="standard"
            sx={{
              margin: "5px 10px 5px 10px",
            }}
            margin="normal"
          />
          <Button
            sx={{
              alignSelf: "flex-end",
              marginBottom: "5px",
              textTransform: "autoCapitalize",
            }}
            size="small"
          >
            Comment
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
}

export default TweetCard;
