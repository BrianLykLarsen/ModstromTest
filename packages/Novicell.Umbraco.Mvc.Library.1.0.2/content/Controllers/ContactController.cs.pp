using System.Collections.Generic;
using System.Text;
using System.Web.Mvc;
using Umbraco.Web;

using $rootnamespace$.Controllers.Base;
using $rootnamespace$.Helpers;
using $rootnamespace$.Models;



namespace $rootnamespace$.Controllers
{
    public class ContactController : BaseSurfaceController
    {
           public ActionResult Contact()
        {
            var model = new ContactModel();
            return CurrentTemplate(model);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult SendContact(ContactModel model)
        {
            if (!ModelState.IsValid)
            {
                return CurrentUmbracoPage();
            }

            ////Set the fields that need to be replaced.
            var contactPlaceHolders = new Dictionary<string, string> 
            {
                {"Name", model.Name},
                {"Comment", model.Message}
            };

            //update Subject and Body from Umbraco Node

            string subject = model.Content.GetPropertyValue<string>("emailSubject");
            string body = model.Content.GetPropertyValue<string>("emailBody");


            subject = ReplacePlaceholders(subject, contactPlaceHolders);
            body = ReplacePlaceholders(body, contactPlaceHolders);

            // change for a config settings
            string emailFrom = "flo@novicell.dk";

            if (NovicellHelper.SendMail(emailFrom,model.Email, subject, body,true))
            {
                //Redirect to the succes page.
                //var sucessPage = model.Content.Children.FirstOrDefault();
                //if (!sucessPage.IsNull())
                //{
                //    return RedirectToUmbracoPage(sucessPage);
                //}

                // Use same page for success message
                TempData["IsSuccessful"] = true;
            }
            else
            {
                TempData["IsSuccessful"] = false;    
            }
            
            return RedirectToCurrentUmbracoPage();
        }

        private string ReplacePlaceholders(string content, Dictionary<string, string> listPlaceholders, bool escapeHtml = false)
        {
            StringBuilder templ = new StringBuilder(content);

            foreach (var kv in listPlaceholders)
            {
                var val = kv.Value;
                if (escapeHtml)
                {
                    val = Server.HtmlEncode(val);
                }
                templ.Replace("[" + kv.Key + "]", val);
            }

            return templ.ToString();
        }
    }
}
