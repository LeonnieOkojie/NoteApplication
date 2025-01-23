const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url =
  `mongodb+srv://fullstack:${password}@cluster0.jcwxi.mongodb.net/noteApp?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery',false)

mongoose.connect(url)

const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
})

const Note = mongoose.model('Note', noteSchema)

const note1 = new Note({
  content: 'HTML is easy',
  important: true,
})

const note2 = new Note({
  content: 'JavaScript is versatile',
  important: true,
})

const note3 = new Note({
  content: 'CSS makes things pretty',
  important: false,
})

note1.save().then(result => {
  console.log('note1 saved!')
  note2.save().then(result => {
    console.log('note2 saved!')
    note3.save().then(result => {
    console.log('note3 saved!')
    mongoose.connection.close()
    })
  })
})

/*
Note.find({ important: true }).then(result => {
  result.forEach(note => {
    console.log(note)
  })
  mongoose.connection.close()
})
*/