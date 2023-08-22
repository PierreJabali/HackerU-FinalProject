namespace Models
{
    public class OrderRequest
    {
        public ApplicationUser User { get; set; }
        public List<ProductInfo> Cart { get; set; }
    }
}
