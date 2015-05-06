using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel.DataAnnotations;

namespace $rootnamespace$.Models
{
    public class ContactModel : BaseModel
    {
        public ContactModel() { }
        public ContactModel(IPublishedContent content) : base(content) { }  
    
        [Required]
        public string Name { get; set; }

        [Required]
        [EmailAddress]
        public string Email { get; set; }
        
        [Required]
        [MinLength(20, ErrorMessage = "Your message is less than 20 characters. Please provide more details to your message.")]
        public string Message { get; set; }
    }
}