# Twitter

due to some issues between the integration with the backend and frontend I would advise that the backend API be tested using postman and the ID values I provide here for the users
of the system. also feel free to create your own users and test out their tweets and replies to each others comments. it works much better when tested out using postman without 
the ensuing mess in the frontend. 

http://localhost:5000/api/users/register ====> register request; request body = 
{
    "handle": "hossam420",
    "password": "123456",
    "email":"hossam420@gmail.com"

}

http://localhost:5000/api/users/getUser/:handle" ====> provide the handle of the user you wish to search for 

http://localhost:5000/api/users/getAllTweets" =====> gets all tweets in DB

http://localhost:5000/api/users/getTweet/:id =====> get tweet using tweet ID. to find tweet ID get the users and use one of their tweets

http://localhost:5000/api/users/writeTweet/:handle" ===> params is handle of user writing the tweet and the body is = {"text" = "here is the tweet"}

http://localhost:5000/api/users/Comment/:handle/:tweetID"  ====> write a comment on a tweet. you will need the ID of the tweet you wish to comment on and the handle of the user
making the comment the body is identical to the body of (writeTweet)
