import mongoose from "mongoose"

mongoose.connect('mongodb+srv://developer:codernewapp@cluster0.sguzlt4.mongodb.net/scheduling-app?retryWrites=true&w=majority')
  .then(m => console.log(m.connection.readyState === 1 ? 'Mongoose connected' : 'Mongoose failed'))
  .catch(err => console.error(err))


