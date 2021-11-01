using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

// DTO stands for "Data Transfer Objects"
namespace API.DTOs
{
    public class BasketDto
    {
        public int Id { get; set; }
        public string BuyerId { get; set; }

        public List<BasketItemDto> Items { get; set; }
    }
}