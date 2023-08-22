using BarberShop.Models;
using DataAccess.Repository.IRepository;
using EStore.Helpers;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Models;

namespace EStore.Controllers
{
    [ApiController]
    public class AdminController : ControllerBase
    {
        private readonly IUnitOfWork _UnitOfWork;
        private readonly IWebHostEnvironment _hostEnvironment;
        private readonly EmailHelper _manager;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly SignInManager<ApplicationUser> _signInManager;
        private const string ValidChars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!@#$%^&*()_+-=[]{}|;:,.<>?";
        public AdminController(
            IUnitOfWork UnitOfWork,
            IWebHostEnvironment hostEnvironment,
            EmailHelper manager,
            UserManager<ApplicationUser> userManager,
            SignInManager<ApplicationUser> signInManager)
        {
            _UnitOfWork = UnitOfWork;
            _hostEnvironment = hostEnvironment;
            _manager = manager;
            _userManager = userManager;
            _signInManager = signInManager;
        }

        #region Customer
        [HttpGet]
        [Route("api/Customer/GetCustomers")]
        public async Task<ActionResult> GetCustomers(int page = 1, int pageSize = 10)
        {
            try
            {
                if (pageSize < 10 || pageSize > 100)
                {
                    return BadRequest("Invalid page size. Page size must be between 1 and 100.");
                }

                int totalCount = _UnitOfWork.Users.Count();
                int totalPages = (int)Math.Ceiling((double)totalCount / pageSize);

                if (page > totalPages)
                {
                    page = totalPages;
                }

                int skip = (page - 1) * pageSize;
                var usersWithRoles = await _UnitOfWork.Users.GetUsersWithRolesAsync(skip, pageSize);

                return Ok(usersWithRoles);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { error = ex.Message });
            }
        }
        [HttpGet]
        [Route("api/Customer/GetImage/{imageName}")]
        public IActionResult GetCustomerImage(string imageName)
        {
            var imagePath = Path.Combine(_hostEnvironment.WebRootPath, @"images\Customers\", imageName);

            if (!System.IO.File.Exists(imagePath))
            {
                return NotFound();
            }

            var imageStream = System.IO.File.OpenRead(imagePath);
            return File(imageStream, "image/jpeg"); // Adjust the content type as needed
        }
        [Route("api/Customer/DeleteCustomer/{id}")]
        [HttpDelete]
        public IActionResult DeleteCustomer(string id)
        {
            try
            {
                var users = _UnitOfWork.Users.FirstOrDefault(x => x.Id == id);

                if (users == null)
                {
                    return NotFound();
                }

                users.isDeleted = true;
                _UnitOfWork.Users.Update(users);
                _UnitOfWork.Save();

                return Ok(true);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { error = ex.Message });
            }
        }
        #endregion

        #region Product Category

        [HttpGet]
        [Route("api/Category/GetCategory")]
        public IActionResult GetUpperCategory(int page = 1, int pageSize = 10)
        {
            try
            {
                if (pageSize < 10 || pageSize > 100)
                {
                    return BadRequest("Invalid page size. Page size must be between 1 and 100.");
                }
                int totalCount = _UnitOfWork.Category.Count(x => x.isDeleted == false);
                int totalPages = (int)Math.Ceiling((double)totalCount / pageSize);
                if (page > totalPages)
                {
                    page = totalPages;
                }
                int skip = (page - 1) * pageSize;
                var obj = _UnitOfWork.Category.GetAll(x => x.isDeleted == false)
                    .Skip(skip)
                    .Take(pageSize)
                    .ToList();
                return Ok(obj);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { error = ex.Message });
            }
        }

        [HttpGet]
        [Route("api/Category/GetCategoryById/{id}")]
        public IActionResult GetCategoryById(int? id)
        {
            try
            {
                if (id == null || id <= 0)
                {
                    return BadRequest();
                }

                var category = _UnitOfWork.Category.FirstOrDefault(x => x.Id == id && x.isDeleted == false);

                if (category == null)
                {
                    return NotFound();
                }

                return Ok(category);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { error = ex.Message });
            }
        }
        [HttpPost]
        [Route("api/Category/UpsertCategory")]
        public IActionResult UpsertCategory([FromForm] Category category)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                category.isDeleted = false;
                if (category.Id == 0) // Assuming 0 is the default value for a new category
                {
                    var existingCategory = _UnitOfWork.Category.FirstOrDefault(x => x.Name == category.Name);

                    if (existingCategory != null)
                    {
                        return BadRequest("Category Already Exists!!");
                    }

                    _UnitOfWork.Category.Add(category);
                }
                else
                {
                    _UnitOfWork.Category.Update(category);
                }

                _UnitOfWork.Save();

                return Ok(category);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { error = ex.Message });
            }
        }
        [Route("api/Category/DeleteCategory/{id}")]
        [HttpDelete]
        public IActionResult DeleteCategory(int id)
        {
            try
            {
                var category = _UnitOfWork.Category.FirstOrDefault(x => x.Id == id);

                if (category == null)
                {
                    return NotFound();
                }

                category.isDeleted = true;
                _UnitOfWork.Category.Update(category);
                _UnitOfWork.Save();

                return Ok(true);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { error = ex.Message });
            }
        }
        #endregion

        #region Product
        [HttpGet]
        [Route("api/Product/GetProducts")]
        public IActionResult GetProducts(int page = 1, int pageSize = 10)
        {
            try
            {
                if (pageSize < 6 || pageSize > 100)
                {
                    return BadRequest("Invalid page size. Page size must be between 1 and 100.");
                }
                int totalCount = _UnitOfWork.Product.Count(x => x.isDeleted == false);
                int totalPages = (int)Math.Ceiling((double)totalCount / pageSize);
                if (page > totalPages)
                {
                    page = totalPages;
                }
                int skip = (page - 1) * pageSize;
                var obj = _UnitOfWork.Product.GetAll(x => x.isDeleted == false)
                    .Skip(skip)
                    .Take(pageSize)
                    .ToList();
                return Ok(obj);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { error = ex.Message });
            }
        }

        [HttpGet]
        [Route("api/Product/GetCategories")]
        public IActionResult GetCategories()
        {
            try
            {
                var obj = _UnitOfWork.Category.GetAll(x => x.isDeleted == false)
                    .ToList();
                return Ok(obj);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { error = ex.Message });
            }
        }

        [HttpGet]
        [Route("api/Product/GetImage/{imageName}")]
        public IActionResult GetImage(string imageName)
        {
            var imagePath = Path.Combine(_hostEnvironment.WebRootPath, @"images\Products\", imageName);

            if (!System.IO.File.Exists(imagePath))
            {
                return NotFound();
            }

            var imageStream = System.IO.File.OpenRead(imagePath);
            return File(imageStream, "image/jpeg"); // Adjust the content type as needed
        }

        [HttpPost]
        [Route("api/Product/UpsertProduct")]
        public IActionResult UpsertProduct([FromForm] Product product)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                string wwwRootPath = _hostEnvironment.WebRootPath;

                if (product.Profile != null)
                {
                    string filename = Guid.NewGuid().ToString();
                    var uploads = Path.Combine(wwwRootPath, @"images\Products");
                    var extension = Path.GetExtension(product.Profile.FileName);

                    if (!string.IsNullOrEmpty(product.Image))
                    {
                        var oldImagePath = Path.Combine(wwwRootPath, @"images\Products", product.Image.TrimStart('\\'));
                        if (System.IO.File.Exists(oldImagePath))
                        {
                            System.IO.File.Delete(oldImagePath);
                        }
                    }

                    using (var fileStream = new FileStream(Path.Combine(uploads, filename + extension), FileMode.Create))
                    {
                        product.Profile.CopyTo(fileStream);
                    }

                    product.Image = filename + extension;
                }
                product.isDeleted = false;

                if (product.Id == 0)
                {
                    _UnitOfWork.Product.Add(product);
                }
                else
                {
                    _UnitOfWork.Product.Update(product);
                }

                _UnitOfWork.Save();
                return Ok(product);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { error = ex.Message });
            }
        }
        [Route("api/Product/DeleteProduct/{id}")]
        [HttpDelete]
        public IActionResult DeleteProduct(int id)
        {
            try
            {
                var product = _UnitOfWork.Product.FirstOrDefault(x => x.Id == id);

                if (product == null)
                {
                    return NotFound();
                }

                product.isDeleted = true;
                _UnitOfWork.Product.Update(product);
                _UnitOfWork.Save();

                return Ok(true);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { error = ex.Message });
            }
        }
        #endregion

        #region ContactUs
        [HttpPost]
        [Route("api/Message/AddMessage")]
        public IActionResult AddMessage(Message message)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    message.Date = DateTime.Now.ToString();
                    _UnitOfWork.Message.Add(message);
                    _UnitOfWork.Save();
                    return Ok(message);
                }
                else
                {
                    return BadRequest();
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { error = ex.Message });
            }
        }
        [HttpPost]
        [Route("api/Message/SendMessage")]
        public async Task<IActionResult> SendEmailToCustomer([FromForm] SendEmail model)
        {
            try
            {
                var find = _UnitOfWork.Message.FirstOrDefault(x => x.Email == model.Email);

                if (find != null)
                {
                    await _manager.SendEmailFromTemplateAsync(
                            model.Email ?? "",
                            "CustomerTemplate.html",
                            model.Subject ?? "",
                            model.Message_Text ?? "");

                    return Ok(true);
                }

                return BadRequest();
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = ex.Message.ToString() });
            }
        }
        [HttpGet]
        [Route("api/Message/GetMessages")]
        public IActionResult GetMessages(int page = 1, int pageSize = 10)
        {
            try
            {
                if (pageSize < 10 || pageSize > 100)
                {
                    return BadRequest("Invalid page size. Page size must be between 1 and 100.");
                }
                int totalCount = _UnitOfWork.Message.Count();
                int totalPages = (int)Math.Ceiling((double)totalCount / pageSize);
                if (page > totalPages)
                {
                    page = totalPages;
                }
                int skip = (page - 1) * pageSize;
                var obj = _UnitOfWork.Message.GetAll()
                    .Skip(skip)
                    .Take(pageSize)
                    .ToList();
                return Ok(obj);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { error = ex.Message });
            }
        }
        [Route("api/Message/DeleteMessage/{id}")]
        [HttpDelete]
        public IActionResult DeleteMessage(int id)
        {
            try
            {
                var message = _UnitOfWork.Message.FirstOrDefault(x => x.Id == id);

                if (message == null)
                {
                    return NotFound();
                }

                _UnitOfWork.Message.Remove(message);
                _UnitOfWork.Save();

                return Ok(true);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { error = ex.Message });
            }
        }
        #endregion

        #region Settings
        [HttpGet]
        [Route("api/Settings/EmailSettings")]
        public ActionResult EmailSetting()
        {
            try
            {
                var settings = _UnitOfWork.Email.SingleOrDefaultDescending(x => x.Setting_ID);

                if (settings is null)
                {
                    return BadRequest();
                }

                return Ok(settings);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
        [HttpPost]
        [Route("api/Settings/UpdateSettings")]
        public IActionResult SaveEmailSetting([FromForm] EmailSetting obj)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                obj.Last_Updated = DateTime.Now;

                if (obj.Setting_ID == null)
                {
                    _UnitOfWork.Email.Add(obj);
                }
                else
                {
                    _UnitOfWork.Email.Update(obj);
                }

                _UnitOfWork.Save();

                return Ok(new { success = true, message = "Settings saved successfully!" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = ex.Message });
            }
        }
        [HttpPost]
        [Route("api/Settings/UpdateProfile")]
        public async Task<IActionResult> UpdateProfileSettings([FromForm] Profile model)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                var user = _UnitOfWork.Users.FirstOrDefault(x => x.Email == model.Email);

                if (user == null)
                {
                    return BadRequest();
                }

                string wwwRootPath = _hostEnvironment.WebRootPath;

                if (model.Picture != null)
                {
                    string filename = Guid.NewGuid().ToString();
                    var uploads = Path.Combine(wwwRootPath, @"Images/Customers");
                    var extension = Path.GetExtension(model.Picture.FileName);

                    if (!string.IsNullOrEmpty(model.Image))
                    {
                        var oldImagePath = Path.Combine(wwwRootPath, @"Images/Customers", model.Image.TrimStart('\\'));
                        if (System.IO.File.Exists(oldImagePath))
                        {
                            System.IO.File.Delete(oldImagePath);
                        }
                    }

                    using (var fileStream = new FileStream(Path.Combine(uploads, filename + extension), FileMode.Create))
                    {
                        await model.Picture.CopyToAsync(fileStream);
                    }

                    model.Image = filename + extension;
                }

                user.Email = model.Email;
                user.FirstName = model.FirstName;
                user.LastName = model.LastName;
                user.PhoneNumber = model.PhoneNumber;
                user.Country = model.Country;
                user.Address = model.Address;
                user.State = model.State;
                user.PostalCode = model.PostalCode;
                user.Image = model.Image;

                _UnitOfWork.Users.Update(user);
                _UnitOfWork.Save();

                return Ok(model);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = ex.Message.ToString() });
            }
        }
        #endregion

        #region Order
        [HttpPost]
        [Route("api/Order/PlaceOrder")]
        public async Task<IActionResult> PlaceOrder([FromBody] OrderRequest orderModel)
        {
            try
            {
                if (!ModelState.IsValid)
                    return BadRequest(ModelState);

                var user = await _UnitOfWork.Users.GetUsersByEmailAsync(orderModel.User.Email);

                if(user is null)
                {
                    user = new ApplicationUser();
                }

                user.Email = orderModel.User.Email;
                user.FirstName = orderModel.User.FirstName;
                user.LastName = orderModel.User.LastName;
                user.PhoneNumber = orderModel.User.PhoneNumber;
                user.Address = orderModel.User.Address;
                user.State = orderModel.User.State;
                user.PostalCode = orderModel.User.PostalCode;

                _UnitOfWork.Users.Add(user);
                _UnitOfWork.Save();

                decimal totalAmount = orderModel.Cart.Sum(item => item.Subtotal);

                Order order = new Order
                {
                    OrderNo = GenerateOrderNumber(),
                    Date = DateTime.Now,
                    UserId = user.Id,
                    Status = "Pending",
                    Payment_Mode = "Cash",
                    TotalAmount = totalAmount
                };

                _UnitOfWork.Order.Add(order);
                _UnitOfWork.Save();

                foreach (var item in orderModel.Cart)
                {
                    Product product = _UnitOfWork.Product.FirstOrDefault(x => x.Id == item.ProductId);

                    OrderDetail detail = new OrderDetail
                    {
                        ProductId = item.ProductId,
                        OrderQuantity = item.Quantity,
                        OrderId = order.Id,
                        Price = item.SalePrice,
                        Discount = product.Discount
                    };

                    _UnitOfWork.OrderDetail.Add(detail);
                }

                _UnitOfWork.Save();

                return Ok(new { Message = "Order placed successfully" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = ex.Message.ToString() });
            }
        }
        [HttpGet]
        [Route("api/Order/GetAllOrders")]
        public async Task<IActionResult> GetAllOrders()
        {
            try
            {
                var orders = await _UnitOfWork.Order.GetOrdersByCustomers();
                return Ok(orders);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = ex.Message.ToString() });
            }
        }
        [HttpGet]
        [Route("api/Order/GetOrderById/{id}")]
        public async Task<IActionResult> GetOrderById(int id)
        {
            try
            {
                var orders = await _UnitOfWork.Order.GetOrdersDetailsByOrderId(id);
                return Ok(orders);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = ex.Message.ToString() });
            }
        }
        [HttpPost]
        [Route("api/Order/{id}/accept")]
        public IActionResult AcceptOrder(int id)
        {
            var order = _UnitOfWork.Order.FirstOrDefault(x => x.Id == id);

            if (order is null)
            {
                return NotFound();
            }

            if (order.Status == "Pending")
            {
                order.Status = "Accepted";
                _UnitOfWork.Order.Update(order);
                _UnitOfWork.Save();
                return Ok(new { message = "Order accepted successfully." });
            }

            return BadRequest(new { message = "Order cannot be accepted." });
        }
        [HttpPost]
        [Route("api/Order/{id}/delete")]
        public async Task<IActionResult> DeleteOrder(int id)
        {
            var order = await _UnitOfWork.Order.GetOrdersWithDetails(id);

            if (order is null)
            {
                return NotFound();
            }

            // Delete associated order details
            _UnitOfWork.OrderDetail.RemoveRange(order.OrderDetail);

            // Delete the order itself
            _UnitOfWork.Order.Remove(order);

            _UnitOfWork.Save();
            return Ok(new { message = "Order deleted successfully." });
        }
        [HttpPost]
        [Route("api/Order/{id}/cancel")]
        public IActionResult CancelOrder(int id)
        {
            var order = _UnitOfWork.Order.FirstOrDefault(x => x.Id == id);

            if (order is null)
            {
                return NotFound();
            }

            order.Status = "Canceled";
            _UnitOfWork.Order.Update(order);
            _UnitOfWork.Save();

            return Ok(new { message = "Order canceled successfully." });
        }
        #endregion

        #region User
        [HttpGet]
        [Route("api/Users/GetUserById/{id}")]
        public IActionResult GetUserById(string id)
        {
            try
            {
                if (id == "" || id == null)
                {
                    return BadRequest();
                }
                else
                {
                    var obj = _UnitOfWork.Users.FirstOrDefault(x => x.Id == id);
                    return Ok(obj);
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = ex.Message });
            }
        }
        [HttpPost]
        [Route("api/Users/Register")]
        public async Task<IActionResult> Register(ApplicationUser user)
        {
            try
            {
                if (_UnitOfWork.Users.FirstOrDefault(x => x.Email == user.Email) == null)
                {
                    if (!ModelState.IsValid)
                    {
                        return BadRequest(ModelState);
                    }
                    _UnitOfWork.Users.Add(user);
                    _UnitOfWork.Save();
                    if (user.Id != null)
                    {
                        await _userManager.AddToRoleAsync(user, "User");
                    }
                    return Ok(user);
                }
                else
                {
                    return BadRequest("Email already exits!!");
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = ex.Message });
            }
        }
        #endregion

        #region HomePage
        [HttpGet]
        [Route("api/Product/FeaturedProducts")]
        public IActionResult GetFeaturedProds()
        {
            try
            {
                var obj = _UnitOfWork.Product.GetFeaturedProducts().ToList();
                return Ok(obj);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { error = ex.Message });
            }
        }
        [HttpGet]
        [Route("api/Product/GetProductByCategory")]
        public IActionResult GetProductByCategory(string category)
        {
            try
            {
                var obj = _UnitOfWork.Product.GetProductByCategory(category).ToList();
                return Ok(obj);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { error = ex.Message });
            }
        }
        [HttpGet]
        [Route("api/Product/GetProductById/{id}")]
        public IActionResult GetProductById(int? id)
        {
            try
            {
                if (id == 0 || id == null)
                {
                    return BadRequest();
                }
                else
                {
                    var obj = _UnitOfWork.Product.GetProductByProductId(id);
                    return Ok(obj);
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { error = ex.Message });
            }
        }
        [HttpGet]
        [Route("api/Category/GetAllCategories")]
        public IActionResult GetAllCategories()
        {
            try
            {
                var obj = _UnitOfWork.Category.GetAll(x => x.isDeleted == false).ToList();

                return Ok(obj);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { error = ex.Message });
            }
        }
        [HttpGet]
        [Route("api/Product/GetAllProducts")]
        public IActionResult GetAllProducts()
        {
            try
            {
                var products = _UnitOfWork.Product.GetProductByCategory().ToList();

                return Ok(products);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { error = ex.Message });
            }
        }
        #endregion

        #region Functions
        public static string GenerateOrderNumber()
        {
            // Get the current timestamp
            DateTime now = DateTime.Now;

            // Format the timestamp as yyyyMMddHHmmss
            string timestamp = now.ToString("yyyyMMddHHmmss");

            // Generate a random 4-digit number
            Random random = new Random();
            int randomDigits = random.Next(1000, 9999);

            // Combine the timestamp and random digits to create the order number
            string orderNumber = timestamp + randomDigits.ToString();

            return orderNumber;
        }

        private static string GenerateAutoPassword(int length = 12)
        {
            Random random = new Random();
            char[] chars = new char[length];

            // Ensure the password contains at least one non-alphanumeric character
            chars[0] = '!'; // Placeholder for non-alphanumeric character

            // Ensure the password contains at least one uppercase letter
            chars[1] = 'A'; // Placeholder for uppercase letter

            // Ensure the password contains at least one lowercase letter
            chars[2] = 'a'; // Placeholder for lowercase letter

            // Ensure the password contains at least one digit
            chars[3] = '0'; // Placeholder for digit

            for (int i = 4; i < length; i++)
            {
                chars[i] = ValidChars[random.Next(ValidChars.Length)];
            }

            // Fill the placeholders with random characters
            chars[0] = GetRandomNonAlphanumericChar(random);
            chars[1] = (char)random.Next('A', 'Z' + 1);
            chars[2] = (char)random.Next('a', 'z' + 1);
            chars[3] = (char)random.Next('0', '9' + 1);

            // Shuffle the characters to make the password more secure
            for (int i = 0; i < length; i++)
            {
                int randomIndex = random.Next(length);
                char temp = chars[i];
                chars[i] = chars[randomIndex];
                chars[randomIndex] = temp;
            }

            return new string(chars);
        }
        private static char GetRandomNonAlphanumericChar(Random random)
        {
            const string nonAlphanumericChars = "!@#$%^&*()_+-=[]{}|;:,.<>?";
            return nonAlphanumericChars[random.Next(nonAlphanumericChars.Length)];
        }
        #endregion
    }
}