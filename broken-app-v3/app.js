const express = require('express');
var app = express();
const ExpressError = require("./expressError");
const userRoutes = require("./routes/users")

app.use(express.json());
app.use("/", userRoutes);


// /** general error handler */

app.use(function (req, res, next) {
  const err = new ExpressError("Not Found",404);

  // pass the error to the next piece of middleware
  return next(err);
});


// /** general error handler */
app.use(function (err, req, res, next) {
  
  res.status(err.status || 500);

  return res.json({
    status: err.status || 500,
    message: err.message
  });
});


/** Start server on port 3000 */
app.listen(3000, function() {
  console.log('Server started on port 3000.');
});


