using System;
using System.Collections.Generic;
using System.Linq;
using System.Xml.Linq;
using Umbraco.Core.Dynamics;
using Umbraco.Core.Models;
using Umbraco.Web;


namespace $rootnamespace$.Helpers
{
    public static class ExtensionMethods
    {
        public static UmbracoHelper Umbraco
        {
            get { return new UmbracoHelper(UmbracoContext.Current); }
        }

        #region IPublishedContent - Methods

        #region Common
        

        public static IPublishedContent GetSiteNode(this IPublishedContent content)
        {
            var topPage = (IPublishedContent)System.Web.HttpContext.Current.Items["SiteNode"];

            if (topPage == null)
            {
                topPage = content.AncestorOrSelf(1);
                System.Web.HttpContext.Current.Items["SiteNode"] = topPage;
            }

            return topPage;
        }

        /// <summary>
        /// Best performance
        /// </summary>
        /// <param name="content"></param>
        /// <returns></returns>
        public static int? GetSiteNodeId(this IPublishedContent content)
        {
            string[] listPathIds = content.Path.Split(new char[1] { ',' }, StringSplitOptions.RemoveEmptyEntries);
            if (listPathIds.Length >= 2)
                return Convert.ToInt32(listPathIds[1]);

            return null;
        }
        
        public static bool IsNull(this IPublishedContent content)
        {
            if ((content == null) || (content.Id == 0))
                return true;
            return false;
        }

        [Obsolete("For Umb 7.1.5+ and 6.2 use Model.Content.GetPropertyValue<IPublishedContent>(alias) from : http://our.umbraco.org/projects/developer-tools/umbraco-core-property-value-converters")]
        public static IPublishedContent GetPickerNode(this IPublishedContent content, string propertyName, bool isMedia = false, bool recursive = false)
        {
            if (!isMedia)
                return Umbraco.TypedContent(content.GetPropertyValue<int>(propertyName, recursive, 0));
            else
                return Umbraco.TypedMedia(content.GetPropertyValue<int>(propertyName, recursive, 0));
        }

        [Obsolete("For Umb 7.1.5+ and 6.2 use Model.Content.GetPropertyValue<IPublishedContent>(alias).Url from : http://our.umbraco.org/projects/developer-tools/umbraco-core-property-value-converters")]
        public static string GetImageUrl(this IPublishedContent content, string propertyName, bool recursive = false)
        {
            IPublishedContent imageNode = content.GetPickerNode(propertyName, true, recursive);

            if (imageNode.IsNull())
                return string.Empty;

            return imageNode.Url;
        }
        
        #endregion

        #region uComponentes

        /// <summary>
        /// Return the nodes selected with MNTP (xml only) as IPublishedContent.
        /// </summary>
        /// <param name="node"></param>
        /// <param name="propertyName"></param>
        /// <returns></returns>
        [Obsolete("For Umb 7.1.5+ and 6.2 use Model.Content.GetPropertyValue<IEnumerable<IPublishedContent>>(alias) from http://our.umbraco.org/projects/developer-tools/umbraco-core-property-value-converters")]
        public static IEnumerable<IPublishedContent> GetMntpNodes(this IPublishedContent node, string propertyName)
        {
            string propValue = node.GetPropertyValue<string>(propertyName);
            if (string.IsNullOrWhiteSpace(propValue))
            {
                return Enumerable.Empty<IPublishedContent>();
            }

            bool isXml = false;

            // if the string value starts with '<' then it's XML. A CSV would start with a nodeId.
            if (propValue[0] == '<')
                isXml = true;


            if (isXml)
            {
                var xmlData = propValue;

                if (!string.IsNullOrEmpty(xmlData))
                {
                    var umbracoHelper = new UmbracoHelper(UmbracoContext.Current);
                    return umbracoHelper.TypedContent(XElement.Parse(xmlData).Descendants("nodeId").Select(x => (x.Value))).Where(y => y != null);
                }
            }
            else
            {
                List<string> listIds = propValue.Split(',').ToList();

                if (!listIds.Any())
                    return Enumerable.Empty<IPublishedContent>();

                var umbracoHelper = new UmbracoHelper(UmbracoContext.Current);
                return umbracoHelper.TypedContent(listIds).Where(y => y != null);

            }

            return Enumerable.Empty<IPublishedContent>();
        }


        /// <summary>
        /// Return the strings that has been filled in.
        /// </summary>
        /// <param name="content"></param>
        /// <param name="alias"></param>
        /// <returns></returns>
        [Obsolete("MultipleTextStrings does not exist for Umb 7.xx. For 6.2 use Model.Content.GetPropertyValue<List<string>>(alias) from http://our.umbraco.org/projects/developer-tools/umbraco-core-property-value-converters")]
        public static IEnumerable<string> GetMultipleTextStrings(this IPublishedContent content, string alias)
        {
            var xml = content.GetPropertyValue<RawXElement>(alias);

            if (xml != null)
            {
                var xmlData = xml.Value;

                if (xmlData != null)
                {
                    return
                    (
                        from x in xmlData.Descendants("value")
                        select x.Value
                    );
                }
            }

            return Enumerable.Empty<string>();
        }

        #endregion

        #endregion
       
    }
}
