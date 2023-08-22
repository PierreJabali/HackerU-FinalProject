using DataAccess.Data;
using System.Net;
using System.Net.Mail;

namespace DataAccess.EmailSender
{
    public class EmailSender : IMailSender
    {
		private readonly ApplicationDbContext _context;
		public EmailSender(ApplicationDbContext context)
		{
			_context = context;
		}

		public void SendEmail(string recipientEmail, string subject, string htmlContent)
		{
			try
			{
				var emailSettings = _context.EmailSettings.FirstOrDefault();

				if (emailSettings != null)
				{
					var senderEmail = emailSettings.Username;
					var senderName = emailSettings.Signature;
					var smtpHost = emailSettings.SMTP_Server;
					var smtpPort = emailSettings.Port;
					var smtpUsername = emailSettings.Username;
					var smtpPassword = emailSettings.Password;

					using (var client = new SmtpClient(smtpHost, smtpPort))
					{
						client.UseDefaultCredentials = false;
						client.EnableSsl = true;
						client.Credentials = new NetworkCredential(smtpUsername, smtpPassword);

						var message = new MailMessage
						{
							From = new MailAddress(senderEmail, senderName),
							To = { recipientEmail },
							Subject = subject,
							Body = htmlContent,
							IsBodyHtml = true
						};

						client.Send(message);
					}
				}
				else
				{
					throw new Exception("Mail settings are not correct!");
				}
			}
			catch (Exception ex)
			{
				throw new Exception(ex.Message);
			}
		}
	}
}
