using System.Web;


namespace $rootnamespace$.Helpers
{
    // copied from the Hybrid framework + http://aspadvice.com/blogs/ssmith/archive/2007/10/29/VaryByCustom-Caching-By-User.aspx
    public class Global : Umbraco.Web.UmbracoApplication
    {
        public override string GetVaryByCustomString(HttpContext context, string custom)
        {
            if (custom.ToLower() == "url")
            {
                return "url=" + context.Request.Url.AbsoluteUri;
            }

            if (custom.ToLower() == "url;isLogged")
            {
                string userName = context.User.Identity.Name;
                return "url=" + context.Request.Url.AbsoluteUri + "&isLogged=" + userName;
            }

            return base.GetVaryByCustomString(context, custom);
        }
    }
}
