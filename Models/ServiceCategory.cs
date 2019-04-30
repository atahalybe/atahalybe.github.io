using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace BeautySoul_Core.Models
{
    public class ServiceCategory
    {
        [Key]
        public int serviceCategoryId { get; set; }
        public string serviceCategoryTitle { get; set; }
    }
}
