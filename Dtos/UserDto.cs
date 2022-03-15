using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations;

namespace LaundryManagerAPI.Dtos
{
    public class UserDto
    {
        public int UserID { get; set; }
        public string UserName { get; set; }
        public string Name { get; set; }
        public string Address { get; set; }
        public string Area { get; set; }
        public string City { get; set; }
        public string ContactNumber { get; set; }
        public string PhysicalRole { get; set; }
        public string UserPassword { get; set; }
        public string UserType { get; set; }//Technical Roles
        public int BranchID { get; set; }
        public string BranchName{ get; set; }
        public bool Flag { get; set; }
    }
}
