using System;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Extensions;
using API.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

public class BasketController(StoreContext context,
    DiscountService couponService, PaymentsService paymentsService) : BaseApiController
{
    [HttpGet]
    public async Task<ActionResult<BasketDto>> GetBasket()
    {
        var basketIdFromCookie = Request.Cookies["basketId"];
        Console.WriteLine($"GetBasket - Cookie basketId: {basketIdFromCookie}");

        var basket = await RetrieveBasket();

        if (basket == null)
        {
            Console.WriteLine("GetBasket - No basket found");
            return NoContent();
        }

        Console.WriteLine($"GetBasket - Basket found with {basket.Items.Count} items");
        return basket.ToDto();
    }

    [HttpPost]
    public async Task<ActionResult<BasketDto>> AddItemToBasket(int productId, int quantity)
    {
        var basketIdFromCookie = Request.Cookies["basketId"];
        Console.WriteLine($"AddItemToBasket - Cookie basketId: {basketIdFromCookie}");

        var basket = await RetrieveBasket();

        if (basket == null)
        {
            Console.WriteLine("AddItemToBasket - Creating new basket");
            basket = CreateBasket();
        }
        else
        {
            Console.WriteLine($"AddItemToBasket - Existing basket found: {basket.BasketId}");
        }

        var product = await context.Products.FindAsync(productId);

        if (product == null) return BadRequest("Problem adding item to basket");

        basket.AddItem(product, quantity);

        var result = await context.SaveChangesAsync() > 0;

        if (result)
        {
            Console.WriteLine($"AddItemToBasket - Success. Basket now has {basket.Items.Count} items");
            return CreatedAtAction(nameof(GetBasket), basket.ToDto());
        }

        return BadRequest("Problem updating basket");
    }

    [HttpDelete]
    public async Task<ActionResult> RemoveBasketItem(int productId, int quantity)
    {
        var basket = await RetrieveBasket();

        if (basket == null) return BadRequest("Unable to retrieve basket");

        basket.RemoveItem(productId, quantity);

        var result = await context.SaveChangesAsync() > 0;

        if (result) return Ok();

        return BadRequest("Problem updating basket");
    }

    [HttpPost("{code}")]
    public async Task<ActionResult<BasketDto>> AddCouponCode(string code)
    {
        // get the basket
        var basket = await RetrieveBasket();
        if (basket == null || string.IsNullOrEmpty(basket.ClientSecret)) return BadRequest("Unable to apply voucher");

        // get the coupon
        var coupon = await couponService.GetCouponFromPromoCode(code);
        if (coupon == null) return BadRequest("Invalid coupon");

        // update the basket with the coupon
        basket.Coupon = coupon;

        // update the payment intent
        var intent = await paymentsService.CreateOrUpdatePaymentIntent(basket);
        if (intent == null) return BadRequest("Problem applying coupon to basket");

        // save changes and return BasketDto if successful
        var result = await context.SaveChangesAsync() > 0;

        if (result) return CreatedAtAction(nameof(GetBasket), basket.ToDto());

        return BadRequest("Problem updating basket");
    }

    [HttpDelete("remove-coupon")]
    public async Task<ActionResult> RemoveCouponFromBasket()
    {
        // get the basket
        var basket = await RetrieveBasket();
        if (basket == null || basket.Coupon == null || string.IsNullOrEmpty(basket.ClientSecret))
            return BadRequest("Unable to update basket with coupon");

        var intent = await paymentsService.CreateOrUpdatePaymentIntent(basket, true);
        if (intent == null) return BadRequest("Problem removing coupon from basket");

        basket.Coupon = null;

        var result = await context.SaveChangesAsync() > 0;

        if (result) return Ok();

        return BadRequest("Problem updating basket");
    }

    private Basket CreateBasket()
    {
        var basketId = Guid.NewGuid().ToString();
        Console.WriteLine($"CreateBasket - New basketId: {basketId}");

        var cookieOptions = new CookieOptions
        {
            IsEssential = true,
            Expires = DateTime.UtcNow.AddDays(30),
            HttpOnly = false, // Allow JavaScript to read the cookie
            SameSite = SameSiteMode.None, // Required for cross-origin
            Secure = true // Required when SameSite=None
        };
        Response.Cookies.Append("basketId", basketId, cookieOptions);
        Console.WriteLine("CreateBasket - Cookie set");

        var basket = new Basket { BasketId = basketId };
        context.Baskets.Add(basket);
        return basket;
    }

    private async Task<Basket?> RetrieveBasket()
    {
        return await context.Baskets
            .Include(x => x.Items)
            .ThenInclude(x => x.Product)
            .FirstOrDefaultAsync(x => x.BasketId == Request.Cookies["basketId"]);
    }
}
