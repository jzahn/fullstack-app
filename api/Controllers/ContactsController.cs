using Database;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using Model;

namespace api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ContactsController(DatabaseContext context) : ControllerBase
{
    private readonly Database.DatabaseContext _context = context;

    [HttpGet]
    public async Task<IActionResult> ReadAll()
    {
        var contacts = await _context.Contacts
            .OrderBy(c => c.Last_name)
            .ThenBy(c => c.First_name)
            .ToListAsync();
        return Ok(contacts);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> Read(Guid id)
    {
        var contact = await _context.Contacts.FindAsync(id);
        if (contact == null)
        {
            return NotFound();
        }
        return Ok(contact);
    }

    [HttpPost]
    public async Task<IActionResult> Create(Contact contact)
    {
        _context.Contacts.Add(contact);
        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateException dbuex)
        {
            if (dbuex.InnerException is SqlException sqlex &&
                    (sqlex.Number == 2601 || sqlex.Number == 2627))
            {
                throw new Exception("Email address has already been entered for another contact.", dbuex);
            }
            throw;
        }

        _context.Entry(contact).State = EntityState.Added;

        // this always shows as a 500 for some reason
        // return CreatedAtAction("Read", new { id = contact.Id }, contact);
        return Ok(contact.Id);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(Guid id, Contact contact)
    {
        if (!id.Equals(contact.Id))
        {

            return BadRequest();
        }

        _context.Entry(contact).State = EntityState.Modified;

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!Exists(id))
            {
                return NotFound();
            }
            else
            {
                throw;
            }
        }
        catch (DbUpdateException dbuex)
        {
            if (dbuex.InnerException is SqlException sqlex &&
                    (sqlex.Number == 2601 || sqlex.Number == 2627))
            {
                throw new Exception("Email address has already been entered for another contact.", dbuex);
            }
            throw;
        }

        return Ok();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(Guid id)
    {
        var contact = await _context.Contacts.FindAsync(id);
        if (contact == null)
        {
            return NotFound();
        }

        _context.Contacts.Remove(contact); ;
        await _context.SaveChangesAsync();
        return NoContent();
    }

    private bool Exists(Guid id)
    {
        return _context.Contacts.Any(e => e.Id.Equals(id));
    }
}