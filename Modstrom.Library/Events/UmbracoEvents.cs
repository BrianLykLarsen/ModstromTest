using System;
using DevTrends.MvcDonutCaching;
using Umbraco.Core;
using Umbraco.Core.Events;
using Umbraco.Core.Logging;
using Umbraco.Core.Models;
using Umbraco.Core.Publishing;
using Umbraco.Core.Services;
using Umbraco.Web.Mvc;

using Modstrom.Library.Controllers;

namespace Modstrom.Library.Events
{
       public class UmbracoEvents : IApplicationEventHandler
    {
        // http://our.umbraco.org/documentation/reference/events-v6/ContentService-Events
        // http://our.umbraco.org/documentation/reference/events-v6/MediaService-Events
        public void OnApplicationInitialized(UmbracoApplicationBase umbracoApplication,
                                             ApplicationContext applicationContext)
        {
            ContentService.Published += ContentService_Published;
            ContentService.UnPublished += ContentService_UnPublished;
            ContentService.Moved += ContentService_Moved;
            ContentService.Trashed += ContentService_Trashed;
            ContentService.Deleted += ContentService_Deleted;
            ContentService.Saved += ContentService_Saved;
            MediaService.Saved += MediaServiceSaved;

        }

        public void OnApplicationStarting(UmbracoApplicationBase umbracoApplication,
                                          ApplicationContext applicationContext)
        {
            DefaultRenderMvcControllerResolver.Current.SetDefaultControllerType(typeof(DefaultController));
        }

        public void OnApplicationStarted(UmbracoApplicationBase umbracoApplication,
                                         ApplicationContext applicationContext)
        {

        }

        private void ContentService_Published(IPublishingStrategy sender, PublishEventArgs<IContent> args)
        {
            ClearCache();
        }

        private void ContentService_UnPublished(IPublishingStrategy sender, PublishEventArgs<IContent> args)
        {
            ClearCache();
        }

        private void ContentService_Moved(IContentService sender, MoveEventArgs<IContent> e)
        {
            ClearCache();
        }

        private void ContentService_Trashed(IContentService sender, MoveEventArgs<IContent> e)
        {
            ClearCache();
        }

        private void ContentService_Deleted(IContentService sender, DeleteEventArgs<IContent> e)
        {
            ClearCache();
        }

        private void ContentService_Saved(IContentService sender, SaveEventArgs<IContent> e)
        {

        }

        private void MediaServiceSaved(IMediaService sender, SaveEventArgs<IMedia> e)
        {
            ClearCache();
        }

        private void ClearCache()
        {
            try
            {
                //Clear all output cache so everything is refreshed.
                var cacheManager = new OutputCacheManager();
                cacheManager.RemoveItems();
            }
            catch (Exception ex)
            {
                LogHelper.Error<UmbracoEvents>("Error ClearCache:", ex);
            }
        }
    }
}
