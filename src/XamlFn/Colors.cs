using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.Azure.WebJobs.Host;
using System.Drawing;
using System;

namespace XamlFn
{
    public static class Colors
    {
        [FunctionName("HashToHex")]
        public static async Task<HttpResponseMessage> FromHashToHex([HttpTrigger(AuthorizationLevel.Function, "get", "post", Route = null)]HttpRequestMessage req, TraceWriter log)
        {
            return await GenericColorConverter(HexConverter, req, log);
        }

        [FunctionName("HashToRGB")]
        public static async Task<HttpResponseMessage> FromHashToRGB([HttpTrigger(AuthorizationLevel.Function, "get", "post", Route = null)]HttpRequestMessage req, TraceWriter log)
        {
            return await GenericColorConverter(RgbConverter, req, log);
        }

        private static async Task<HttpResponseMessage> GenericColorConverter(Func<Color, string> func, HttpRequestMessage req, TraceWriter log)
        {
            log.Info($"C# HTTP trigger function processed a { func.Method.Name } request.");

            // parse query parameter
            string name = req.GetQueryNameValuePairs()
                .FirstOrDefault(q => string.Compare(q.Key, "hash", true) == 0)
                .Value;

            // Get request body
            dynamic data = await req.Content.ReadAsAsync<object>();

            // Set name to query string or body data
            name = name ?? data?.name;
            if (name == null)
            {
                return req.CreateResponse(HttpStatusCode.BadRequest, "Please pass a name on the query string or in the request body");
            }
            else
            {
                var color = ColorTranslator.FromHtml(name);

                return req.CreateResponse(HttpStatusCode.OK, func.Invoke(color));
            }
        }



        private static string HexConverter(Color c)
        {
            return String.Format("#{0:X6}", c.ToArgb() & 0x00FFFFFF);
        }

        public static string RgbConverter(Color c)
        {
            return String.Format("RGB({0},{1},{2})", c.R, c.G, c.B);
        }
    }
}
