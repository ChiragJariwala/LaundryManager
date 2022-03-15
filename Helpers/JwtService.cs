
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using LaundryManagerAPI.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Microsoft.AspNetCore.Http;

namespace LaundryManagerAPI.Helpers
{
    public class JwtService
    {
        private string secureKey = "thisisverysecretkey123445";
        private ApplicationDBContext _context;

        public JwtService(ApplicationDBContext context)
        {
            _context = context; 
        }
        
        public string Generate(int id)
        {
            var ssy = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secureKey));
            var cred = new SigningCredentials(ssy, SecurityAlgorithms.HmacSha256Signature);
            var header = new JwtHeader(cred);

            var payload = new JwtPayload(id.ToString(),null,null,null,DateTime.Today.AddDays(1));
            var secToken = new JwtSecurityToken(header,payload);

            return new JwtSecurityTokenHandler().WriteToken(secToken);
         }

        public string GenerateToken(string username)
        {
            var ssy = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secureKey));
            var cred = new SigningCredentials(ssy, SecurityAlgorithms.HmacSha256Signature);
            var header = new JwtHeader(cred);
            var user = _context.tblUsers.FirstOrDefault(u => u.UserName == username );
            var userRole = user.UserType;
            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.Name ,username),
                new Claim(ClaimTypes.NameIdentifier, user.UserID.ToString()),
                new Claim(JwtRegisteredClaimNames.Nbf,new DateTimeOffset(DateTime.Now).ToUnixTimeSeconds().ToString()),
                new Claim(JwtRegisteredClaimNames.Exp,new DateTimeOffset(DateTime.Now.AddDays(1)).ToUnixTimeSeconds().ToString()),

            };

            claims.Add(new Claim(ClaimTypes.Role,userRole));    
            
            var secToken = new JwtSecurityToken(header, new JwtPayload(claims));

            //var output = new
            //{
            //    Access_Token = new JwtSecurityTokenHandler().WriteToken(secToken),
            //    UserName = username,

            //};

            return new JwtSecurityTokenHandler().WriteToken(secToken);
        }








        public JwtSecurityToken Verify(string jwt)
        {

            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(secureKey);

            try
            {
                tokenHandler.ValidateToken(jwt, new TokenValidationParameters
                {
                    IssuerSigningKey = new SymmetricSecurityKey(key),
                    ValidateIssuerSigningKey = true,
                    ValidateIssuer = false,
                    ValidateAudience = false,
                }, out SecurityToken validatedToken);

                return (JwtSecurityToken)validatedToken;

            }
            catch (Exception)
            {

                throw;
            }
                         
            
        }

        
        
    }
}
