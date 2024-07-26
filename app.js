const express = require("express");
var cors = require('cors')
require("dotenv").config();
const mongoose = require("mongoose");
const morgan = require("morgan");

const PORT = process.env.PORT || 7770;
const app = express();

app.use(cors())

// app routes
app.use(express.json());
app.use(morgan("dev"));
// app middlewares
app.get("/", async (req, res) => {
  return res.status(200).json("CLM backend listening ...");
});
app.use("/auth", require("./routes/auth-route"));

app.use("/api/tribe", require("./routes/tribe-route"));
app.use("/api/translated", require("./routes/translated-route"));
app.use("/api/ref", require("./routes/ref-route"));

app.listen(PORT, async () => {
  console.log(`CLM backend listening on port ${PORT} ...`);

  let timeout = 25;
  while (mongoose.connection.readyState === 0) {
    if (timeout === 0) {
      console.log('timeout');
      throw new Error(
        'timeout occured with mongoose connection',
      );
    }
    await mongoose.connect(process.env.DB_PATH, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    timeout--;
  }
  console.log(
    'Database connection status:',
    mongoose.connection.readyState,
  );

});
