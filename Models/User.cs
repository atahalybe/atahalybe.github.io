using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace BeautySoul_Core.Models
{
    public class User
    {
        [Key]
        public int id { get; set; }
        public string uid { get; set; }
        public string email { get; set; }
        public bool emailVerified { get; set; }
        public string phoneNumber { get; set; }
        public string displayName { get; set; }
        public string photoURL { get; set; }
        public string path { get; set; }
        public string password { get; set; }
        public bool isAdmin { get; set; }
    }
}
