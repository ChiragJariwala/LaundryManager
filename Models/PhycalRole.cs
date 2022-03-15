using System.ComponentModel.DataAnnotations;

namespace LaundryManagerAPI.Models
{
    public class PhycalRole
    {
        [Key]
        public int RoleID { get; set; }
        public string  PhyRole { get; set; }
    }
}
