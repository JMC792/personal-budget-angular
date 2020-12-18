const mongoose = require('mongoose')

// validate its number 
// validate if the value has been passed 
// find by id --> document then id is found --> you may use this id  


const postSchema = new mongoose.Schema({
    id: {
        type: Number, 
        required: true,
        unique: true
    },
    name: {
        type: String, 
        trim: true, 
        required: true,
        uppercase: true
    },
    budget: {
        type: Number,
        required: true
    },
    color: {
        type: String,
        trim: true,
        required: true,
        unique: true
    }
}, {collection: 'PersonalBudgetCollection'})

module.exports = mongoose.model('PersonalBudgetCollection', postSchema)