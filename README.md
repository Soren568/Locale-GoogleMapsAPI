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

<img width="800" alt="Screen Shot 2021-11-19 at 2 04 22 PM" src="https://user-images.githubusercontent.com/85842462/142691465-991b0d90-b585-4dda-bffb-18018d8d248a.png">

<img width="800" alt="Screen Shot 2021-11-19 at 2 06 14 PM" src="https://user-images.githubusercontent.com/85842462/142691644-6762898d-da16-48c3-949e-ec37b30a116f.png">
