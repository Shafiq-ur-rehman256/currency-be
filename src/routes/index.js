const { coversionsRoute } = require("./conversion.routes");
const { userRoute } = require("./users.routes");

module.exports = [userRoute, coversionsRoute];