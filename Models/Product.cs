using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace LaundryManagerAPI.Models
{
    public class Product
    {
        [Key]
        public int ProductID { get; set; }
        [Required(ErrorMessage = "ProductName Required")]
        public string ProductName { get; set; }
        public double ProductRate { get; set; }

        [ForeignKey("CategoryID")]
        public int ProductCategoryID { get; set; }


        public bool Flag { get; set; }
    }
}
