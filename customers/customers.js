const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.json());

const mongoose = require("mongoose");

require("./Customer");
const Customer = mongoose.model("Customer")

mongoose.connect("mongodb+srv://Kunal:QUStbuTfQSxM4TLC@cluster1.ia3gg.mongodb.net/?retryWrites=true&w=majority", () => {
    console.log("Database is connected!");
})

app.get('/', (req, res) => {
    res.send("This is our customer end point!!");
})


app.post("/customer", (req, res) => {
    // console.log(req.body)
    var newCustomer = {
        name: req.body.name,
        age: req.body.age,
        address: req.body.address,
    }

    var customer = new Customer(newCustomer)

    customer.save().then(() => {
        console.log("New customer created!")
    }).catch((err) => {
        if(err) {
            throw err;
        }
    })

    res.send("Testin route!")
})

app.get("/customers", (req, res) => {
    Customer.find().then((customers) => {
        res.json(customers)
    }).catch(err => {
        if(err) {
            throw err;
        }
    })
})


app.get("/customer/:id", (req, res) => {
    Customer.findById(req.params.id).then((customer) => {
        if(customer){
            res.json(customer)
        } else{
            res.send("Invalid ID");
        }
    }).catch(err => {
        if(err){
            throw err;
        }
    })
})

app.delete("/customer/:id", (req, res) => {
    Customer.findByIdAndDelete(req.params.id).then(() => {
        res.send("customer removed sucessfully!")
    }).catch(err => {
        if(err){
            throw err;
        }
    })
})


app.listen("6767", () => {
    console.log("Up and Listening on port 6767!!")
})