// require('dotenv').config();
const express = require('express');
const cors = require('cors');
const DogRouter = require('./src/dog/dogRouter')
const CatRouter = require('./src/cat/catRouter')
const UserRouter =  require('./src/user/userRouter')




const app = express();
app.use(cors()) 

// app.use(cors({
//   origin: CLIENT_ORIGIN
// }));



app.use(express.json())

app.use('/api/cat', CatRouter)
app.use('/api/dog', DogRouter)
app.use('/api/users', UserRouter)



//Working!
app.get('/', (req, res) => {
  res.send('Hello world!')
})




// Catch-all 404
app.use(function (req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});



// Catch-all Error handler
// Add NODE_ENV check to prevent stacktrace leak
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: app.get('env') === 'development' ? err : {}
  });
});



app.listen(8080,()=>{
  console.log('Listening on 8080');
});


module.exports = app; 