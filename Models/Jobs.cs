using System;
using System.ComponentModel.DataAnnotations;

namespace LaundryManagerAPI.Models
{
    public class Jobs
    {
        //public int JobId { get; set; }
        [Key]
        public int id { get; set; }

        public string JobNumber { get; set; }
        [Required(ErrorMessage = "CustomerID Required")]
        public int CustomerID { get; set; }
        [Required(ErrorMessage = "JobDate Required")]
        public DateTime JobDate { get; set; }
       
        public string DeliveryType { get; set; }
        [Required(ErrorMessage = "BranchID Required")]
        public int BranchID { get; set; }
        [Required(ErrorMessage = "UserID Required")]
        public int UserID { get; set; }

        public bool Flag { get; set; }//ActiveFlag

        //discount, Amount and Total withDiscount

    }
}
