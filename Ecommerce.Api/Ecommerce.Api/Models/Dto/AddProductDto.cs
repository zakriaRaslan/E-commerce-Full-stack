namespace Ecommerce.Api.Models.Dto
{
    public class AddProductDto
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public decimal Price { get; set; }
        public int Quantity { get; set; }
        public string ImageName { get; set; }
        public int CategoryId { get; set; }
        public int? OfferId { get; set; }
    }
}
