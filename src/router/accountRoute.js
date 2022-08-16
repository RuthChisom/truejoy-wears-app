const router = require('express').Router();
const controller = require('../controller/accountController');
const {authenticateAccount, checkIfAdmin, checkIfManager} = require('../middleware/authentication');

router
.get("/accounts", authenticateAccount, checkIfAdmin, controller.getAllAccounts)
.post("/register", controller.registerNewAccount)
.post("/login", controller.loginAccount)
.put("/:id", authenticateAccount, checkIfManager, controller.updateAccount)
.delete("/logout", controller.logoutAccount)
.delete("/:id", authenticateAccount, checkIfManager, controller.deleteAccount);

module.exports = router;