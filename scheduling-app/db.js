import mongoose from "mongoose"
import dotenv from 'dotenv'

// loading an env file and setting the environment variables
dotenv.config()

// function to close a database connection once the seeding is done
async function dbClose() {
  await mongoose.connection.close()
  console.log('Databse disconnected')
 }

//  accessing the environment variables with process.env to connect to the database
mongoose.connect(process.env.ATLAS_DB_URL)
  .then(m => console.log(m.connection.readyState === 1 ? 'Mongoose connected' : 'Mongoose failed'))
  .catch(err => console.error(err))

export { dbClose }