using LaundryManagerAPI.Data;
using LaundryManagerAPI.Dtos;
using LaundryManagerAPI.Helpers;
using LaundryManagerAPI.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;

namespace LaundryManagerAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class JobStatusController : ControllerBase
    {
        private readonly ApplicationDBContext _context;
        private readonly Userservices _userservice;

        private readonly JwtService _jwtService;
        public JobStatusController(ApplicationDBContext context, JwtService jwtService, Userservices userservices)
        {
            _context = context;
            _jwtService = jwtService;
            _userservice = userservices;    
        }

        [HttpGet, Route("GetAllJobStatus")]
        public JsonResult GetAlltblJobStatus() => new JsonResult(_context.tblJobStatus.ToList());

        [HttpGet, Route("GetJobStatusByID")]
        public JsonResult GettblJobStatusByID(int statID) => new JsonResult(_context.tblJobStatus.Where(x => x.JobStatusID == statID).ToList());

        [HttpPost]
        public JsonResult UpdateJobStatus(StatusDto status)
        {
            try
            {   
                var job = _context.tblJobs.Where(x=> x.id == Convert.ToInt32(status.JobNumber)).FirstOrDefault();
                var JobLocation = status.JobLocation;
                if(status.JobLocation == "select")//for make delivery(to find the branch from factory)
                {

                    var branch= _context.tblBranch.Where(x => x.BranchID == job.BranchID).FirstOrDefault();
                    JobLocation = branch.BranchName;
                }
                var updateStatus = new JobStatus
                {
                    Status = status.Status,
                    JobNumber = status.JobNumber,
                    JobLocation = JobLocation,
                    StatusDate = DateTime.UtcNow,
                    Flag = true,
                };

                _context.tblJobStatus.Add(updateStatus);
                _context.SaveChanges();

                return new JsonResult($"Job no {updateStatus.JobNumber} sent to {updateStatus.JobLocation} sucsessfully ");
            }
            catch (Exception)
            {

                return new JsonResult("Please try again!");
            }
            
        }
    }
}
