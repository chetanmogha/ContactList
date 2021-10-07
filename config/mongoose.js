const mongoose=require('mongoose') // require the library

mongoose.connect('mongodb://localhost/contacts_List_DB') //connecting with the database

const db=mongoose.connection; // get the connection to check connection

db.on('error',console.error.bind(console,'Error while connecting with DB')); // checking error 


// up and running DB
db.once('open',()=>{
    console.log("Database is connected successfully");
})