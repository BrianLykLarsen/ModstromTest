using System.Web.Mvc;
using DevTrends.MvcDonutCaching;
using Umbraco.Web.Models;

using Modstrom.Library.Controllers.Base;
using Modstrom.Library.Models;


namespace Modstrom.Library.Controllers
{
    public class DefaultController : BaseSurfaceController
    {
        /// <summary>
        /// If the route hijacking doesn't find a controller this default controller will be used.
        /// That way a each page will always go through a controller and we can always have a BaseModel for the masterpage.
		/// to use the cache profile please add the following in the web.config in the <system.web> section :
		///    <caching>
        ///        <outputCache enableOutputCache="false" />
        ///           <!--use false for dev and true for staging/live-->
        ///           <outputCacheSettings>
        ///             <outputCacheProfiles>
        ///                <add name="OneDay" duration="86400" varyByParam="*" />
        ///           </outputCacheProfiles>
        ///        </outputCacheSettings>
        ///</caching>
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        [DonutOutputCache(CacheProfile = "OneDay", VaryByCustom = "url")]
        public override ActionResult Index(RenderModel model)
        {
            return CurrentTemplate(model);
        }
    }
}
