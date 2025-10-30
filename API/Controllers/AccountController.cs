using System;
using API.DTOs;
using API.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

public class AccountController(SignInManager<User> signInManager) : BaseApiController
{
    [HttpPost("register")]
    public async Task<ActionResult> RegisterUser(RegisterDto registerDto)
    {
        var user = new User { UserName = registerDto.Email, Email = registerDto.Email };

        var result = await signInManager.UserManager.CreateAsync(user, registerDto.Password);

        if (!result.Succeeded)
        {
            foreach (var error in result.Errors)
            {
                ModelState.AddModelError(error.Code, error.Description);
            }

            return ValidationProblem();
        }

        await signInManager.UserManager.AddToRoleAsync(user, "Member");

        return Ok();
    }

    [HttpPost("login")]
    public async Task<ActionResult> Login(RegisterDto loginDto)
    {
        var user = await signInManager.UserManager.FindByEmailAsync(loginDto.Email);

        if (user == null) return Unauthorized();

        var result = await signInManager.PasswordSignInAsync(user, loginDto.Password, isPersistent: true, lockoutOnFailure: false);

        if (!result.Succeeded) return Unauthorized();

        return Ok();
    }

    [HttpGet("user-info")]
    public async Task<ActionResult> GetUserInfo()
    {
        Console.WriteLine($"IsAuthenticated: {User.Identity?.IsAuthenticated}");
        Console.WriteLine($"User.Identity.Name: {User.Identity?.Name}");
        Console.WriteLine($"AuthenticationType: {User.Identity?.AuthenticationType}");

        if (!User.Identity?.IsAuthenticated ?? true)
        {
            Console.WriteLine("User is not authenticated");
            return Unauthorized();
        }

        var user = await signInManager.UserManager.Users
            .FirstOrDefaultAsync(x => x.UserName == User.Identity!.Name);

        if (user == null)
        {
            Console.WriteLine($"User not found for username: {User.Identity?.Name}");
            return Unauthorized();
        }

        var roles = await signInManager.UserManager.GetRolesAsync(user);
        Console.WriteLine($"User roles: {string.Join(", ", roles)}");

        return Ok(new
        {
            user.Email,
            user.UserName,
            Roles = roles
        });
    }

    [HttpPost("logout")]
    public async Task<ActionResult> Logout()
    {
        await signInManager.SignOutAsync();

        return NoContent();
    }

    [Authorize]
    [HttpPost("address")]
    public async Task<ActionResult<Address>> CreateOrUpdateAddress(Address address)
    {
        var user = await signInManager.UserManager.Users
            .Include(x => x.Address)
            .FirstOrDefaultAsync(x => x.UserName == User.Identity!.Name);

        if (user == null) return Unauthorized();

        user.Address = address;

        var result = await signInManager.UserManager.UpdateAsync(user);

        if (!result.Succeeded) return BadRequest("Problem updating user address");

        return Ok(user.Address);
    }

    [Authorize]
    [HttpGet("address")]
    public async Task<ActionResult<Address>> GetSavedAddress()
    {
        var address = await signInManager.UserManager.Users
            .Where(x => x.UserName == User.Identity!.Name)
            .Select(x => x.Address)
            .FirstOrDefaultAsync();

        if (address == null) return NoContent();

        return address;
    }
}
