using LaundryManagerAPI.Data;
using LaundryManagerAPI.Dtos;
using LaundryManagerAPI.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System;
using System.Data;
using System.Data.SqlClient;
using System.Globalization;
using System.Linq;

namespace LaundryManagerAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RechargeController : ControllerBase
    {
        private readonly ApplicationDBContext _context;
        private readonly IConfiguration _connection;
        TextInfo textInfo = new CultureInfo("en-US", false).TextInfo;
        
        public RechargeController(IConfiguration configuration, ApplicationDBContext dBContext)
        {
            _connection = configuration;
            _context = dBContext;

        }

        [HttpGet, Route("GetRechargeByID")]
        public JsonResult GetRechargeByID(int rechargeID)
        {
            string sql = $@"Select * from tblRecharge where RechargeID = '{rechargeID}'";
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

        [HttpGet, Route("GetAllRecharge")]
        public JsonResult GetAllRecharge()
        {
            string sql = $@"Select * from tblRecharge order by RechargeID desc ";
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

        [HttpPut, Route("RechargeCustomer")]
        public JsonResult MembershipRecharge(RechargeDtos recharge)
        {
            string sql = @"Select * from dbo.tblCustomers where CustomerID = " + recharge.CustomerID + "";
            DataTable dt = new DataTable();
            SqlDataAdapter da;
            DataSet ds = new DataSet();
            using (SqlConnection con = new SqlConnection(_connection.GetConnectionString("Default")))
            {
                con.Open();
                using (da = new SqlDataAdapter(sql, con))
                {
                    da.Fill(ds);
                    con.Close();
                }

            }

            var oldBalance = Convert.ToDouble(ds.Tables[0].Rows[0]["Balance"]);
            Customer newCust = new()
            {
                CustomerID = recharge.CustomerID,
                CustomerName = ds.Tables[0].Rows[0]["CustomerName"].ToString(),
                Address = ds.Tables[0].Rows[0]["Address"].ToString(),
                ActiveFlag = true,
                DeleteFlag = false,
                Phone = ds.Tables[0].Rows[0]["Phone"].ToString(),
                Area = Convert.ToInt32(ds.Tables[0].Rows[0]["Area"]),
                Balance = recharge.RechargeAmnt + oldBalance,
                ActiveMembership = false,
                CustomerTag = Convert.ToInt32(ds.Tables[0].Rows[0]["CustomerTag"])
            };

            Recharge newRecharge = new()
            {
                CustomerID = recharge.CustomerID,
                RechargeDate = DateTime.Now,
                RechargeAmnt = recharge.RechargeAmnt,
                PreviousBalance = oldBalance,
                AfterBalance = oldBalance + recharge.RechargeAmnt,
                MembershipID = recharge.MembershipID,
                DeleteFlag = false
            };

            var cash = _context.tblMembership.Where(x => x.MembershipName.ToLower() == "cash").FirstOrDefault();
            if (newRecharge.MembershipID != cash.MembershipID)
            {
                MemberShipHistory memberShipHistory = new()
                {
                    CustomerID = newRecharge.CustomerID,
                    MembershipID = newRecharge.MembershipID,
                    RechargeDate = DateTime.Now,
                    DeleteFlag = false
                };

                newCust.ActiveMembership = true;
                var newMemberShipHistory = _context.tblMemberShipHistory.Add(memberShipHistory);
            }

            var newsrecharge = _context.tblRecharge.Add(newRecharge);
            var newbalanceOfCust = _context.Update(newCust);

            _context.SaveChanges();

            return new JsonResult("insert success");
        }

        [HttpDelete("{id}")]
        public JsonResult Delete(int id)
        {
            string query = @"
                           update dbo.tblRecharge
                           set DeleteFlag = 1
                            where RechargeID=@RechargeID;
                            ";

            DataTable table = new DataTable();
            string sqlDataSource = _connection.GetConnectionString("DefaultConnection");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@RechargeID", id);
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }
            string sql = @"Select * from dbo.tblCustomers 
                            where 
                            CustomerID = (
                            select CustomerID from tblRecharge 
                            where RechargeID = " + id + ") ";
            DataTable dt = new DataTable();
            SqlDataAdapter da;
            DataSet ds = new DataSet();
            using (SqlConnection con = new SqlConnection(_connection.GetConnectionString("Default")))
            {
                con.Open();
                using (da = new SqlDataAdapter(sql, con))
                {
                    da.Fill(ds);
                    con.Close();
                }

            }

            var recharge = _context.tblRecharge.Where(x=>x.RechargeID == id).FirstOrDefault();
            var oldBalance = Convert.ToDouble(ds.Tables[0].Rows[0]["Balance"]);

            Customer newCust = new()
            {
                CustomerID = recharge.CustomerID,
                CustomerName = ds.Tables[0].Rows[0]["CustomerName"].ToString(),
                Address = ds.Tables[0].Rows[0]["Address"].ToString(),
                ActiveFlag = true,
                DeleteFlag = false,
                Phone = ds.Tables[0].Rows[0]["Phone"].ToString(),
                Area = Convert.ToInt32(ds.Tables[0].Rows[0]["Area"]),
                Balance = oldBalance - recharge.RechargeAmnt,
                ActiveMembership = false,
                CustomerTag = Convert.ToInt32(ds.Tables[0].Rows[0]["CustomerTag"])
            };
            _context.tblCustomers.Update(newCust);
            _context.SaveChanges();
            return new JsonResult("Deleted Successfully");
        }

    }
}
