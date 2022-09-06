// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import mongoose from "mongoose"

export default async function handler(req, res) {

  await mongoose.connect(process.env.MONGODB_URI)
  const noteSchema = mongoose.Schema({
    name: String
  })

  const Note = mongoose.model('Note', noteSchema)

  const newNote = new Note({ name: 'test' })

  await newNote.save()

  res.status(200).json({ name: 'test' })
}
