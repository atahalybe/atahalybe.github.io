using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace BeautySoul_Core.Models
{
    public class Service
    {
        [Key]
        public int serviceId { get; set; }
        public string serviceTitle { get; set; }
        public double price { get; set; }
        public string imageURL { get; set; }
        public string description { get; set; }
        public int serviceCategoryId { get; set; }
        public virtual ServiceCategory serviceCategory { get; set; }
    }
}
