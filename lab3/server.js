const express = require("express");
const cors = require("cors");
const employeeRoutes = require("./routers/employeesroute");
const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

app.use("/employees", employeeRoutes);

app.listen(PORT, () => console.log(`Сервер запущено на порту ${PORT}`));