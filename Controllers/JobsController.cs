using LaundryManagerAPI.Data;
using LaundryManagerAPI.Helpers;
using LaundryManagerAPI.Models;
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
using System.Threading;
using System.Web.Http.Cors;

namespace LaundryManagerAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [EnableCorsAttribute("*","*","*")]
    [Authorize]
    public class JobsController : ControllerBase
    {
        private readonly IConfiguration _connection;
        private readonly ApplicationDBContext _context;
        private readonly JwtService _jwtService;

        public JobsController(ApplicationDBContext context, JwtService jwtService, IConfiguration configuration)
        {
            _context = context;
            _connection = configuration;
            _jwtService = jwtService;
        }

        [HttpGet, Route("GetJobByID")]
        // public JsonResult GetJobByID(string JobID) => new JsonResult(_context.tblJobs.Where(x=> x.JobNumebr ==JobID).ToList());
        public JsonResult GetJobByID(string JobID)
        {
            string sql = $@"Select * from JobById where JobNumber = '{JobID}'";
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
            return   new JsonResult(dt);
        }

        [HttpGet,Route("GetAllJobs")]
        public JsonResult GetAllJobs()
        {
            string sql = @"select * from GetAllJobsList where flag = 1";
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

        [HttpGet, Route("GetDeletedJobs")]
        public JsonResult GetDeletedJobs()
        {
            string sql = @"select * from GetAllJobsList where Flag = 0";
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

        [HttpGet, Route("GetAllJobsByCompletion")]
        public JsonResult GetAllJobsByCompletion(string com)
        {
            string sql = @"Select * from [dbo].[GetAllJobs] where Status = '" + com + "'";
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

        [HttpGet, Route("GetJobDetailsByID")]
        public  IActionResult GetJobDetailsByID(string jobnumber)
        {
            //var jobdetails = _context.tblJobDetails.Where(x=>x.JobNumber == jobnumber).ToList();
            string sql = $"Select * from JobDetailsView where JobNumber = '{jobnumber}'";
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

        [HttpGet, Route("GetJobsFromBranch")]
        public IActionResult GetJobsFromBranch(string UserName)
        {
            var user = _context.tblUsers.Where(x => x.UserName == UserName).FirstOrDefault();
            var userLocation = _context.tblBranch.Where(x => x.BranchID == user.BranchID).FirstOrDefault();
            string sql= $@"Select * from branchtemp";
            if (user.UserType != "Admin")
            {
                sql += $@" where JobLocation = '{userLocation.BranchName}'";
            }
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

        [HttpGet, Route("GetJobsDelivery")]
        public IActionResult GetJobsDelivery(string UserName)
        {
            var user = _context.tblUsers.Where(x => x.UserName == UserName).FirstOrDefault();
            var userLocation = _context.tblBranch.Where(x => x.BranchID == user.BranchID).FirstOrDefault();
            string sql = $@"Select * from [dbo].[Deliverytemp]";
            if (user.UserType != "Admin")
            {
                sql += $@" where JobLocation = '{userLocation.BranchName}'";
            }

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

        [HttpGet, Route("GetJobsFromFactory")]
        [Authorize(Roles ="Admin")]
        public IActionResult GetAllJobsFactory()
        {
     
            string sql;

            sql = $@"Select * from factorytemp";
         


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

        //[Route("CreateJobStauts")]
        //[HttpPost]
        //public IActionResult CreateJobStauts(JobStatus JobStatus)
        //{   
        //    if(JobStatus.JobLocation == "Select")
        //    {

        //    }
        //    try
        //    {
        //        _context.tblJobStatus.Add(JobStatus);
        //        _context.SaveChanges();
        //        return Ok("success");
        //    }
        //    catch (System.Exception)
        //    {

        //        throw;
        //    }

        //}

        [Route("Jobcount")]
        [HttpGet]
        public JsonResult GetJobCounts()
        {
            try
            {
                var count = _context.tblJobs.Count();
                return new JsonResult(count);
            }
            catch (System.Exception)
            {

                return new JsonResult("Error", "Bad Request");
            }

        }

        [Route("CreateNewJob")]
        [HttpPost]
        public JsonResult Create(Jobs jobs)
        {

            try
            {
                var count = _context.tblJobs.Count() + 1;
                var newJob = new Jobs()
                {
                    JobNumber = $"J0{count}",
                    JobDate = DateTime.UtcNow.Date,
                    BranchID = jobs.BranchID,
                    CustomerID = jobs.CustomerID,
                    DeliveryType = jobs.DeliveryType,
                    Flag = true,
                    UserID = jobs.UserID,
                    
                };

                var branch = _context.tblBranch.Where(x => x.BranchID == newJob.BranchID).FirstOrDefault();
                var jobStatus = new JobStatus
                {
                    JobLocation = branch.BranchName,
                    Status = "Incomplete",
                    JobNumber = count.ToString(),
                    StatusDate = System.DateTime.Today,
                    Flag = true,
                };

                var newJobId = _context.tblJobs.Add(newJob);
                _context.SaveChanges();
                var JobStatus = _context.tblJobStatus.Add(jobStatus);
                _context.SaveChanges();

                //var newID = newJobId.Entity.JobNumber;
                return new JsonResult(newJobId.Entity.JobNumber);
            }
            catch (System.Exception)
            {

                return new JsonResult(BadRequest());
            }
        }

        [HttpPost, Route("JobDetails")]
        public IActionResult JobDetails(JobDetails jobDetails)
        {
            try
            {
                _context.tblJobDetails.Add(jobDetails);
                _context.SaveChanges();
                return Ok("success");
            }
            catch (System.Exception)
            {

                throw;
            }
        }

        [HttpPut, Route("UpdateJobDetails")]
        public IActionResult UpdateJobDetails(JobDetails jobDetails)
        {

            try
            {
                _context.tblJobDetails.Update(jobDetails);
                _context.SaveChanges();
                return Ok("success");
            }
            catch (System.Exception)
            {

                throw;
            }
        }

        [HttpDelete("{id}")]
        public JsonResult Delete(int id)
        {
            string query = @"
                           update dbo.tblJobs
                           set Flag = 0
                           where Id=@Id
                            ";

            DataTable table = new DataTable();
            string sqlDataSource = _connection.GetConnectionString("DefaultConnection");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@Id", id);
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }
            return new JsonResult("Deleted Successfully");
        }

        [HttpDelete("DeleteDetails/{id}")]
        public JsonResult DeleteJobDetails(int id)
        {
            string query = @"
                           delete from  dbo.tblJobDetails
                           where DetailsID=@Id
                            ";

            DataTable table = new DataTable();
            string sqlDataSource = _connection.GetConnectionString("DefaultConnection");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@Id", id);
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
