const asyncHandler = require("express-async-handler");

const contactUs = asyncHandler(async (req, res) => {
  res.send("contact us");
});

module.exports = { contactUs };
