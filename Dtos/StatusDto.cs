using System;

namespace LaundryManagerAPI.Dtos
{
    public class StatusDto
    {
        public string Status { get; set; }//gives status of job wheather it is done or not
        public string JobLocation { get; set; }
        public DateTime StatusDate { get; set; }
        public string JobNumber { get; set; }
        public bool Flag { get; set; }
    }
}
