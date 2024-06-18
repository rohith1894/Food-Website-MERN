const express = require('express')
const app = express()
const port = 4000
const mongoDB = require('./db');
mongoDB();


app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(express.json());


app.use('/api', require('./Routes/CreateUser'));
app.use('/api', require('./Routes/DisplayData'));
app.use('/api', require('./Routes/OrderData'));

app.listen(port, () => {
  console.log(`app listening on port ${port}`)
})

const errHandler = (error,request,response,next) => {
    response.send({ "error-message ": error.message });
}

app.use(errHandler);