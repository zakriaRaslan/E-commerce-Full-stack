namespace Ecommerce.Api.Models
{
    public class Product
    {
        public int ProductId { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public decimal Price { get; set; }
        public int Quantity { get; set; }
        public string? ImageName { get; set; }
        public Offer Offer { get; set; } = new Offer();
        public ProductCategory Category { get; set; }
    }
}
