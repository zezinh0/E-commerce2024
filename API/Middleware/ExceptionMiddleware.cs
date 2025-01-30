using System;
using System.Net;
using System.Security.Cryptography.X509Certificates;
using System.Text.Json;
using API.Errors;

namespace API.Middleware;

public class ExceptionMiddleware(IHostEnvironment env, RequestDelegate next)
{
    // The InvokeAsync method intercepts requests, catches exceptions, and handles them.
    public async Task InvokeAsync(HttpContext context)
    {
        try
        {
            await next(context);
        }
        catch (Exception ex)
        {
            await HandleExceptionAsync(context, ex, env);
        }
    }

    // This method is responsible for formatting and returning error responses in JSON format when an unhandled exception occurs.
    private static Task HandleExceptionAsync(HttpContext context, Exception ex, IHostEnvironment env)
    {
        context.Response.ContentType = "application/json";
        context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;

        // Hides error details in production, but Shows full details in development.
        var response = env.IsDevelopment() 
                    ? new ApiErrorResponse(context.Response.StatusCode, ex.Message, ex.StackTrace)
                    : new ApiErrorResponse(context.Response.StatusCode, ex.Message, "Internal Server Error");

        var options = new JsonSerializerOptions{PropertyNamingPolicy = JsonNamingPolicy.CamelCase};

        var json = JsonSerializer.Serialize(response, options);

        return context.Response.WriteAsync(json);
    }
}
