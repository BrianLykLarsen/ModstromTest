using System;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.Linq;
using System.Text;
using System.Web;

namespace Modstrom.Library.Helpers
{
    /// <summary>
    /// Change the Global.asax file : Inherits="NCDP.Library.Helpers.NovicellApplication"
    /// http://www.4guysfromrolla.com/articles/120209-1.aspx  
    /// </summary>
    public class NovicellApplication : Umbraco.Web.UmbracoApplication
    {
        public void Init(HttpApplication application)
        {
            application.PreRequestHandlerExecute += Application_PreSendRequestHeaders;
        }

        protected void Application_PreSendRequestHeaders(object sender, EventArgs e)
        {
            HttpContext.Current.Response.Headers.Remove("Server");
        }
    }
}
