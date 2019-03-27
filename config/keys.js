const MONGODB_URI = 'mongodb://localhost:27017/mearndbapp';
// ES6
// export default {
//   MONGODB_URI
// }
const MONGODB_OPTS = {
  useNewUrlParser: true,
  useCreateIndex: true  // for avoiding driver warnings
};

module.exports = {
  MONGODB_URI,
  MONGODB_OPTS,
  secretOrKey: "4t3nci0n"
};