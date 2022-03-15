using LaundryManagerAPI.Data;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.OpenApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json.Serialization;
using LaundryManagerAPI.Helpers;
using Microsoft.IdentityModel.Tokens;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using System.Text;
using Microsoft.AspNetCore.Authentication.Cookies;
using System.Security.Claims;
using Microsoft.AspNetCore.Http;
using Microsoft.Net.Http.Headers;

namespace LaundryManagerAPI
{
    public class Startup
    {

        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        private void CheckSameSite(HttpContext httpContext, CookieOptions options)
        {
            if (options.SameSite == Microsoft.AspNetCore.Http.SameSiteMode.Lax)
            {

                var userAgent = httpContext.Request.Headers["User-Agent"].ToString();
                // TODO: Use your User Agent library of choice here.

                // For .NET Core < 3.1 set SameSite = (SameSiteMode)(-1)
                options.SameSite = Microsoft.AspNetCore.Http.SameSiteMode.None;
                options.Path = "/";
                options.Secure = true;
                //options.Domain = "https://192.168.1.191:8086/";
            }
        }
        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {

            

            services.AddControllersWithViews().AddNewtonsoftJson(options =>
            options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore)
                .AddNewtonsoftJson(options => options.SerializerSettings.ContractResolver
                = new DefaultContractResolver());

            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "Laundry Manager API", Version = "v1" });
            });
            services.AddDbContext<ApplicationDBContext>(options => options.UseSqlServer(Configuration.GetConnectionString("DefaultConnection")));
           
            services.AddScoped<JwtService>();
            services.AddScoped<Userservices>();

            services.AddControllersWithViews();

            services.Configure<CookiePolicyOptions>(options =>
            {
                options.MinimumSameSitePolicy = Microsoft.AspNetCore.Http.SameSiteMode.None;
                options.OnAppendCookie = cookieContext =>
                    CheckSameSite(cookieContext.Context, cookieContext.CookieOptions);
                options.OnDeleteCookie = cookieContext =>
                    CheckSameSite(cookieContext.Context, cookieContext.CookieOptions);
            });

            //services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
            //    .AddJwtBearer(options =>
            //    {
            //        options.TokenValidationParameters = new TokenValidationParameters
            //        {
            //            ValidateIssuer = true,
            //            ValidateAudience = true,
            //            ValidateLifetime = true,
            //            ValidateIssuerSigningKey = true,
            //            ValidIssuer = "localhost:3000",
            //            ValidAudience = "localhost:3000",
            //            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8
            //                .GetBytes("thisisverysecretkey123445")),

            //        };
            //    });

            //services.AddAuthorization(auth =>
            //{
            //    auth.AddPolicy("Bearer", policy =>
            //    {
            //        policy.AddAuthenticationSchemes(JwtBearerDefaults.AuthenticationScheme);
            //        policy.RequireAuthenticatedUser();
            //    });
            //});


            services.AddAuthentication(options =>
            {
                options.DefaultScheme = CookieAuthenticationDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = CookieAuthenticationDefaults.AuthenticationScheme;

                //options.DefaultSignInScheme = CookieAuthenticationDefaults.AuthenticationScheme;
                //options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                //options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
                //options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;

                // options.DefaultScheme = "Cookies";
                //opt.DefaultChallengeScheme = CookieAuthenticationDefaults.AuthenticationScheme;

                //var cookieoptions = new CookieOptions
                //{
                //    HttpOnly = true,
                //    SameSite = SameSiteMode.None,
                //};


            }).AddJwtBearer("Bearer", jwtbearerOptions =>
            {
                jwtbearerOptions.RequireHttpsMetadata = false;
                jwtbearerOptions.SaveToken = true;
                jwtbearerOptions.TokenValidationParameters = new TokenValidationParameters
                {

                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("thisisverysecretkey123445")),
                    ValidateIssuer = false,
                    ValidateAudience = false,
                    ValidateLifetime = true,
                    ClockSkew = TimeSpan.FromDays(5)
                };

            })
            .AddCookie(opt =>
            {
                //opt.Cookie.Domain = "https://192.168.1.191:8086";
                //opt.Cookie.Name = "AspRemCookie";
                opt.Cookie.SameSite = Microsoft.AspNetCore.Http.SameSiteMode.None;
                //opt.Cookie.HttpOnly = true;
                // opt.Cookie.SameSite = Microsoft.AspNetCore.Http.SameSiteMode.None;
                //opt.LoginPath = "/api/Auth/login";
                opt.Events = new CookieAuthenticationEvents()
                {
                    OnRedirectToAccessDenied = cookieContext =>
                    {
                        cookieContext.Response.StatusCode = 403;
                        return Task.CompletedTask;
                    },
                    OnRedirectToLogin = context =>
                    {
                        context.RedirectUri = "/";
                        context.Response.StatusCode = StatusCodes.Status401Unauthorized;
                        return Task.CompletedTask;
                    },
                    OnSigningIn = async context =>
                    {
                        context.CookieOptions.SameSite = Microsoft.AspNetCore.Http.SameSiteMode.None;
                        var scheme = context.Properties.Items.Where(k => k.Key == ".AuthScheme").FirstOrDefault();
                        var claim = new Claim(scheme.Key, scheme.Value);
                        var claimsIdentity = context.Principal.Identity as ClaimsIdentity;
                        var userService = context.HttpContext.RequestServices.GetRequiredService(typeof(Userservices)) as Userservices;
                        var nameIdentifier = claimsIdentity.Claims.FirstOrDefault(m => m.Type == ClaimTypes.NameIdentifier)?.Value;
                        var roleIdentifier = claimsIdentity.Claims.FirstOrDefault(m => m.Type == ClaimTypes.Role)?.Value;

                        claimsIdentity.AddClaim(claim);
                        await Task.CompletedTask;
                    },
                    OnSignedIn = async context =>
                    {
                        await Task.CompletedTask;
                    },
                    OnValidatePrincipal = async context =>
                    {
                        await Task.CompletedTask;
                    }
                };
            }


            );

            services.AddCors(c =>
            {
                //c.AddPolicy("AllowOrigin", options => options.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());

                c.AddPolicy("AllowOrigin", bilder => bilder.WithOrigins(new[] {"https://apps.reloadedhub.in/","https://laundrymanager.netlify.app/", "https://192.168.1.191:8086", "https://116.72.9.182", "http://116.72.9.182", "https://192.168.1.191:443", "https://localhost:3000", "http://localhost", "https://clickrabbit.in", "https://api.reloadedhub.in" }).AllowAnyMethod().AllowCredentials().AllowAnyHeader().AllowCredentials());

                //new method
                c.AddPolicy("Dev", builder =>
                {
                    builder.WithMethods("GET", "POST", "PATCH", "DELETE", "OPTINS")
                        .WithHeaders(
                        HeaderNames.Accept,
                        HeaderNames.ContentType,
                        HeaderNames.Authorization)
                        .AllowCredentials()
                        .SetIsOriginAllowed(origin =>
                        {
                            if (string.IsNullOrWhiteSpace(origin)) return false;

                            //Testing domain
                            if (origin.ToLower().StartsWith("https://laundrymanager.netlify.app/")) return true;

                            return false;
                        });
                });

            });


        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {


            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "LaundryManagerAPI v1"));
            }

            //app.UseCookiePolicy(
            //    new CookiePolicyOptions
            //    {
            //        Secure = CookieSecurePolicy.Always
            //    });
            app.UseCors(options => options.WithOrigins(new[] {"https://apps.reloadedhub.in/", "https://clickrabbit.in","https://laundrymanager.netlify.app/","https://192.168.1.191:8086", "https://116.72.9.182", "https://192.168.1.191:443", "https://api.reloadedhub.in","https://localhost:3000", "http://116.72.9.182", "http://localhost" }).AllowAnyMethod().AllowAnyHeader().AllowCredentials());
            //app.UseCors(options => options.WithOrigins().AllowAnyMethod().AllowAnyHeader().AllowCredentials());

            //using new Cros policy
            app.UseRouting();
            app.UseCors("Dev");
            app.UseAuthentication();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
