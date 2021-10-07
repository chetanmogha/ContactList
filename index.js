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

var contactList = [
    {
        name: "Arpan",
        phone: "1111111111"
    },
    {
        name: "Tony Stark",
        phone: "1234567890"
    },
    {
        name: "Coding Ninjas",
        phone: "12131321321"
    }
]

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
    // contactList.push({
    //     name:req.body.name,
    //     phone:req.body.phone
    // })

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
    // const contactIndex=contactList.findIndex(contact => contact.phone==phone);
    // if(contactIndex!=-1){
    //     contactList.splice(contactIndex,1);
    // }
   
})

app.listen(port, function(err){
    if (err) {
        console.log("Error in running the server", err);
    }
    console.log('Yup!My Server is running on Port', port);
})