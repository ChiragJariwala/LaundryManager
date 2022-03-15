using LaundryManagerAPI.Data;
using LaundryManagerAPI.Models;
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
    public class MembershipController : ControllerBase
    {
        private readonly ApplicationDBContext _context;
        private readonly IConfiguration _connection;

        public MembershipController(ApplicationDBContext context, IConfiguration configuration)
        {
            _context = context;
            _connection = configuration;
        }

        [HttpGet, Route("GetAllMembership")]
        public JsonResult GetAllMembership() => new JsonResult(_context.tblMembership.ToList());

        [HttpGet, Route("GetMembershipByID")]
        public JsonResult GetMembershipByID(int memID) => new JsonResult(_context.tblMembership.Where(x => x.MembershipID == memID).ToList());

        [HttpGet, Route("GetMembershipHistoryByID")]
        public JsonResult GetMembershipHistoryByID(int memberHistoryID)
        {
            string sql = $@"Select * from tblMembershipHistory where MemberHistoryID= '{memberHistoryID}'";
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


        [HttpPost, Route("CrateNewMembership")]
        public IActionResult CrateNewMembership(Membership Membership)
        {
            try
            {
                _context.tblMembership.Add(Membership);
                _context.SaveChanges();
                return Ok("success");
            }
            catch (System.Exception)
            {

                return BadRequest();
            }
        }

        [HttpPost, Route("MembershipHistory")]
        public IActionResult MembershipHistory(MemberShipHistory MembershipHistory)
        {
            try
            {
                _context.tblMemberShipHistory.Add(MembershipHistory);
                _context.SaveChanges();
                return Ok("success");
            }
            catch (System.Exception)
            {

                return BadRequest();
            }
        }

        [HttpPut, Route("UpdateMembership")]
        public IActionResult UpdateMembership(Membership Membership)
        {
            try
            {
                _context.tblMembership.Update(Membership);
                _context.SaveChanges();
                return Ok("update successful");
            }
            catch (System.Exception)
            {

                return BadRequest();
            }
        }
    }
}
