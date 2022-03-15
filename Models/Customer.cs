using LaundryManagerAPI.Helpers;
using System.ComponentModel.DataAnnotations;

namespace LaundryManagerAPI.Models
{
    public class Customer 
    {
        //customer table refrence tblcustomer
        [Key]
        public int CustomerID { get; set; }
        [Required]
        public string CustomerName { get; set; }
        public string Phone { get; set; }
        [Required]
        public string Address { get; set; }

        public int CustomerTag { get; set; }//to identify customer based on reputation
        public bool ActiveFlag { get; set; }//flag : used for active/blocked customers

        public bool DeleteFlag { get; set; }//flag : used for Deleted customers
        public double Balance { get; set; }
        public bool ActiveMembership { get; set; }

        public int Area { get; set; }

    }
}
