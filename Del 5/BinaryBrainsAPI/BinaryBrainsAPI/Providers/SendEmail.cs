using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mail;
using System.Threading.Tasks;

namespace BinaryBrainsAPI.Providers
{
    public class SendEmail
    {

        public static void SendEmailMethod(string email, string sourcemethod)
        {
            MailMessage mail = new MailMessage();
            SmtpClient SmtpServer = new SmtpClient("smtp.gmail.com");

            if (sourcemethod == "reset")
            {
                mail.Subject = "Artec Reset Password Link";
                mail.Body = "http://localhost:4200/new-password";
            }
            else {

             
                mail.Subject = "Test Mail - 1";
                mail.Body = "mail with attachment";

            }
            mail.From = new MailAddress("artechgalary@gmail.com");
            mail.To.Add(email);


            // System.Net.Mail.Attachment attachment;
            // attachment = new System.Net.Mail.Attachment("c:/textfile.txt");
            // mail.Attachments.Add(attachment);

            SmtpServer.Port = 587;
            SmtpServer.Credentials = new System.Net.NetworkCredential("artechgalary@gmail.com", "Artech123System");
            SmtpServer.EnableSsl = true;

            SmtpServer.Send(mail);

        }
    }
}
