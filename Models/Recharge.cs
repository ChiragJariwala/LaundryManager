using System;
using System.ComponentModel.DataAnnotations;

namespace LaundryManagerAPI.Models
{
    public class Recharge
    {
        [Key]
        public int RechargeID { get; set; }
        public int CustomerID { get; set; }
        public DateTime RechargeDate{ get; set; }
        public double RechargeAmnt { get; set; }
        public double PreviousBalance { get; set; }
        public double AfterBalance { get; set; }
        public int MembershipID { get; set; }
        public bool DeleteFlag { get; set; }
    }
}
