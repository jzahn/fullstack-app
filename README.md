# FullStackApp

An angular, angular material, asp.net core application testbed.

## Running the app

1. docker compose up
2. install efcore tools locally
3. run migrations: dotnet ef database update --connection "Server=localhost;Database=api;User Id=sa;Password=Password123;Encrypt=true;TrustServerCertificate=true"
4. go to http://localhost:4040