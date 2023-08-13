namespace Ecommerce.Api.Models.Dto
{
    public class InsertItemToCartDTO
    {
        public string UserId { get; set; }
        public int ProductId { get; set; }
        public int quantity { get; set; }
    }
}
