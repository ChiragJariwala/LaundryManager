using System.ComponentModel.DataAnnotations;

namespace LaundryManagerAPI.Models
{
    public class UserType
    {
        [Key]
        public int TypeID { get; set; }
        public string  RoleName { get; set; }
    }
}
