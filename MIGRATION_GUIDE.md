# SQLite to MS SQL Server Migration Guide

## ✅ Completed Steps

1. ✅ Installed `Microsoft.EntityFrameworkCore.SqlServer` package (v9.0.10)
2. ✅ Updated all EF Core packages to version 9.0.10 for consistency
3. ✅ Updated `Program.cs` to use `UseSqlServer` instead of `UseSqlite`
4. ✅ Updated connection strings in `appsettings.json` and `appsettings.Development.json`
5. ✅ Deleted old SQLite migrations
6. ✅ Created new migration for SQL Server: `InitialCreateSqlServer`

---

## 🔧 Required Actions

### 1. Update Connection Strings with Your VPS Credentials

Edit both files with your actual SQL Server details:

- `appsettings.json`
- `appsettings.Development.json`

Replace these placeholders:

```json
"ConnectionStrings": {
  "DefaultConnection": "Server=YOUR_SERVER_IP_OR_DOMAIN;Database=YOUR_DATABASE_NAME;User Id=YOUR_USERNAME;Password=YOUR_PASSWORD;TrustServerCertificate=True;"
}
```

**Example connection strings:**

```
Server=192.168.1.100;Database=ReStore;User Id=sa;Password=MyPassword123!;TrustServerCertificate=True;

OR with custom port:
Server=myserver.com,1433;Database=ReStore;User Id=dbuser;Password=SecurePass123;TrustServerCertificate=True;

OR with default instance:
Server=192.168.1.100\SQLEXPRESS;Database=ReStore;User Id=sa;Password=MyPassword123!;TrustServerCertificate=True;
```

### 2. Verify VPS SQL Server Configuration

Ensure your VPS is properly configured:

#### On Your VPS Server:

- ✅ SQL Server is running
- ✅ TCP/IP protocol is enabled in SQL Server Configuration Manager
- ✅ SQL Server is listening on port 1433 (or your custom port)
- ✅ SQL Server Authentication mode is enabled (Mixed Mode)
- ✅ Firewall allows inbound connections on port 1433

#### Test Connection from Development Machine:

```bash
# Using telnet to test port accessibility
telnet YOUR_VPS_IP 1433

# Or using PowerShell
Test-NetConnection -ComputerName YOUR_VPS_IP -Port 1433
```

### 3. Create Database on SQL Server (if not exists)

Connect to your SQL Server using SSMS or Azure Data Studio and run:

```sql
CREATE DATABASE ReStore;
GO

-- Verify database creation
SELECT name FROM sys.databases WHERE name = 'ReStore';
```

### 4. Apply Migration to SQL Server

Once connection string is updated, run:

```bash
cd API
dotnet ef database update
```

This will create all tables in your SQL Server database.

### 5. (Optional) Migrate Existing Data from SQLite

If you have existing data in `store.db` that you want to migrate:

#### Option A: Manual Export/Import

1. Export data from SQLite to CSV/JSON
2. Import into SQL Server using SSMS Import Wizard or custom script

#### Option B: Use EF Core Script

1. Keep the SQLite connection temporarily
2. Create a data migration script to read from SQLite and write to SQL Server
3. Remove SQLite connection after migration

---

## 🧪 Testing the Migration

### 1. Test Connection

```bash
cd API
dotnet run
```

Check for any connection errors in the console.

### 2. Test API Endpoints

- GET http://localhost:5000/api/products
- POST http://localhost:5000/api/basket
- etc.

### 3. Verify Database Tables

Connect to your SQL Server and verify tables were created:

```sql
USE ReStore;
GO

SELECT TABLE_NAME
FROM INFORMATION_SCHEMA.TABLES
WHERE TABLE_TYPE = 'BASE TABLE';
```

You should see:

- Products
- Baskets
- BasketItems
- \_\_EFMigrationsHistory

---

## 🔄 Rollback Plan (If Needed)

If you need to rollback to SQLite:

1. Change `Program.cs` back to `UseSqlite`
2. Update connection strings back to SQLite
3. Restore old migrations from git:
   ```bash
   git checkout HEAD -- API/Data/Migrations
   ```
4. Run: `dotnet ef database update`

---

## 📝 Connection String Parameters Explained

| Parameter                | Description                 | Example                           |
| ------------------------ | --------------------------- | --------------------------------- |
| Server                   | SQL Server address          | `192.168.1.100` or `myserver.com` |
| Database                 | Database name               | `ReStore`                         |
| User Id                  | SQL Server username         | `sa` or `dbuser`                  |
| Password                 | SQL Server password         | `YourPassword123`                 |
| TrustServerCertificate   | Skip certificate validation | `True` (recommended for dev)      |
| Port                     | Custom port (optional)      | `,1433` appended to Server        |
| Encrypt                  | Enable encryption           | `True` or `False`                 |
| MultipleActiveResultSets | Enable MARS                 | `True`                            |

**Full Example:**

```
Server=192.168.1.100,1433;Database=ReStore;User Id=sa;Password=Pass123!;TrustServerCertificate=True;Encrypt=True;MultipleActiveResultSets=True;
```

---

## 🚨 Common Issues & Solutions

### Issue: "A network-related or instance-specific error occurred"

**Solution:**

- Check firewall settings
- Verify SQL Server is running
- Ensure remote connections are enabled
- Check if port 1433 is open

### Issue: "Login failed for user"

**Solution:**

- Verify username and password
- Ensure SQL Server Authentication is enabled
- Check user permissions on the database

### Issue: "Certificate chain was issued by an authority that is not trusted"

**Solution:** Add `TrustServerCertificate=True` to connection string

### Issue: Migration timeout

**Solution:** Add timeout to connection string:

```
...;Connection Timeout=60;
```

---

## 📚 Additional Resources

- [SQL Server Connection Strings](https://www.connectionstrings.com/sql-server/)
- [EF Core SQL Server Provider](https://learn.microsoft.com/en-us/ef/core/providers/sql-server/)
- [SQL Server Configuration Manager Guide](https://learn.microsoft.com/en-us/sql/relational-databases/sql-server-configuration-manager)

---

## ✨ Benefits of SQL Server Over SQLite

- ✅ Better for production environments
- ✅ Supports multiple concurrent connections
- ✅ Better performance for large datasets
- ✅ Advanced features (stored procedures, triggers, etc.)
- ✅ Better security and user management
- ✅ Supports distributed systems
- ✅ Better backup and recovery options

---

## 📞 Next Steps

1. Update connection strings in both appsettings files
2. Ensure VPS SQL Server is accessible
3. Run `dotnet ef database update` to create database schema
4. Test your API endpoints
5. Consider setting up automated backups on your VPS
6. (Optional) Migrate existing SQLite data if needed

Good luck with your migration! 🚀
