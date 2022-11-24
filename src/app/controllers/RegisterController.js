const Account = require("../models/Accounts");
class RegisterController{
    register(req, res, next){
        res.render("login/register");
    }

    store(req, res, next) {
        const account = new Account(req.body);
        account.role = 2;
        account.cart = [];
        account.save()
            .then(() => res.redirect("/login"))
            .catch(next);
    }
}

module.exports = new RegisterController();