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
    businessId: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: false
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
    customerFeedback: [
        {
            customerEmail: { type: String, required: true },
            dateResponded: { type: Date, default: Date.now() },
            feedbackText: { type: String, required: false },
            feedbackStars: { type: Number, required: false }
        }
    ],
    emailQueue: [
        {
            name: { type: String, required: true },
            datePurchased: { type: String, required: true },
            email: { type: String, required: true },
        }
    ],


    Savedjobs: [String]
});

//Export the model and give a name to as a parameter this will be your blue print
module.exports = mongoose.model('User', userSchema);