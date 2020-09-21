 const nodemailer=require('nodemailer');

module.exports=class Email {
    constructor (user,url){
        this.to=user.email,
        this.fname=user.fname,
        this.url=url,
        this.from=`Frehiwot Abebie <${process.env.EMAIL_FROM}>`;
    }

    newTransport() {
        if(process.env.NODE_ENV === 'production'){
            //sendgrid 
            return nodemailer.createTransport({
                service:'SendGrid',
                auth:{
                    user:SENDGRID_USER,
                    pass:SENDGRID_PASS
                }
            })
        }
    

    return nodemailer.createTransport({
        host:process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
          user: process.env.EMAIL_USERNAME,
          pass: process.env.EMAIL_PASSWORD
        }
      });
    
    }

     // Send the actual email
  async send(html,subject) {

    const mailOptions = {
      from: this.from,
      to: this.to,
      subject,
      html:html,
     // text: htmlToText.fromString(html)
    };

    // 3) Create a transport and send email
    await this.newTransport().sendMail(mailOptions);
  }
  async sendLogin(html) {
    await this.send(html,'Welcome to the workshops management system');
  }

 async sendWelcome(html){
   await this.send(html,'Workshop management System')
 }
}

