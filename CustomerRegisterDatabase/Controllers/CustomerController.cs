using CustomerRegisterDatabase.Entities;
using Microsoft.AspNetCore.Mvc;

namespace CustomerRegisterDatabase.Controllers
{
    [Route("api/customers")]
    public class CustomerController : Controller
    {
        private DatabaseContext databaseContext;

        public CustomerController(DatabaseContext databaseContext)
        {
            this.databaseContext = databaseContext;
            databaseContext.Database.EnsureCreated();
        }

        [HttpPost]
        public IActionResult Add(Customer customer)
        {
            databaseContext.Add(customer);
            databaseContext.SaveChanges();

            return Ok(customer.Id);
        }
        [HttpPut]
        public IActionResult Edit(Customer customer)
        {
            databaseContext.Update(customer);
            databaseContext.SaveChanges();
            return Ok(customer.Id);
        }
        [HttpDelete]
        public IActionResult Delete(Customer customer)
        {
            databaseContext.Remove(customer);
            databaseContext.SaveChanges();
            return Ok(customer.Id);
        }
        [HttpGet]
        public IActionResult GetCustomers()
        {
            return Ok(databaseContext.Customers);
        }

    }
}
