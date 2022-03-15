using LaundryManagerAPI.Data;
using LaundryManagerAPI.Dtos;
using LaundryManagerAPI.Models;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;

namespace LaundryManagerAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]


    public class UserController : ControllerBase
    {
        private readonly ApplicationDBContext _context;
        private readonly IConfiguration _connection;

        public UserController(ApplicationDBContext context, IConfiguration configuration )
        {
            _context = context;
            _connection = configuration;
        }

        [HttpGet, Route("GetAllUsers")]
        public JsonResult GetAllUsers()
        {
            string sql = $@"Select * from tblUsers as u inner join tblBranch as b on b.BranchID = u.BranchID ";
            DataTable dt = new DataTable();
            string sqlDatastore = _connection.GetConnectionString("Default");
            SqlDataReader myReader;

            using (SqlConnection sqlConnection = new SqlConnection(sqlDatastore))
            {
                sqlConnection.Open();
                using (SqlCommand myCmmnd = new SqlCommand(sql, sqlConnection))
                {
                    myReader = myCmmnd.ExecuteReader();
                    dt.Load(myReader);
                    myReader.Close();
                    sqlConnection.Close();
                }

            }
            return new JsonResult(dt);
        }

        //(_context.tblUsers.Join(_context.tblBranch, u => u.BranchID,b =>b.BranchID, (u, b) => new { tblUsers = u, tblBranch = b
   // }).ToList())

        [HttpGet, Route("GetActiveUsers")]
        public JsonResult GetActiveUsers()
        {
            return new JsonResult(_context.tblUsers.Where(x => x.Flag == true).ToList());
        }

        [HttpGet, Route("GetDeletedUsers")]
        public JsonResult GetDeletedUsers()
        {
            return new JsonResult(_context.tblUsers.Where(x => x.Flag == false).ToList());
        }

        [HttpGet, Route("GetUsersByID")]
        public JsonResult GetUsersByID(int userID) => new JsonResult(_context.tblUsers.Where(x=>x.UserID == userID).ToList());

        [HttpPost, Route("CreateNewUser")]
        public JsonResult Create(UserDto user)
        {

            {
                var newuser = new Users
                {
                    UserName = user.UserName,
                    Name = user.Name,
                    PhysicalRole = user.PhysicalRole,
                    Address = user.Address,
                    Area = user.Area,
                    City = user.City,
                    ContactNumber = user.ContactNumber,
                    UserPassword = BCrypt.Net.BCrypt.HashPassword(user.UserPassword),
                    BranchID = user.BranchID,
                    UserType = user.UserType,
                    Flag = user.Flag
                };

                _context.tblUsers.Add(newuser);
                _context.SaveChanges();
                var use = _context.tblUsers.FirstOrDefault(u => u.UserID == user.UserID);
                return new JsonResult(use);

            }

        }

        [HttpPut, Route("UpdateUser")]
        public IActionResult UpdateUser(UserDto user)
        {
            
            VerefyUser();
            Users newuser = new ()
            {
                    UserID = user.UserID,
                    Name = user.Name,
                    PhysicalRole = user.PhysicalRole,
                    Address = user.Address,
                    Area = user.Area,
                    City = user.City,
                    ContactNumber = user.ContactNumber,
                    UserName = user.UserName,
                    UserPassword = BCrypt.Net.BCrypt.HashPassword(user.UserPassword),
                    BranchID = user.BranchID,
                    UserType = user.UserType,
                    Flag = user.Flag
            };

                _context.tblUsers.Update(newuser);
                _context.SaveChanges();
                var use = _context.tblUsers.FirstOrDefault(u => u.UserID == user.UserID);
                return Ok("Update Sucsess");

            
            
        }

        [HttpDelete("{id}")]
        public JsonResult Delete(int id)
        {

            string query = @"
                           update dbo.tblUsers
                           set Flag = 0
                            where UserID=@UserID
                            ";

            DataTable table = new DataTable();
            string sqlDataSource = _connection.GetConnectionString("DefaultConnection");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@UserID", id);

                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult("Deleted Successfully");
        }

        [NonAction]
        public JsonResult VerefyUser()
        {

            if (Request.Cookies["JwtBearer"] == null)
            {

                return new JsonResult(Unauthorized());
            }
            else return new JsonResult(StatusCode(200));
        }
    }
}
