import mongoose from "mongoose"

// function to close a database connection once the seeding is done
async function dbClose() {
  await mongoose.connection.close()
  console.log('Databse disconnected')
 }

mongoose.connect('mongodb+srv://developer:codernewapp@cluster0.sguzlt4.mongodb.net/scheduling-app?retryWrites=true&w=majority')
  .then(m => console.log(m.connection.readyState === 1 ? 'Mongoose connected' : 'Mongoose failed'))
  .catch(err => console.error(err))

export { dbClose }