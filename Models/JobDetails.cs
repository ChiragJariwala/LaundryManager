using System;
using System.ComponentModel.DataAnnotations;

namespace LaundryManagerAPI.Models
{
    public class JobDetails
    {
        [Key]
        public int DetailsID { get; set; }
        [Required(ErrorMessage = "Job Number Required")]
        public string JobNumber{ get; set; }
        [Required(ErrorMessage = "ProductID Required")]
        public int ProductID { get; set; }
        [Required(ErrorMessage = "Qty Required")]
        public int Qty { get; set; }
        public double Amonunt{ get; set; }
        public bool Flag { get; set; }
    }
}
