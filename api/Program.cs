using Microsoft.AspNetCore.Diagnostics;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddDbContextFactory<Database.DatabaseContext>(options => options.UseSqlServer("name=ConnectionStrings:TestDatabase"));
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddCors(options =>
        {
            options.AddPolicy("AllowAllOrigins",
                builder =>
                {
                    builder.AllowAnyOrigin()
                           .AllowAnyMethod()
                           .AllowAnyHeader();
                });
        });

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// configure exception handling
if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
}
else
{
    app.UseExceptionHandler("/error");
}
// else
// {
//     app.UseExceptionHandler(appBuilder =>
//     {
//         appBuilder.Run(async context =>
//         {
//             var exceptionHandlerPathFeature = context.Features.Get<IExceptionHandlerPathFeature>();
//             var exception = exceptionHandlerPathFeature?.Error;

//             context.Response.StatusCode = exception switch
//             {
//                 DbUpdateException dbUpdateException when dbUpdateException.InnerException is SqlException sqlException && sqlException.Number == 2627 => StatusCodes.Status400BadRequest,
//                 _ => StatusCodes.Status500InternalServerError,
//             };

//             context.Response.ContentType = "application/json";

//             var errorResponse = new
//             {
//                 error = exception switch
//                 {
//                     DbUpdateException dbUpdateException when dbUpdateException.InnerException is SqlException sqlException && sqlException.Number == 2627 => "A unique constraint violation occurred. Please ensure the data is unique.",
//                     _ => "An unexpected error occurred."
//                 }
//             };

//             await context.Response.WriteAsJsonAsync(errorResponse);
//         });
//     });
// }

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.UseCors("AllowAllOrigins");

app.Run();
