using System;
using System.ComponentModel.DataAnnotations;

namespace LaundryManagerAPI.Models
{
    public class Branch
    {
        [Key]
        public int BranchID { get; set; }
        [Required(ErrorMessage = "BranchName required")]
        public string BranchName { get; set; }
        [Required(ErrorMessage = "BranchType required")]
        public string  BranchType  { get; set; }
        public string BranchAddress { get; set; }
        public DateTime ActivationDate { get; set; }
        public bool DeleteFlag { get; set; }
    }
}
