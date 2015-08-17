using Modstrom.Library.Controllers.Base;
using Modstrom.Library.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Mvc;

namespace Modstrom.Library.Controllers
{
    public class MyPageController : BaseSurfaceController
    {
        public ActionResult MyPage()
        {
            var model = new MyPageModel();
            return CurrentTemplate(model);
        }
    }
}
