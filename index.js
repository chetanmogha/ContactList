const express = require('express');
const path = require('path');
const port = 8000;

const db=require('./config/mongoose')
const Contact=require('./models/contact')
const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded());
app.use(express.static('assets'));


    

app.get('/', function(req, res){

    Contact.find({},(error,contacts)=>{
        if(error){
            console.log("Error while getting contacts from DB")
            return;
        }

        return res.render('home',{
            title: "Contact List",
            contact_list: contacts
        });
    })

    
})

app.post("/create-contact",(req,res)=>{
    

    Contact.create({
        name:req.body.name,
        phone:req.body.phone
    }, (error,newContact)=>{
        if(error){
            console.log("Error while creating contact list")
            return;
        }
        console.log(newContact)
        res.redirect('back');
    })
    
})

app.get("/delete-contact/",(req,res)=>{

    // getting the id from the parameter
    const id=req.query.id;
    // find the contact using  id in the DB

    Contact.findByIdAndDelete(id,(error)=>{
        if(error){
            console.log("Error while deleting the contact")
            return;
        }
        res.redirect('back');

    })
  
})

app.listen(port, function(err){
    if (err) {
        console.log("Error in running the server", err);
    }
    console.log('Server is running at Port', port);
})