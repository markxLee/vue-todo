const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 8081;
const route = require("./routes");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

route(app);

app.listen(PORT, () => console.log(`Success conect with ${PORT}`));