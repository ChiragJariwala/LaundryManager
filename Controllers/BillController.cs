using LaundryManagerAPI.Data;
using LaundryManagerAPI.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
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
    public class BillController : ControllerBase
    {
        private readonly ApplicationDBContext _context;
        private readonly IConfiguration _connection;

        // private readonly IDbConnection _dbConnection;

        public BillController(IConfiguration configuration, ApplicationDBContext dBContext)
        {
            _connection = configuration;
            _context = dBContext;
        }

        [HttpGet, Route("GetAllBills")]
        public JsonResult GetAllBills()
        {
            try
            {
                string sql = @" select* from tblBill as b
                        inner join tblJobs as j
                        on b.jobnumber = j.JobNumber
                        inner join tblCustomers as c
                        on b.CustomerID = c.CustomerID
                            order by b.Id desc";
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
            catch(Exception ex)
            {
                return new JsonResult(ex);
            }
        }

        [HttpPost,Route("GenerateBill")]
        public IActionResult GenerateBill(string jnumber,bool paidFlag)
        {
            string sql = @" select* from GetAllJobs where JobNumber = '" + jnumber + "'";
            DataTable dt = new DataTable();
            string sqlDatastore = _connection.GetConnectionString("Default");
            SqlDataReader myReader;
            double ttlamnt = 0;
            double payablePrice = 0;

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
            
            var job = _context.tblJobs.Where(x=>x.JobNumber == jnumber).FirstOrDefault();
            var cid = job.CustomerID;
            
            string csql = @"Select * from dbo.tblCustomers where CustomerID = " + cid + "";
            SqlDataAdapter da;
            DataSet ds = new DataSet();
            using (SqlConnection con = new SqlConnection(_connection.GetConnectionString("Default")))
            {
                con.Open();
                using (da = new SqlDataAdapter(csql, con))
                {
                    da.Fill(ds);
                    con.Close();
                }

            }
            
            Recharge membership = null;
            
            var hasMembership = Convert.ToBoolean(ds.Tables[0].Rows[0]["ActiveMembership"].ToString());
            if (hasMembership == true)
            {
                membership = _context.tblRecharge.Where(x => x.CustomerID == job.CustomerID).OrderByDescending(x => x.RechargeID).FirstOrDefault();
                var discount = _context.tblMembership.Where(x => x.MembershipID== membership.MembershipID).FirstOrDefault();
                ttlamnt = (double)dt.Rows[0]["ttlAmount"];
                payablePrice = (double)(1 - (discount.DiscountOnProduct / 100)) * ttlamnt;
            }

            TextInfo textInfo = new CultureInfo("en-US", false).TextInfo;
            var oldBalance = Convert.ToDouble(ds.Tables[0].Rows[0]["Balance"]);
            
            Customer newCust = new()
            {
                CustomerID = job.CustomerID,
                CustomerName = ds.Tables[0].Rows[0]["CustomerName"].ToString(),
                Address = ds.Tables[0].Rows[0]["Address"].ToString(),
                ActiveFlag = Convert.ToBoolean(ds.Tables[0].Rows[0]["ActiveFlag"]),
                Phone = ds.Tables[0].Rows[0]["Phone"].ToString(),
                Area = Convert.ToInt32(ds.Tables[0].Rows[0]["Area"]),
                Balance =  oldBalance - payablePrice,
                ActiveMembership = Convert.ToBoolean(ds.Tables[0].Rows[0]["ActiveMembership"]),
                CustomerTag = Convert.ToInt32(ds.Tables[0].Rows[0]["CustomerTag"])
            };

            Bill newbill = new()
            { 
                BillAmount = ttlamnt,
                CustomerID = job.CustomerID,
                DiscountedAmount = ttlamnt-payablePrice,
                JobNumber = job.JobNumber,
                PayableAmount = payablePrice,
                DeleteFlag = false,
                PaidFlag = paidFlag,
                Flag = true,
            };
            
            _context.tblBill.Add(newbill);
            _context.Update(newCust);
            _context.SaveChanges();
            return new JsonResult(newbill);
        }
    }
}
