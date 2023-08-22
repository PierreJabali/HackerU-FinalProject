using DataAccess.EmailSender;
using MimeKit;

namespace EStore.Helpers
{
	public class EmailHelper
	{
		private readonly IWebHostEnvironment _env;
		private readonly IMailSender _emailSender;
		private readonly string _templatesPath;

		public EmailHelper(IWebHostEnvironment env, IMailSender emailSender)
		{
			_env = env;
			_emailSender = emailSender;
			_templatesPath = Path.Combine(_env.WebRootPath, "Templates");
		}

		private async Task<string> LoadTemplateAsync(string templateFileName)
		{
			var pathToFile = Path.Combine(_templatesPath, templateFileName);
			using (StreamReader sourceReader = File.OpenText(pathToFile))
			{
				return await sourceReader.ReadToEndAsync();
			}
		}

		private string GetFormattedMessage(string template, params object[] args)
		{
			return string.Format(template, args);
		}

		public async Task SendEmailFromTemplateAsync(string email, string templateFileName, params object[] args)
		{
			var template = await LoadTemplateAsync(templateFileName);
			var messageBody = GetFormattedMessage(template, args);

			var message = new MimeMessage();
			message.To.Add(MailboxAddress.Parse(email));
			message.Subject = args[0].ToString();

			var bodyBuilder = new BodyBuilder();
			bodyBuilder.HtmlBody = messageBody;
			message.Body = bodyBuilder.ToMessageBody();

			_emailSender.SendEmail(email, args[0].ToString(), message.Body.ToString());
		}
	}
}