const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const axios = require("axios");

app.use(bodyParser.json());

const mongoose = require("mongoose");

require("./Order");
const Order = mongoose.model("Order")

mongoose.connect(mongodb_cred, () => {
    console.log("Database is connected!");
})

app.post("/order", (req, res) => {

    var newOrder = {
        CustomerID: mongoose.Types.ObjectId(req.body.CustomerID),
        BookID: mongoose.Types.ObjectId(req.body.BookID),
        initialDate: req.body.initialDate,
        deliveryDate: req.body.deliveryDate,
    }

    var order = new Order(newOrder)

    order.save().then(() => {
        console.log("New order created!")
    }).catch((err) => {
        if(err) {
            throw err;
        }
    })

    res.send("Succesful")
})

app.get("/orders", (req, res) => {
    Order.find().then((orders) => {
        res.json(orders)
    }).catch(err => {
        if(err) {
            throw err;
        }
    })
})


app.get("/order/:id", (req, res) => {
    Order.findById(req.params.id).then((order) => {
        if(order){
            
            axios.get("http://localhost:6767/customer/"+order.CustomerID).then((response) => {
                console.log(response)
                var orderObject = {customerName: response.data.name, bookTitle: ''}

                axios.get("http://localhost:4949/book/"+order.BookID).then((response) => {
                console.log(response)
                orderObject.bookTitle = response.data.title
                res.json(orderObject)
            })
            })

            // res.send("Quick response")

        } else{
            res.send("Invalid Order");
        }
    }).catch(err => {
        if(err){
            throw err;
        }
    })
})


app.get("/", (req, res) => {
    res.send("This our order end point!")
})



app.listen("7171", () => {
    console.log("Up and Running orders service on 7171!")
})