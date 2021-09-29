let express = require("express")
let app = express()
let bodyParser = require("body-parser")
const mongoose = require("mongoose");
const engines = require("consolidate");
var hbs = require("handlebars");
let resume = require("./app/models/resumeDetails")

app.engine("hbs", engines.handlebars);
app.set("views", "./views");
app.set("view engine", "hbs");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/json" }));

const MONGO_URI = "mongodb://localhost:27017/XD";
const PORT = 4000;
try {
    mongoose.connect(
        MONGO_URI
    );
    let db = mongoose.connection;
    db.on("error", console.error.bind(console, "connection error:"));
} catch (e) {
    throw e;
}

app.use(express.static("public"));

app.get("/", (req, res) => {
    res.render("index", {})
});

app.post("/save",(req,res)=>{
    let obj = resume(req.body);
    let fname = Date.now()
    obj.save((err,block)=>{
        if(err){
            res.render("err",{message:err})
        }else{
            res.render("Resume",{resume: req.body, fname: fname})
        }
    });
});

app.listen(PORT)
console.log("Listening")