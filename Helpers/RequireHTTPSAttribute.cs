using System;
using System.Web.Http.Controllers;
using System.Web.Http.Filters;
using System.Net.Http;

namespace LaundryManagerAPI.Helpers
{
    public class RequireHTTPSAttribute : AuthorizationFilterAttribute
    {
        public override void OnAuthorization(HttpActionContext actionContext)
        {
            if(actionContext.Request.RequestUri.Scheme != Uri.UriSchemeHttps)
            {
                actionContext.Response = actionContext.Request.CreateResponse(System.Net.HttpStatusCode.Found);
                actionContext.Response.Content = new StringContent("<p> Use HTTPS insted of HTTP");

                UriBuilder uriBuilder = new UriBuilder(actionContext.Request.RequestUri);
                uriBuilder.Scheme = Uri.UriSchemeHttps;
                uriBuilder.Port = 8086;

            }
            else
            {

            base.OnAuthorization(actionContext);
            }
        }
    }
}
