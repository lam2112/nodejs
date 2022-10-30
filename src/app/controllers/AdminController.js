const Account = require("../models/Accounts");

const { mutipleMogooseObject } = require("../../util/mongoose");
const { NULL, render } = require("node-sass");

class AdminController {   
    adminIndex(req, res, next) {
        try {
            res.render("admin/adminIndex")
            
        } catch (error) {
            console.log(error)
        }
    }

    showUser(req, res, next){
        let AccountQuery = Account.find({});

        if (req.query.hasOwnProperty('_sort')){
            const isValidtype = ['asc', 'desc'].includes(req.query.type)
            AccountQuery = AccountQuery.sort({
                [req.query.column]: isValidtype ? req.query.type : 'default',
            })
        }

        AccountQuery
            .then((users) =>
                res.render("admin/show-users", {
                    users: mutipleMogooseObject(users),
                })
            )

            .catch(next);
    }
}

    


module.exports = new AdminController();
