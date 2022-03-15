using LaundryManagerAPI.Helpers;
using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations;

namespace LaundryManagerAPI.Models
{
    public class Users
    {
        [Key]
        public int UserID { get; set; }
        [Required(ErrorMessage ="Username required")]
        public string UserName { get; set; }
        [Required(ErrorMessage = "Name required")]
        public string Name { get; set; }
        [Required(ErrorMessage = "Address required")]
        public string Address { get; set; }
        public string Area { get; set; }
        public string City { get; set; }
        public string ContactNumber { get; set; }
        public string PhysicalRole{ get; set; }
        [Required(ErrorMessage = "userpassword required")]

        [JsonIgnore] public string UserPassword   { get; set; }
        
        [Required(ErrorMessage = "usertype required")]
        public string UserType { get; set; }//Technical Roles
        public int BranchID { get; set; }
        public bool Flag { get; set; }//Active Flag
    }
}
