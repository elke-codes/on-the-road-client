
# Wayward

Wayward is for people who move around, connect and love to reconnect, who are interested in the social, and less in the media.

Current functionality:
- register for an account
- login to an account
- add friends existing in database (currently json file)
- view a map with your friends locations (geolocation api)
- friendcard that has : 
    - the city and country they are in (obtained through reverse geocoding)
    - calculated distance between you and your friendcard
- private chat (socket.io)


## Acknowledgements

 - Big thanks to all the educators and TA's at BrainStation for igniting my passion 
   and love for Web Development.

## Project Structure
/ - landing page with register/login for anonymous user, access to about page
/users/register - register a new user (also gets their location and stores city and location(through reverse geocoding))
/users/login - logs in a user
/users - returns all users
/users/userName - returns logged in user
/users/:loggedInUserID/friends - returns logged in users' friends
/users/:loggedInUserID/:friendToFind - returns friend if found in DB
/chat/:loggedInUserID/:roomID - get messages between two users



## Authors

- [@elke-codes](https://www.github.com/elke-codes)


## Deployment

To deploy this project run

```bash
  cd client
  npm start

  cd.. 
  cd server
  npm start
```


