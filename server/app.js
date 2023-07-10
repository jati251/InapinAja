require("dotenv").config();
const errorsHandler = require("./middlewares/errorsHandler");
const express = require("express");
const cors=require('cors')
const app = express();
const port = process.env.PORT || 3000;

app.use(express.static("public"));
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(require("./routes"));
app.use(errorsHandler);


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

module.exports=app
