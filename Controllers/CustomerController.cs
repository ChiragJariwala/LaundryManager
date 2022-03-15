using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Data.SqlClient;
using System.Data;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using System.Collections.Generic;
using LaundryManagerAPI.Models;
using System.Linq;
using LaundryManagerAPI.Data;
using Microsoft.AspNetCore.Authorization;
using System.Globalization;
using LaundryManagerAPI.Dtos;
using System;
using Microsoft.EntityFrameworkCore;

namespace LaundryManagerAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class CustomerController : ControllerBase
    {
        private readonly ApplicationDBContext _context;
        private readonly IConfiguration _connection;
     
       // private readonly IDbConnection _dbConnection;
        
        public CustomerController(IConfiguration configuration, ApplicationDBContext dBContext)
        {
            _connection = configuration;
            _context = dBContext;
            
        }

        [HttpGet,Route("ActiveCustomers")]
        public JsonResult Get()
        {
            string sql = @"Select * from dbo.tblCustomers as c left join tblCustomerType as ct on c.CustomerTag = ct.CusttomerTypeID inner join tblLocality as l on l.id = c.Area where c.ActiveFlag = 1 and c.DeleteFlag=0";
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

        [HttpGet, Route("GetCustomerByID")]
        public JsonResult GetCustomerByID(int custID)
        {
            string sql = $@"Select * from tblCustomers where CustomerID = '{custID}'";
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

        [HttpGet, Route("GetCustomerTypes")]
        public JsonResult GetCustType() => new JsonResult(_context.tblCustomerType.ToList());

        [HttpGet, Route("GetNonActiveCustomers")]
        public JsonResult GetNonActiveCustomers()
        {
            var nonActCust = _context.tblCustomers.Where(x => x.ActiveFlag == false).ToList();
            return new JsonResult(nonActCust);
        }

        [HttpGet, Route("GetdeletedCutomers")]
        public JsonResult GetdeletedCutomers()
        {
            var deletedCust = _context.tblCustomers.Where(x => x.DeleteFlag == true).ToList();
            return new JsonResult(deletedCust);
        }

        [HttpGet, Route("area")]
        public JsonResult getArea()
        {
            return new JsonResult(_context.tblLocality.ToList());
        }

        [HttpGet, Route("DeletedCustomers")]
        public JsonResult GetDeletedCustomers()
        {
            string sql = @"Select * from dbo.tblCustomers as c left join tblCustomerType as ct on c.CustomerTag = ct.CusttomerTypeID inner join tblLocality as l on l.id = c.Area where c.DeleteFlag = 1";
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

        [HttpPost, Route("CreateCustomers")]
        public JsonResult PostCustomerData(Customer customer)
        {
            TextInfo textInfo = new CultureInfo("en-US", false).TextInfo;
            Customer newCust = new()
            {
                CustomerID = customer.CustomerID,
                CustomerName = textInfo.ToTitleCase(customer.CustomerName),
                Address = textInfo.ToTitleCase(customer.Address),
                ActiveFlag = true,
                DeleteFlag = false,
                Phone = customer.Phone,
                Area = customer.Area,
                Balance = 0,
                ActiveMembership = false,
            };
            _context.tblCustomers.Add(newCust);
            _context.SaveChanges();
            return new JsonResult("Insert Successfully");
        }

        [HttpPost, Route("SetCustomerTypes")]
        public JsonResult SetCustomerType(CustomerType customerType)
        {
            _context.tblCustomerType.Add(customerType);
            _context.SaveChanges();
            return new JsonResult(_context.tblCustomerType.ToList());
        }

      
        [HttpPut, Route("UpdateCustomers")]
        public JsonResult UpdateCustomers(Customer customer)
        {
            _context.tblCustomers.Update(customer);
            _context.SaveChanges();
            return new JsonResult("Updated Successfully");
        }

        [HttpDelete("{id}")]
        public JsonResult Delete(int id)
        {
            string query = @"
                           update dbo.tblCustomers
                           set DeleteFlag = 1,
                           ActiveFlag = 0
                           where CustomerID=@CustomerID
                            ";

            DataTable table = new DataTable();
            string sqlDataSource = _connection.GetConnectionString("DefaultConnection");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@CustomerID", id);
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }
            return new JsonResult("Deleted Successfully");
        }
    }
}
