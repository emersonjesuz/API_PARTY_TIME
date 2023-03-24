const mongosse = require("mongoose");


async function main(){
    try{
       mongosse.set("strictQuery", true)

       await mongosse.connect(
        "mongodb+srv://josiemerson2013:Angelita1@cluster0.yspedgg.mongodb.net/?retryWrites=true&w=majority"
        )
       
    } catch(error){
        console.log(error)
    }

}
module.exports = main;

