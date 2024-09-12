const nodemailer = require('nodemailer');
require('dotenv').config();
const fs = require('fs');

class EmailService {
    constructor() {
        this.transporter = nodemailer.createTransport({
            // host: 'smtp-mail.outlook.com',
            // port: 587,
            // secure: false, // upgrade later with STARTTLS
            // secureProtocol : 'SSLv3',
            service: 'gmail',
            auth:{
                user:process.env.EMAIL_LOCAL,
                pass:process.env.PASSWORD,
            }, 
        });
    }

    async sendReceipt(email, subject, receiptData) {
        try {     
    // Ler o modelo XML do recibo
            const receiptTemplate = fs.readFileSync('receipt-template.xml', 'utf-8');
    // Substituir os marcadores de posição no modelo com dados reais
            const filledReceipt = receiptTemplate
                .replace('{{transactionId}}', receiptData.transactionId)
                .replace('{{amount}}', receiptData.amount)
                .replace('{{sender}}', receiptData.sender)
                .replace('{{receiver}}', receiptData.receiver)
                .replace('{{date_transfer}}', receiptData.dateTransaction);
    

    // Configurar o email
            let mailOptions = {
                from: process.env.EMAIL_LOCAL,
                to: email,
                subject: subject,
                text: "Este é um e-mail automático",
                attachments: [
                {
                    filename: 'receipt.xml',
                    content: filledReceipt
                },
                ],
            };
    
        await this.transporter.sendMail(mailOptions);

        console.log(`E-mail enviado para ${email} com sucesso.`);
        }  catch (error) {
            console.error('Erro ao enviar o e-mail:', error.message);
            throw error;
        }
    }

    async sessionLoc(email, user, subject, city, countryCode, dateSession) {
        try {
            // Configurar o email
            let mailOptions = {
                from: process.env.EMAIL_LOCAL,
                to: email,
                subject: subject,
                html: `<p>Oi, ${user} <br>
                Parece que você logou em sua conta, na cidade ${city}, ${countryCode} <br>
                em ${dateSession}</p>`
            };
            await this.transporter.sendMail(mailOptions);
    
        } catch (error) {
            console.error('Erro ao enviar o e-mail:', error.message);
            throw error;
        }
    }
}



module.exports = new EmailService();