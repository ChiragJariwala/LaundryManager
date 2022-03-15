using System.ComponentModel.DataAnnotations;

namespace LaundryManagerAPI.Models
{
    public class Bill
    {
        [Key]
        public int Id { get; set; }
        public string JobNumber { get; set; }
        public double BillAmount { get; set; }
        public int CustomerID { get; set; }
        public double DiscountedAmount{ get; set; }
        public double PayableAmount { get; set; }
        public bool DeleteFlag{ get; set; }
        public bool PaidFlag{ get; set; }
        public bool Flag { get; set; }
    }
}
