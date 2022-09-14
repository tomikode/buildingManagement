import connect from "../../database/connection"

export default function handler(req, res) {

  connect().catch(err => console.log(err))

  res.status(200).json({ name: 'John Doe' })
}
