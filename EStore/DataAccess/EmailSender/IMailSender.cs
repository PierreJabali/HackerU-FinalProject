namespace DataAccess.EmailSender
{
    public interface IMailSender
    {
		void SendEmail(string recipientEmail, string subject, string htmlContent);
	}
}
