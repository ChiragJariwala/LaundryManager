using LaundryManagerAPI.Data;
using LaundryManagerAPI.Dtos;
using LaundryManagerAPI.Helpers;
using LaundryManagerAPI.Models;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace LaundryManagerAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {

        private class ValidatedUser
        {
            public string UserName { get; set; }
            public string UserType{ get; set; }
            public string BranchName { get; set; }
        }


        private readonly ApplicationDBContext _context;
        private readonly Userservices _userservice;
        private readonly IConfiguration _connection;
        private readonly JwtService _jwtService;

        public AuthController(ApplicationDBContext context,JwtService jwtService, Userservices userservices, IConfiguration configuration)
        {
            _context = context;
            _jwtService = jwtService;
            _userservice = userservices;
            _connection = configuration;
        }

        [HttpPost, Route("Login")]
        [AllowAnonymous]
        public async Task<IActionResult> LoginAsync(LoginDtos user)
        {
            var newuser = _context.tblUsers.FirstOrDefault(u => u.UserName == user.UserName);
            if (newuser == null) return BadRequest(new { message = "invalid email"});

            if(!BCrypt.Net.BCrypt.Verify(user.Password,newuser.UserPassword))
            {
                return BadRequest(new { message = "invalid password" });
            }

            var brName = _context.tblBranch.Where(u => u.BranchID == newuser.BranchID).FirstOrDefault();
           
            //AuthUser userPass = new AuthUser()
            //{
            //    UserName =newuser.UserName,    
            //    Name =  newuser.Name,
            //    Address = newuser.Address,
            //    Area = newuser.Area,
            //    City = newuser.City,
            //    BranchID = newuser.BranchID,
            //    BranchName = brName.BranchName,
            //    ContactNumber = newuser.ContactNumber,  
            //    PhysicalRole = newuser.PhysicalRole,    
            //    UserType = newuser.UserType,
            //    Flag = newuser.Flag
            //};

            //var jwt = _jwtService.Generate(newuser.UserID);

            //Response.Cookies.Append("JwtBearer", jwt, new CookieOptions
            //{
            //    HttpOnly = true,
            //    Secure = true,
            //    SameSite = SameSiteMode.None,

            //});

            //return Ok(new
            //{
            //    jwt,
            //    newuser,
            //});

            //OLD method
            if (_userservice.TryValidateUser(user.UserName, user.Password, out List<Claim> claim))
            {
                var claims = new List<Claim>();
                var claimsIdentity = new ClaimsIdentity(claim, CookieAuthenticationDefaults.AuthenticationScheme);
                var claimsPrincipal = new ClaimsPrincipal(claimsIdentity);
                var items = new Dictionary<string, string>();
                items.Add(".AuthScheme", CookieAuthenticationDefaults.AuthenticationScheme);
                var properties = new AuthenticationProperties(items);
                await HttpContext.SignInAsync(claimsPrincipal, properties);
                //var CookieOptions = new CookieOptions
                //{
                //    Secure = true,
                //    HttpOnly = true,
                //    SameSite = SameSiteMode.None
                //};

                //    var claimsIdentity = new ClaimsIdentity(new[]
                //    {
                //    new Claim(ClaimTypes.Name,user.UserName),

                //    new Claim(ClaimTypes.NameIdentifier,user.UserName)
                //}, "Cookies");

                //    var claimsPrincipal = new ClaimsPrincipal(claimsIdentity);

                //    await Request.HttpContext.SignInAsync("Cookies", claimsPrincipal);

                List<ValidatedUser> ActiveUser = new();
                ActiveUser.Add(new ValidatedUser { UserName= newuser.UserName, BranchName = brName.BranchName, UserType = newuser.UserType });


                return new JsonResult(ActiveUser);
               // return Ok("Login Sucsess!");
            }
            else
            {
                return Ok("login failed");
            }
        }

        [HttpPost,Route("Logout")]
        public async Task<IActionResult> Logout()
        {
            await HttpContext.SignOutAsync();
            Response.Cookies.Delete("JwtBearer");
            return Ok("Logout Sucsess");
        }

        //[HttpGet, Route("AuthorizedJobs")]
        //public IActionResult getJobs()
        //{
        //    var jwt = Request.Cookies["JwtBearer"];
        //    if (jwt == null) return Unauthorized();
        //    else
        //    {
        //        var token = _jwtService.Verify(jwt);

        //        int userId = int.Parse(token.Issuer);

        //        var user = _context.tblUsers.FirstOrDefault(x => x.UserID == userId);

        //        //_context.tblUsers.FirstOrDefault()
        //        return Ok(user);

        //    }
           
        //}
       
    }

    
}
