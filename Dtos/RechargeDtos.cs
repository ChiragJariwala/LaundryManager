using System;

namespace LaundryManagerAPI.Dtos
{
    public class RechargeDtos
    {
        public int CustomerID{ get; set; }
        public double RechargeAmnt { get; set; }
        public DateTime RechargeDate{ get; set; }
        public int MembershipID { get; set; }
    }
}
