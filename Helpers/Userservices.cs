using LaundryManagerAPI.Data;
using LaundryManagerAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace LaundryManagerAPI.Helpers
{
    public class Userservices
    {
        private readonly ApplicationDBContext _context;
        public Userservices(ApplicationDBContext context)
        {
            _context = context;

        }

        public Users GetUserByID(int id)
        {
            var appuser = _context.tblUsers.Find(id);
            return appuser;
        }

        public bool TryValidateUser(string username, string password, out List<Claim> claims)
        {
            claims = new List<Claim>();
            var appUser = _context.tblUsers
                .Where(a => a.UserName == username)
                .FirstOrDefault();
            var verified = BCrypt.Net.BCrypt.Verify(password,appUser.UserPassword);

            if (appUser is null)
            {
                return false;
            }
            else
            {
                claims.Add(new Claim(ClaimTypes.NameIdentifier, username));
                claims.Add(new Claim("username", username));
                claims.Add(new Claim(ClaimTypes.GivenName, appUser.UserName));
                claims.Add(new Claim(ClaimTypes.Role, appUser.UserType));

            }
            return true;
        }
    }
}
