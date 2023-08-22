namespace Models
{
    public class CustomOrderInfo
    {
        public int OrderId { get; set; }
        public string OrderNo { get; set; }
        public DateTime OrderDate { get; set; }
        public string Status { get; set; }
        public string Payment_Mode { get; set; }
        public decimal TotalAmount { get; set; }
        public string PostalCode { get; set; }
        public string FullName { get; set; }
    }
}
