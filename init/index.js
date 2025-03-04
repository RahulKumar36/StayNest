const mongoose = require("mongoose")
const initdata = require("./data.js")
const Listing = require("../models/listing.js")

const MONGO_URL = ""

main()
.then((res)=>{
   console.log("database connected")
}).catch((err)=>{
   console.log(err)
})
async function main() {
    await mongoose.connect(MONGO_URL)
}

const initDB = async () =>{
     await Listing.deleteMany({})
    initdata.data = initdata.data.map((obj)=>({...obj, owner :"67becd95f35eac8a7d033faf"}))
    await Listing.insertMany(initdata.data)
    console.log("data was initialized")
}

initDB();