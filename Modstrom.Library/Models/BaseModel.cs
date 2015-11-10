using Umbraco.Core.Models;
using Umbraco.Web;
using Umbraco.Web.Models;

namespace Modstrom.Library.Models
{
    public class BaseModel : RenderModel
    {
        public BaseModel() : base(UmbracoContext.Current.PublishedContentRequest.PublishedContent) { }       
        public BaseModel(IPublishedContent content) : base(content) { }      
    }
}