using Umbraco.Web;
using Umbraco.Web.Models;

namespace $rootnamespace$.Models
{
    public class BaseModel : RenderModel
    {
        public BaseModel() : base(UmbracoContext.Current.PublishedContentRequest.PublishedContent) { }       
        public BaseModel(IPublishedContent content) : base(content) { }      
    }
}