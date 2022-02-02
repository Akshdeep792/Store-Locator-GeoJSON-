
const mongoose = require('mongoose');

const StoreSchema = new mongoose.Schema({
    storeName : {
        type: String,
        required: [true, 'Please add a store name'],
        unique: true,
        trim: true,
        maxlength: [10, 'Store Name must be less than 10 characters']
    },
    address:{
        type: String,
        required:[true, 'Please add Address']
    },
    location: {
        type: {
          type: String, // Don't do `{ location: { type: String } }`
          enum: ['Point'], // 'location.type' must be 'Point'
          required: true
        },
        coordinates: {
          type: [Number],
          index: '2dsphere',
        },
        formattedAddress: String
      }, 
      createdAt: {
          type: Date,
          default: Date.now
      }
})
module.exports = mongoose.model('Store', StoreSchema);