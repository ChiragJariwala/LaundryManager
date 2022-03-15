using System;
using System.ComponentModel.DataAnnotations;

namespace LaundryManagerAPI.Models
{
    public class MemberShipHistory
    {
        [Key]
        public int MemberHistoryID { get; set; }
        [Required(ErrorMessage ="customer ID not given")]
        public int CustomerID { get; set; }
        [Required(ErrorMessage = "membership ID not given")]
        public int MembershipID { get; set; }
        [Required(ErrorMessage = "rechage date not given")]
        public DateTime RechargeDate { get; set; }       
        public bool DeleteFlag { get; set; }
        

    }
}
