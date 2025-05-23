const testControllers = (req, res) => {
  try {
    res.status(200).send("<h1>Test API</h1>");
  } catch (error) {
    console.error("Error in test API", error);
  }
};

module.exports = testControllers;
