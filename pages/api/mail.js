import connect from "../../database/connection";
import Mail from "../../database/schemas/mail";

const getMails = async () => {
	const foundMails = await Mail.find();
	if (foundMails) return { status: 201, body: { foundMails } };
	else return { status: 401, body: { error: "Shit the bed" } };
  };
  
  const postMail = async (req) => {
	const { _id, postDate, content, user } = req.body;
	if (_id) {
	  if (user) {
		const newMail = await Mail.updateOne(
		  { _id: [`${_id}`] },
		  { user: `${user}`, content: `${content}` }
		);
		if (newMail) return { status: 201, body: { newMail } };
	  } else {
		const newMail = await Mail.updateOne(
		  { _id: [`${_id}`] },
		  { content: `${content}` }
		);
		if (newMail) return { status: 201, body: { newMail } };
	  }
	} else {
	  const newMail = await Mail.create({ content, user, postDate });
	  if (newMail) return { status: 201, body: { newMail} };
	}
	return { status: 401, body: { error: "Shit the bed" } };
  };
  
  const deleteMail = async (req) => {
	const { _id } = req.body;
  
	const foundUser = await Mail.findById({ _id });
  
	const deletedMail = await Mail.deleteOne({ _id });
	if (deletedMail) return { status: 201, body: { deletedMail} };
	else return { status: 401, body: { error: "Shit the bed" } };
  };
  
  const mailHandler = async (req, res) => {
	const method = req.method;
  
	await connect().catch((err) => console.log(err));
  
	let result = { error: "Something went horribly wrong" };
	switch (method) {
	  case "GET":
		result = await getMails();
		res.status(result.status).json(result.body);
		break;
	  case "POST":
		result = await postMail(req);
		res.status(result.status).json(result.body);
		break;
	  case "PATCH":
		result = await deleteMail(req);
		res.status(result.status).json(result.body);
		break;
	  default:
		res.status(401).json(result);
		break;
	}
  };
  
  export default mailHandler;
  