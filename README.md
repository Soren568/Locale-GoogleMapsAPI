# Locale
### React, MongoDB, Node.js, Express
*note: Allowing location is necessary for proper use of the app*

Locale is a web-app developed for outdoor enthusiasts to find nearby recreation areas that include various activities from camping to off-highway-vehicle trails, swimming to wildlife viewing and much more. Complete with a backend express server, this app has full CRUD functionality with data-interaction between API fetch results and user saved locations utilizing MongoDB and Mongoose.

## Backend
All server side processes use Mongoose and MongoDB to manage model methods (only a user model in this project) in the controller and routes.

## Security
User passwords are encrypted with Bcrypt upon registration and users are assigned cookies storing JSON Web Tokens on both login and registration to minimize potential spams of api usage or malicious requests. 

## UI/UX
UI developed using TailwindCSS, daisyUI (a tailwind framework), and lottie-web to implement animations on the login page and account page. All of these helped to create a production level experience for the user with front-end validations on the login and registration page along with backend validations upon a failed request.

**Login page**
<img width="800" alt="Login" src="https://user-images.githubusercontent.com/85842462/142691465-991b0d90-b585-4dda-bffb-18018d8d248a.png">

**Registration**
<img width="800" alt="Register" src="https://user-images.githubusercontent.com/85842462/142691644-6762898d-da16-48c3-949e-ec37b30a116f.png">

**Dashboard with results rendered (including user favorites/stars/pins)**
<img width="800" alt="Dashboard with location results" src="https://user-images.githubusercontent.com/85842462/142691899-5d7e073d-0917-4394-a874-a72740f75aa8.png">

**Location information modal**
<img width="721" alt="Screen Shot 2021-11-19 at 2 15 23 PM" src="https://user-images.githubusercontent.com/85842462/142692649-93505fb2-a38d-4fb1-ba61-7f3d43dc710c.png">

**Account page**
<img width="800" alt="Account Page" src="https://user-images.githubusercontent.com/85842462/142692029-be055957-dcc0-42cf-b7bc-f9b67db4b0be.png">
