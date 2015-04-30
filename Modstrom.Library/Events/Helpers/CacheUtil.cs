using System;
using System.Collections.Generic;
using System.Web;
using System.Web.Caching;

namespace Modstrom.Library.Helpers
{
    /// <summary>
    /// Based on cache manager that implement http://davidmuto.com/2012/02/27/efficient-thread-safe-caching-with-asp-net/
    /// </summary>
    public static class CacheUtil
    {
        // CLR guarantees thread-safety during initialization
        private static Dictionary<string, object> CacheKeyDictionary = new Dictionary<string, object>();

        /// <summary>
        /// Usage CacheUtil.Insert("mycachekey",myNode,null);
        /// TimeSpan t = DateTime.Now.AddMinutes(60).Subtract(DateTime.Now)
        /// Thread Safe version of the Insert
        /// </summary>
        /// <param name="cacheKey"></param>
        /// <param name="value"></param>
        /// <param name="timeout"></param>
        public static void Insert(string cacheKey, object value, TimeSpan? timeout)
        {
            if (value == null)
                return;

            var cache = HttpRuntime.Cache;
            var obj = cache[cacheKey];

            if (obj == null)
            {
                // get the lock object
                var lockObject = GetCacheLockObject(cacheKey);
                lock (lockObject)
                {
                    // double check...if-lock-if http://en.wikipedia.org/wiki/Double-checked_locking
                    obj = cache[cacheKey];

                    if (obj == null)
                    {
                        DateTime absoluteTimeout = Cache.NoAbsoluteExpiration;

                        if (timeout.HasValue)
                            absoluteTimeout = DateTime.Now.Add(timeout.Value);

                        HttpRuntime.Cache.Insert(cacheKey, value, null, absoluteTimeout, Cache.NoSlidingExpiration, CacheItemPriority.Default, null);

                    }
                }
            }
        }



        /// <summary>
        /// if (CacheUtil.GetCache("mycachekey") != null)
        ///     return (List&lt;string&gt;)CacheUtil.GetCache("mycachekey")
        /// build the list 
        /// insert in the cache
        /// </summary>
        /// <param name="cacheKey"></param>
        /// <returns></returns>
        public static object GetCache(string cacheKey)
        {
            return HttpRuntime.Cache[cacheKey];
        }

        public static void Remove(string cacheKey)
        {
            var cache = HttpRuntime.Cache;
            var obj = cache[cacheKey];

            if (obj != null)
            {
                var lockObject = GetCacheLockObject(cacheKey);
                lock (lockObject)
                {
                    obj = HttpRuntime.Cache[cacheKey];
                    if (obj != null)
                        HttpRuntime.Cache.Remove(cacheKey);
                }
            }
        }

        private static object GetCacheLockObject(string cacheKey)
        {
            if (!CacheKeyDictionary.ContainsKey(cacheKey))
            {
                // lock on the whole dictionary
                lock (CacheKeyDictionary)
                {
                    // check again...always remember: if-lock-if
                    if (!CacheKeyDictionary.ContainsKey(cacheKey))
                    {
                        CacheKeyDictionary.Add(cacheKey, new object());
                    }
                }
            }

            return CacheKeyDictionary[cacheKey];
        }
    }
}
