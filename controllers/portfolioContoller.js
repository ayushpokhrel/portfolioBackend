const nodemailer = require("nodemailer");
const env=require('dotenv')

env.config()

//transport



const sendEmailController = async(req, res) => {

    const { name, email, msg } = req.body;

    //validation
    if (!name || !email || !msg) {
      return res.status(500).send({
        success: false,
        message: "Please Provide All Fields..",
      });
    }
    var transport = await nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.ADDRESS,
        pass: process.env.KEY
      }
    });

    var message={
      from:process.env.ADDRESS,
      to:process.env.ADDRESS,
      subject:`Regarding MERN Protfolio ${name}`,
      text:msg
    }
  

    transport.sendMail(message,(err,info)=>{
      if (err){
          console.log(err)
      }
      console.log(info)
      return res.status(200).send({
        success: true,
        message: "Message sent successfully",
      });
    })
    
};

module.exports = { sendEmailController };
