using System;
using System.Collections.Generic;
using System.Globalization;
using System.Net.Mail;
using System.Threading;
using System.Web;
using Umbraco.Core.Logging;
using umbraco;
using umbraco.cms.businesslogic.web;
using System.Linq;

namespace $rootnamespace$.Helpers
{
    public class NovicellHelper
    {
        public static bool CompareIpAddresses(string requestingIp, string secureIps)
        {
            if (String.IsNullOrEmpty(secureIps))
                return true;

            string[] secureIPs = secureIps.Split(',');

            foreach (string iP in secureIPs)
            {
                if (iP == requestingIp)
                    return true;
            }

            return false;
        }

        //http://stackoverflow.com/questions/2670004/ip-address-of-the-client-machine
        //http://stackoverflow.com/questions/200527/userhostaddress-gives-wrong-ips
        public static string GetClientIp()
        {
            // If Cloud Flare 
            string clientIp = HttpContext.Current.Request.ServerVariables["HTTP_CF_CONNECTING_IP"];

            if (string.IsNullOrEmpty(clientIp))
            {
                clientIp = HttpContext.Current.Request.ServerVariables["HTTP_X_FORWARDED_FOR"];

                // IF PROXY
                if (!string.IsNullOrEmpty(clientIp))
                {
                    string[] forwardedIps = clientIp.Split(new char[] { ',' }, StringSplitOptions.RemoveEmptyEntries);
                    clientIp = forwardedIps[forwardedIps.Length - 1];
                }
                else // Normal 
                {
                    clientIp = HttpContext.Current.Request.ServerVariables["REMOTE_ADDR"];
                }
            }

            return clientIp;
        }

        /// <summary>
        /// Get the domain object of the current node. 
        /// Use preferably GetCurrentCultureAlias and GetCurrentTwoLetterIsoLanguage for language info
        /// </summary>
        /// <param name="nodeId"></param>
        /// <returns></returns>
        public static Domain GetDomain(int nodeId)
        {
            Domain[] domains = library.GetCurrentDomains(nodeId);
            if ((domains != null) && domains.Length >= 1)
            {
                return domains[0];
            }
            return null;
        }

        /// <summary>
        /// Return the CultureInfo object from the GetCurrentCultureAlias
        /// </summary>
        /// <param name="nodeId"></param>
        /// <returns></returns>
        public static CultureInfo GetCultureInfo(int nodeId)
        {
            return new CultureInfo(GetCurrentCultureAlias(nodeId));
        }

        /// <summary>
        /// The culture code of the language. For Danish it's  "da-DK"
        /// </summary>
        /// <param name="nodeId"></param>
        /// <returns></returns>
        public static string GetCurrentCultureAlias(int nodeId)
        {
            var domain = GetDomain(nodeId);
            if (domain != null)
            {
                return domain.Language.CultureAlias;
            }
            return Thread.CurrentThread.CurrentCulture.Name;
        }
        
        public static string GetSecondLevelDomainName(string host)
        {
            return string.Join(".", host.Split('.').Reverse().Take(2).Reverse().ToArray());
        }

        public static string GetExceptionString(Exception ex)
        {
            if (ex == null)
                return string.Empty;

            string theString = ex.Message + ex.StackTrace;

            if (ex.InnerException != null)
            {
                return Environment.NewLine + "---- Inner Exception ----" + Environment.NewLine + GetExceptionString(ex.InnerException);
            }

            return theString;
        }

        public static string GetProtocol()
        {
            return HttpContext.Current != null && HttpContext.Current.Request.IsSecureConnection ? "https://" : "http://";
        }

        public static bool IsValidDate(int year, int month, int day)
        {
            if (year < DateTime.MinValue.Year || year > DateTime.MaxValue.Year)
                return false;

            if (month < 1 || month > 12)
                return false;

            return day > 0 && day <= DateTime.DaysInMonth(year, month);
        }

        public static bool SendMail(string fromMail, string toMail, string subject, string body, bool isHtml = false, List<Attachment> attachmentCollection = null, bool reThrowEx = true)
        {
            try
            {
                var mailMessage = new MailMessage(fromMail.Trim(), toMail.Trim())
                {
                    Subject = subject,
                    IsBodyHtml = isHtml,
                    Body = body
                };

                if (attachmentCollection != null)
                {
                    foreach (Attachment attachment in attachmentCollection)
                    {
                        mailMessage.Attachments.Add(attachment);
                    }
                }

                var smtpClient = new SmtpClient();
                smtpClient.Send(mailMessage);
                return true;
            }
            catch (Exception e)
            {
                LogHelper.Error<NovicellHelper>("Error sending mail.", e);
                if (reThrowEx)
                    throw e;
                return false;
            }
        }



    }
}
