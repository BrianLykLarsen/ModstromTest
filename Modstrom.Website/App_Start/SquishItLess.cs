//[assembly: WebActivator.PreApplicationStartMethod(typeof(Modstrom.Website.App_Start.SquishItLess), "Start")]

namespace Modstrom.Website.App_Start
{
    using SquishIt.Framework;
    using SquishIt.Less;

    public class SquishItLess
    {
        public static void Start()
        {
            Bundle.RegisterStylePreprocessor(new LessPreprocessor());
       }
    }
}