Simply traffic, traffic data app based on React.Js

By Selcuk Toklucu

# Front End
  Live Site: https://github.com/selcuktoklucu/simply-traffic
  Github: https://github.com/selcuktoklucu/simply-traffic


# Back End
  Live Site: https://safe-journey-34666.herokuapp.com/
  GitHub: https://github.com/selcuktoklucu/simply-traffic-api

Simply-traffic is an application which can be used in public areas to show traffic information of the environment.
Client is able to add some significant addresses to their building and show how long it would take to go that place in current traffic conditions
As well as price estimation from Uber.

# List of Technologies:
ReactJS.
Ruby on Rails
RestFul API Services
Third-Party API (Google Maps and UBER)
AWS S3 Bucket
Javascript
Cascading Style Sheets(CSS)
SaSS (SCSS)
Axios
Bootstrap
OpenURL
Git

# Development process and strategy

The scope of this project was to collect real-time traffic data from Google of two given addresses from client, and showing this information into a card based layout to the users.
In addition, I used Uber - a ride sharing company - API to collect estimated transfer fee for those two addreses. Development strategy structured from the Google Maps API
collecting the address information from it, getting longitude and latitude of that address and making a request to the Uber's API. Also collecting an overview of that trip and demonstrating on the application.

The application based on React JS front-end framework, which provides implementation of different views of the application on the same page. I was able to create the provided functionality as a SPA(single page application)

# Future feature additions - Unsolved Issues

Deployed application answers entire functionality. In future deployments, some features can be added for better User Experience, such as:

Sign In the user automatically after successful sign-up
Better visualization, such as having more than one pages, and changes automatically
Auto refreshing the live data in every couple minutes.gi

# Wireframes and user stories
![alt text](https://sei-roberto.s3.amazonaws.com/a5ffeebbac561a88f435f273bb1a8d0e)
As an unregistered user, I would like to sign up with email and password.
As a registered user, I would like to sign in with email and password.
As a signed in user, I would like to change password.
As a signed in user, I would like to sign out.
As a signed in user, I would to create traffic cards.
As a signed in user, I would to edit my traffic cards.
As a signed in user, I would to delete posts.
As a user, I want to see locations of starting end ending point on the map as markers.

### Screenshot of the Application

![alt text](https://sei-roberto.s3.amazonaws.com/54d49f0149f0f92de29d146b92a766cf)

Setup and installation instructions for the front end application

Note: This is a React.js application, please check React Documentation before starting.

### This Application uses three different Restful APIs:
1. Actual database API, which can be found in this link. Make sure to setup this API first and configure to use in your front end.
2. Google Maps API, find the documentation [Here](https://developers.google.com/maps/documentation/maps-static/intro)
3. Uber API, find the documentation [Here](https://developer.uber.com/docs/riders/guides/authentication/introduction)


Fork and clone this repository.
1. Empty README.md and fill with your own content.
2. Replace simply-traffic in package.json with your projects name.
3. Replace the "homepage" field in package.json with your Github account name and repository name.
4. Install dependencies with npm install.
5. Get a new Google API KEY from Google Developers Console and change the one in the link, given at the bottom of the App.js 6. file of this repository.
7. Don't forget to enable Google Maps API services from Google Dev. Console as explained in Google Maps API docs.
8. git add and git commit your changes.
9. Run the database api by entering bin/rails server command in shell (in api's directory)
10. Run npm start in shell to start the app
