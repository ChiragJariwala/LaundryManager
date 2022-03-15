using System.ComponentModel.DataAnnotations;

namespace LaundryManagerAPI.Models
{
    public class Membership
    {
        [Key]
        public int MembershipID { get; set; }
        [Required(ErrorMessage = "MembershipName required")]
        public string MembershipName { get; set; }
        [Required(ErrorMessage = "BasePrice required")]
        public double BasePrice { get; set; }
        public double DiscountOnProduct { get; set; }
        public int ExpressDeliveryCount { get; set; }
        public bool Flag { get; set; }
    }
}
