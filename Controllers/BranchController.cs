using LaundryManagerAPI.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Linq;
using LaundryManagerAPI.Models;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Cors;
using System.Data;
using Microsoft.Extensions.Configuration;
using System.Data.SqlClient;

namespace LaundryManagerAPI.Controllers
{
    [Route("api/[controller]")]
    [EnableCors]
    [ApiController]
    [Authorize]
    public class BranchController : ControllerBase
    {
        private readonly ApplicationDBContext _context;
        private readonly IConfiguration _connection;

        public BranchController(ApplicationDBContext context , IConfiguration configuration  )
        {
            _context = context;
            _connection = configuration;    
        }

        [HttpGet, Route("GetAllBranch")]
        public JsonResult GetAllBranch()
        {
            //var jwt = Request.Cookies["JwtBearer"];
            //if (jwt == null) return new JsonResult(Unauthorized());
            var branchs = _context.tblBranch.Where(x=>x.DeleteFlag == false ).ToList();
            return new JsonResult(branchs);
        }

        [HttpGet, Route("GetBranchByID")]
        public JsonResult GetBranchByID(int brID)
        {
            string sql = $@"Select * from tblBranch where BranchID = '{brID}'";
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

        [Authorize(Roles = "Admin")]
        [HttpPost,Route("CrateNewBranch")]
        public IActionResult CrateNewBranch(Branch branch)
        {
            try
            {
                _context.tblBranch.Add(branch);
                _context.SaveChanges();
                return Ok("success");
            }
            catch (System.Exception)
            {

                return BadRequest();
            }

        }


        [HttpPut, Route("UpdateBranch")]
        [Authorize(Roles = "Admin")]
        public IActionResult UpdateBranch(Branch branch)
        {
            try
            {
                _context.tblBranch.Update(branch);
                _context.SaveChanges();
                return Ok("update successful");
            }
            catch (System.Exception)
            {

                return BadRequest();
            }
           
        }

        [HttpDelete, Route("DeleteBranch")]
        [Authorize(Roles = "Admin")]
        public IActionResult DeleteBranch(int id)
        {
            try
            {
                string query = @"
                        update [dbo].[tblBranch]
                        set DeleteFlag = 1
                        where BranchID=@BranchID;
                            ";

                DataTable table = new DataTable();
                string sqlDataSource = _connection.GetConnectionString("DefaultConnection");
                SqlDataReader myReader;
                using (SqlConnection myCon = new SqlConnection(sqlDataSource))
                {
                    myCon.Open();
                    using (SqlCommand myCommand = new SqlCommand(query, myCon))
                    {
                        myCommand.Parameters.AddWithValue("@BranchID", id);

                        myReader = myCommand.ExecuteReader();
                        table.Load(myReader);
                        myReader.Close();
                        myCon.Close();
                    }
                    return Ok("update successful");
                }
            }
            catch (System.Exception)
            {
                return BadRequest();
            }
        }
    }
}
