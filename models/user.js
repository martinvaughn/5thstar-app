/*********************************
 * THE USER SCHEMA -Represent the 
 * way that the job should be stored 
 * and what info is needed
 *********************************/

const mongoose = require('mongoose');


//Create Schema
const Schema = mongoose.Schema;
//Instantiate the Schema
const userSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    businessName: {
        type: String,
        required: true
    },
    reviewLink: {
        type: String,
        required: true
    },
    websiteLink: {
        type: String,
        required: false
    },
    businessEmail: {
        type: String,
        required: false
    },
    businessEmailName: {
        type: String,
        required: false
    },
    uploads: [
        {
            purchases: { type: Number, required: true },
            fileName: { type: String, required: true },
            status: { type: String, required: true },
            dateUploaded: { type: Date, default: Date.now() }

        }
    ],


    Savedjobs: [String]
});

//Export the model and give a name to as a parameter this will be your blue print
module.exports = mongoose.model('User', userSchema);