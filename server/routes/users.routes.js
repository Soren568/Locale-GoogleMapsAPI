const UserController = require("../controllers/user.controller");
const { authenticate } = require('../config/jwt.config');
const RecController = require("../controllers/recreation.controller");

module.exports = app => {
    app.get("/api/users/", authenticate, UserController.findAllUsers);
    app.get("/api/users/:id", authenticate, UserController.findOneUser);
    app.put("/api/users/:id", authenticate,  UserController.updateUser);
    app.post("/api/users/", UserController.createUser);
    app.post("/api/login", UserController.login);
    app.delete("/api/users/:id", authenticate, UserController.deleteUser);
    app.post("/api/rec", RecController.basicGet);
    app.post("/api/rec/singleGet", RecController.singleGet)
    app.put("/api/users/:id/addfavstar", authenticate, UserController.addFavStar);
    app.put("/api/users/:id/removefavstar", authenticate, UserController.removeFavStar);
};