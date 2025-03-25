const express = require("express");
const cors = require("cors");
const employeeRoutes = require("./routes/employees.route.js");

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

app.use("/employees", employeeRoutes);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));