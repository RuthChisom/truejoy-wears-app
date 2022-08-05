const Account = require("../model/Account");
const bcrypt = require("bcrypt");
const { createToken } = require("../services/jwtService");

// register a new account
exports.registerNewAccount = (req, res) => {
    // try{
        // get account details from request body and check if a account with this username exists
        Account.findOne({userName: req.body.userName}, (err, existingAccount) => {
            if(err){
                console.error(err);
                return res.status(500).json({message: "An error occured! Please try again later!"});
            }
            if(existingAccount){
                return res.status(400).json({message: "An account with this username already exists!!"});
            }
        })
         // create a new account
        let created = Account.create(req.body, (err, newAccount) => {
            if(err){
                console.error(err);
                return res.status(500).json({message: "An error occured! Please try again later!"});
            }
            // hash account's password
            bcrypt.genSalt(10, (err, salt) =>{
                if(err){
                    console.error(err);
                    return res.status(500).json({message: "Failed to salt password!"});
                }
                bcrypt.hash(req.body.password, salt, (err, hashedPassword) => {
                    if(err){
                        console.error({err});
                        return res.status(500).json({message: "Failed to hash password!"});
                    }
                    // save password to db
                    newAccount.password = hashedPassword;
                    newAccount.save((err, savedAccount) => {
                        if(err){
                            console.error({err});
                            return res.status(500).json({message: "Failed to save account password!"});
                        }
                    })
                    // create jwt token for account
                    let token = createToken(newAccount);
                    if(!token){
                        return res.status(500).json({message: "Failed to sign token!"});
                    }
                    // send token to account
                    console.log(token)
                    return res.status(200).json({
                        message: "Account Registration Successful",
                    })
                })
            })
        });
}

// get all accounts
exports.getAllAccounts = async(req, res) => {
    try{
        let listed = await Account.find();
        if(listed.length === 0){
            return res.status(404).json({
                success: false,
                message: "No Account was found"
            });
        }
        res.status(200).json({
            success: true,
            message: "Accounts Found!",
            accounts: listed
        })
    }catch(error){
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error!"
        })
    }
}

exports.loginAccount = (req, res) =>{
    // check if account exists
    Account.findOne({userName: req.body.userName}, (err, foundAccount) => {
        if(err){
            console.error({err});
            return res.status(500).json({message: "Failed to sign token!"});
        }
        if(!foundAccount){
            return res.status(401).json({message: "Username Not Found!!"})
        }
        // check if password is correct - we cannot compare the password with equals because it is hashed
        let match = bcrypt.compareSync(req.body.password, foundAccount.password);
        if(!match){
            return res.status(401).json({message: "Incorrect Password"})
        }
        // create jwt token for account
        let token = createToken(foundAccount);
        if(!token){
            console.error({err});
            return res.status(500).json({message: "Failed to sign token!"});
        }
        return res.status(200).json({
            message: "Logged In Successfully",
            token
        })
    })
    
}

// update an account
exports.updateAccount = async(req, res) => {
    try{
        let id = {_id: req.params.id};
        let updated = await Account.findOneAndUpdate(id, req.body ,{new: true});
        if(!updated){
            return res.status(404).json({
                success: false,
                message: "Account not Updated"
            });
        }
        res.status(200).json({
            success: true,
            message: "Account Updated!",
            account: updated
        })
    }catch(error){
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error!"
        })
    }
}

// delete account
exports.deleteAccount = async(req, res) => {
    try{
        let id = {_id: req.params.id};
        let deleted = await Account.findOneAndRemove(id);
        if(!deleted){
            return res.status(404).json({
                success: false,
                message: "Account not Deleted"
            });
        }
        res.status(200).json({
            success: true,
            message: "Account Successfully Deleted!",
            account: deleted
        })
    }catch(error){
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error!"
        })
    }
}

// get single book
// exports.getBook = async(req, res) => {
//     try{
//         let id = {_id: req.params.id};
//         let found = await Book.findOne(id);
//         if(!found){
//             return res.status(404).json({
//                 success: false,
//                 message: "Book not found"
//             });
//         }
//         res.status(200).json({
//             success: true,
//             id:id,
//             message: "Book Found!",
//             book: found
//         })
//     }catch(error){
//         console.error(err);
//         res.status(500).json({
//             success: false,
//             message: "Internal Server Error!"
//         })
//     }
// }