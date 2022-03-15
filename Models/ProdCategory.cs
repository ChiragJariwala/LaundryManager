
using System.ComponentModel.DataAnnotations;

namespace LaundryManagerAPI.Models
{
    public class ProdCategory
    {
        [Key]
        public int CateID{ get; set; }
        public string Description { get; set; }
    }
}
