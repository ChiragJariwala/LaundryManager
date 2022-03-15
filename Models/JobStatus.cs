using System;
using System.ComponentModel.DataAnnotations;

namespace LaundryManagerAPI.Models
{
    public class JobStatus
    {
        [Key]
        public int JobStatusID { get; set; }
        [Required(ErrorMessage = "Status Required")]
        public string Status { get; set; }//gives status of job wheather it is done or not
        [Required(ErrorMessage = "JobLocation Required")]
        public string JobLocation { get; set; }
        [Required(ErrorMessage = "StatusDate Required")]
        public DateTime StatusDate { get; set; }
        [Required(ErrorMessage = "JobNumber  Required")]
        public string JobNumber { get; set; }
        public bool Flag { get; set; }
    }
}
