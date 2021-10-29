using System.ComponentModel.DataAnnotations.Schema;

namespace API.Entities
{
    // Here with this DataAnnotations, I am changing the name of the table
    [Table("BasketItems")]
    public class BasketItem
    {
        // Thi this is generated automatically
        public int Id { get; set; }
        public int Quantity { get; set; }

        // navigation properties
        // This ProductId is generated automatically
        public int ProductId { get; set; }
        public Product Product { get; set; }

        public int BasketId { get; set; }
        public Basket Basket { get; set; }
    }
}