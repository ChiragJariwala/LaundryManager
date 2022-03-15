using LaundryManagerAPI.Data;
using LaundryManagerAPI.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.Extensions.Configuration;
using System.Data;
using System.Data.SqlClient;

namespace LaundryManagerAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class ProductController : ControllerBase
    {
        private readonly ApplicationDBContext _context;
        private readonly IConfiguration _connection;

        public ProductController(ApplicationDBContext context, IConfiguration configuration)
        {
            _context = context;
            _connection = configuration;
        }

        [HttpGet, Route("GetAllProduct")]
        public JsonResult GetAllProduct()
        {

            string sql = $@"Select * from GetProducts";
            DataTable dt = new DataTable();
            string sqlDatastore = _connection.GetConnectionString("Default");
            SqlDataReader myReader;

            using (SqlConnection sqlConnection = new SqlConnection(sqlDatastore))
            {
                sqlConnection.Open();
                using (SqlCommand myCmmnd = new SqlCommand(sql, sqlConnection))
                {
                    myReader = myCmmnd.ExecuteReader();
                    dt.Load(myReader);
                    myReader.Close();
                    sqlConnection.Close();
                }

            }
            return new JsonResult(dt);
        }
        [HttpGet, Route("GetProductByID")]
        public JsonResult GetProductByID(int prodID) => new JsonResult(_context.tblProduct.Where(x => x.ProductID == prodID).ToList());

        [HttpGet, Route("ProductCatagory")]
        public JsonResult GetProductCategory() => new JsonResult(_context.tblProdCategory.ToList());

        [HttpGet, Route("GetProductByGroup")]
        public JsonResult GetProductByGroup(int GroupID) => new JsonResult(_context.tblProduct.Where(x => x.ProductCategoryID == GroupID).ToList());

        [HttpPost, Route("CrateNewProduct")]
        public IActionResult CrateNewProduct(Product Product)
        {
            try
            {
                _context.tblProduct.Add(Product);
                _context.SaveChanges();
                return Ok("success");
            }
            catch (System.Exception)
            {

                return BadRequest();
            }

        }

        [HttpPost, Route("CreateProductCategory")]
        public IActionResult CreateProductCategory(ProdCategory prodCategory)
        {
            try
            {
                _context.tblProdCategory.Add(prodCategory);
                _context.SaveChanges(true);
                return Ok("New category added!");
            }
            catch(System.Exception ex)
            {
                return new JsonResult(ex.Message);
            }
        }

        [HttpPut, Route("UpdateProduct")]
        public IActionResult UpdateProduct(Product Product)
        {
            try
            {
                _context.tblProduct.Update(Product);
                _context.SaveChanges();
                return Ok("update successful");
            }
            catch (System.Exception)
            {

                return BadRequest();
            }

        }
    }
}
