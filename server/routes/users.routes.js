const UserController = require("../controllers/user.controller");
const { authenticate } = require('../config/jwt.config');
const RecController = require("../controllers/recreation.controller");
const TestController = require("../controllers/test.controller")

module.exports = app => {
    // Find users for validation
    app.get("/api/users/", UserController.findAllUsers);
    app.get("/api/users/:id", authenticate, UserController.findOneUser);
    // Create, update, delete user
    app.post("/api/users/", UserController.createUser);
    app.put("/api/users/:id", authenticate, UserController.updateUser);
    app.delete("/api/users/:id", authenticate, UserController.deleteUser);
    // Login, logout
    app.post("/api/login", UserController.login);
    app.get("/api/logout", UserController.logout);
    // Favorite locations
    app.put("/api/users/:id/addfavstar", authenticate, UserController.addFavStar);
    app.put("/api/users/:id/removefavstar", authenticate, UserController.removeFavStar);

    // Recreation endpoints - basicGet finds all in given coords, singleGet finds info specific location
    app.post("/api/rec", RecController.basicGet);
    app.post("/api/rec/singleGet", RecController.singleGet)

    // Load testing
    app.get("/api/test1", TestController.createLargeArray)
};