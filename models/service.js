const mongosse = require("mongoose")

const {Schema} = mongosse;

const servicesSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: true
    },
    image:{
        type: String,
        required: true
    },
},{timestamps: true});

const service = mongosse.model("service", servicesSchema);

module.exports = {
    service,
    servicesSchema
}