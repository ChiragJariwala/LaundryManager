using System.ComponentModel.DataAnnotations;

namespace LaundryManagerAPI.Models
{
    public class CustomerType
    {
        [Key]
        public int CusttomerTypeID { get; set; }

        [Required(ErrorMessage = "BranchName required")]
        public string CustomerTypeName { get; set; }
    }
}
