const api = require("./api/index");

const PORT = process.env.API_PORT || 3010;

api.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
})