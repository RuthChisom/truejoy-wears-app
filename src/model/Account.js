const {Schema, model} = require('mongoose');

const accountSchema = new Schema({
    firstName: {type: String, required:true},
    lastName: {type: String, required:true},
    userName: {type: String, required:true},
    password: {type: String, required:true},
    role: {type: String, enum: ["user", "staff", "manager", "admin"], required:true},
    gender: {type: String, enum: ["male", "female"]},
},
{timestamps:true}
);

const accountModel = model("accounts", accountSchema);

module.exports = accountModel;