using System.ComponentModel.DataAnnotations;

namespace LaundryManagerAPI.Models
{
    public class Locality
    {
        [Key]
        public int id{ get; set; }

        public string LocalArea{ get; set; }
    }
}
