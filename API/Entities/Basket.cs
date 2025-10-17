using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Entities
{
    public class Basket
    {
        public int Id { get; set; }
        public required string BasketId { get; set; }
        public List<BasketItem> Items { get; set; } = new List<BasketItem>();


        public void addItem(Product product, int quantity)
        {
            if (product == null) ArgumentNullException.ThrowIfNull(product);
            if (quantity <= 0) throw new ArgumentException("Quantity must be greater than zero", nameof(quantity));
            var existingItem = FindItem(product.Id);

            if(existingItem == null)
            {
                var basketItem = new BasketItem
                {
                    Product = product,
                    ProductId = product.Id,
                    Quantity = quantity
                };
                Items.Add(basketItem);
            }
            else
            {
                existingItem.Quantity += quantity;
            }
        }

        private BasketItem? FindItem(int productId)
        {
            return Items.FirstOrDefault(i => i.ProductId == productId);
        }
        

        public void RemoveItem(int productId,int quantity)
        {
            if (quantity <= 0) throw new ArgumentException("Quantity must be greater than zero", nameof(quantity));
            var item = FindItem(productId);
            if (item != null)
            {
                item.Quantity -= quantity;
                if (item.Quantity <= 0)
                {
                    Items.Remove(item);
                }
            }
        }
    }
}