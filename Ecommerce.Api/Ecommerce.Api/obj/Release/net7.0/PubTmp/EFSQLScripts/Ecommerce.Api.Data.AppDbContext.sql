IF OBJECT_ID(N'[__EFMigrationsHistory]') IS NULL
BEGIN
    CREATE TABLE [__EFMigrationsHistory] (
        [MigrationId] nvarchar(150) NOT NULL,
        [ProductVersion] nvarchar(32) NOT NULL,
        CONSTRAINT [PK___EFMigrationsHistory] PRIMARY KEY ([MigrationId])
    );
END;
GO

BEGIN TRANSACTION;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20230812153915_AllMigrationToPaymentTable')
BEGIN
    IF SCHEMA_ID(N'Auth') IS NULL EXEC(N'CREATE SCHEMA [Auth];');
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20230812153915_AllMigrationToPaymentTable')
BEGIN
    CREATE TABLE [Offers] (
        [OfferId] int NOT NULL IDENTITY,
        [Title] nvarchar(25) NOT NULL,
        [Discount] int NOT NULL,
        CONSTRAINT [PK_Offers] PRIMARY KEY ([OfferId])
    );
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20230812153915_AllMigrationToPaymentTable')
BEGIN
    CREATE TABLE [PaymentMethods] (
        [id] int NOT NULL IDENTITY,
        [Type] nvarchar(600) NOT NULL,
        [Provider] nvarchar(500) NULL,
        [IsAvailable] bit NOT NULL,
        [Reason] nvarchar(1000) NULL,
        CONSTRAINT [PK_PaymentMethods] PRIMARY KEY ([id])
    );
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20230812153915_AllMigrationToPaymentTable')
BEGIN
    CREATE TABLE [ProductCategories] (
        [CategoryId] int NOT NULL IDENTITY,
        [Category] nvarchar(25) NOT NULL,
        [Subcategory] nvarchar(25) NULL,
        CONSTRAINT [PK_ProductCategories] PRIMARY KEY ([CategoryId])
    );
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20230812153915_AllMigrationToPaymentTable')
BEGIN
    CREATE TABLE [Auth].[Role] (
        [Id] nvarchar(450) NOT NULL,
        [Name] nvarchar(256) NULL,
        [NormalizedName] nvarchar(256) NULL,
        [ConcurrencyStamp] nvarchar(max) NULL,
        CONSTRAINT [PK_Role] PRIMARY KEY ([Id])
    );
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20230812153915_AllMigrationToPaymentTable')
BEGIN
    CREATE TABLE [SalesProducts] (
        [SalesProductId] int NOT NULL IDENTITY,
        [Title] nvarchar(max) NULL,
        [Description] nvarchar(max) NULL,
        [Price] decimal(18,2) NOT NULL,
        [discount] int NOT NULL,
        [ImageName] nvarchar(max) NULL,
        [Category] nvarchar(max) NULL,
        [SubCategory] nvarchar(max) NULL,
        [IsSaled] bit NOT NULL,
        CONSTRAINT [PK_SalesProducts] PRIMARY KEY ([SalesProductId])
    );
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20230812153915_AllMigrationToPaymentTable')
BEGIN
    CREATE TABLE [Auth].[User] (
        [Id] nvarchar(450) NOT NULL,
        [FirstName] nvarchar(50) NULL,
        [LastName] nvarchar(50) NULL,
        [Address] nvarchar(100) NULL,
        [Mobile] nvarchar(20) NULL,
        [CreatedAt] nvarchar(50) NULL,
        [ModifiedAt] nvarchar(50) NULL,
        [UserName] nvarchar(256) NULL,
        [NormalizedUserName] nvarchar(256) NULL,
        [Email] nvarchar(256) NOT NULL,
        [NormalizedEmail] nvarchar(256) NULL,
        [EmailConfirmed] bit NOT NULL,
        [PasswordHash] nvarchar(max) NULL,
        [SecurityStamp] nvarchar(max) NULL,
        [ConcurrencyStamp] nvarchar(max) NULL,
        [PhoneNumber] nvarchar(max) NULL,
        [PhoneNumberConfirmed] bit NOT NULL,
        [TwoFactorEnabled] bit NOT NULL,
        [LockoutEnd] datetimeoffset NULL,
        [LockoutEnabled] bit NOT NULL,
        [AccessFailedCount] int NOT NULL,
        CONSTRAINT [PK_User] PRIMARY KEY ([Id])
    );
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20230812153915_AllMigrationToPaymentTable')
BEGIN
    CREATE TABLE [Payments] (
        [Id] int NOT NULL IDENTITY,
        [PaymentMethodId] int NOT NULL,
        [TotalPrice] int NOT NULL,
        [ShippingCharges] int NOT NULL,
        [AmountPaid] int NOT NULL,
        [AmountReduced] int NOT NULL,
        [CreatedAT] datetime2 NOT NULL,
        CONSTRAINT [PK_Payments] PRIMARY KEY ([Id]),
        CONSTRAINT [FK_Payments_PaymentMethods_PaymentMethodId] FOREIGN KEY ([PaymentMethodId]) REFERENCES [PaymentMethods] ([id]) ON DELETE CASCADE
    );
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20230812153915_AllMigrationToPaymentTable')
BEGIN
    CREATE TABLE [Products] (
        [ProductId] int NOT NULL IDENTITY,
        [Title] nvarchar(max) NOT NULL,
        [Description] nvarchar(max) NOT NULL,
        [Price] decimal(18,2) NOT NULL,
        [Quantity] int NOT NULL,
        [ImageName] nvarchar(max) NULL,
        [OfferId] int NULL,
        [CategoryId] int NULL,
        CONSTRAINT [PK_Products] PRIMARY KEY ([ProductId]),
        CONSTRAINT [FK_Products_Offers_OfferId] FOREIGN KEY ([OfferId]) REFERENCES [Offers] ([OfferId]),
        CONSTRAINT [FK_Products_ProductCategories_CategoryId] FOREIGN KEY ([CategoryId]) REFERENCES [ProductCategories] ([CategoryId])
    );
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20230812153915_AllMigrationToPaymentTable')
BEGIN
    CREATE TABLE [Auth].[RoleClaims] (
        [Id] int NOT NULL IDENTITY,
        [RoleId] nvarchar(450) NOT NULL,
        [ClaimType] nvarchar(max) NULL,
        [ClaimValue] nvarchar(max) NULL,
        CONSTRAINT [PK_RoleClaims] PRIMARY KEY ([Id]),
        CONSTRAINT [FK_RoleClaims_Role_RoleId] FOREIGN KEY ([RoleId]) REFERENCES [Auth].[Role] ([Id]) ON DELETE CASCADE
    );
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20230812153915_AllMigrationToPaymentTable')
BEGIN
    CREATE TABLE [Auth].[RoleLogins] (
        [LoginProvider] nvarchar(450) NOT NULL,
        [ProviderKey] nvarchar(450) NOT NULL,
        [ProviderDisplayName] nvarchar(max) NULL,
        [UserId] nvarchar(450) NOT NULL,
        CONSTRAINT [PK_RoleLogins] PRIMARY KEY ([LoginProvider], [ProviderKey]),
        CONSTRAINT [FK_RoleLogins_User_UserId] FOREIGN KEY ([UserId]) REFERENCES [Auth].[User] ([Id]) ON DELETE CASCADE
    );
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20230812153915_AllMigrationToPaymentTable')
BEGIN
    CREATE TABLE [ShoppingCart] (
        [Id] int NOT NULL IDENTITY,
        [UserId] nvarchar(450) NULL,
        [IsOrdered] bit NOT NULL,
        [CreatedDate] datetime2 NOT NULL,
        [OrderedAt] datetime2 NOT NULL,
        CONSTRAINT [PK_ShoppingCart] PRIMARY KEY ([Id]),
        CONSTRAINT [FK_ShoppingCart_User_UserId] FOREIGN KEY ([UserId]) REFERENCES [Auth].[User] ([Id])
    );
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20230812153915_AllMigrationToPaymentTable')
BEGIN
    CREATE TABLE [Auth].[UserClaims] (
        [Id] int NOT NULL IDENTITY,
        [UserId] nvarchar(450) NOT NULL,
        [ClaimType] nvarchar(max) NULL,
        [ClaimValue] nvarchar(max) NULL,
        CONSTRAINT [PK_UserClaims] PRIMARY KEY ([Id]),
        CONSTRAINT [FK_UserClaims_User_UserId] FOREIGN KEY ([UserId]) REFERENCES [Auth].[User] ([Id]) ON DELETE CASCADE
    );
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20230812153915_AllMigrationToPaymentTable')
BEGIN
    CREATE TABLE [Auth].[UserRoles] (
        [UserId] nvarchar(450) NOT NULL,
        [RoleId] nvarchar(450) NOT NULL,
        CONSTRAINT [PK_UserRoles] PRIMARY KEY ([UserId], [RoleId]),
        CONSTRAINT [FK_UserRoles_Role_RoleId] FOREIGN KEY ([RoleId]) REFERENCES [Auth].[Role] ([Id]) ON DELETE CASCADE,
        CONSTRAINT [FK_UserRoles_User_UserId] FOREIGN KEY ([UserId]) REFERENCES [Auth].[User] ([Id]) ON DELETE CASCADE
    );
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20230812153915_AllMigrationToPaymentTable')
BEGIN
    CREATE TABLE [Auth].[UserTokens] (
        [UserId] nvarchar(450) NOT NULL,
        [LoginProvider] nvarchar(450) NOT NULL,
        [Name] nvarchar(450) NOT NULL,
        [Value] nvarchar(max) NULL,
        CONSTRAINT [PK_UserTokens] PRIMARY KEY ([UserId], [LoginProvider], [Name]),
        CONSTRAINT [FK_UserTokens_User_UserId] FOREIGN KEY ([UserId]) REFERENCES [Auth].[User] ([Id]) ON DELETE CASCADE
    );
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20230812153915_AllMigrationToPaymentTable')
BEGIN
    CREATE TABLE [Reviews] (
        [Id] int NOT NULL IDENTITY,
        [UserId] nvarchar(450) NOT NULL,
        [ProductId] int NOT NULL,
        [Value] nvarchar(max) NOT NULL,
        [CreatedAt] nvarchar(max) NOT NULL,
        CONSTRAINT [PK_Reviews] PRIMARY KEY ([Id]),
        CONSTRAINT [FK_Reviews_Products_ProductId] FOREIGN KEY ([ProductId]) REFERENCES [Products] ([ProductId]) ON DELETE CASCADE,
        CONSTRAINT [FK_Reviews_User_UserId] FOREIGN KEY ([UserId]) REFERENCES [Auth].[User] ([Id]) ON DELETE CASCADE
    );
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20230812153915_AllMigrationToPaymentTable')
BEGIN
    CREATE TABLE [CartItems] (
        [ItemCartId] int NOT NULL IDENTITY,
        [CartId] int NOT NULL,
        [SalesProductId] int NOT NULL,
        [OriginalProductId] int NOT NULL,
        [Quantity] int NOT NULL,
        [CreatedAt] datetime2 NOT NULL,
        CONSTRAINT [PK_CartItems] PRIMARY KEY ([ItemCartId]),
        CONSTRAINT [FK_CartItems_SalesProducts_SalesProductId] FOREIGN KEY ([SalesProductId]) REFERENCES [SalesProducts] ([SalesProductId]) ON DELETE CASCADE,
        CONSTRAINT [FK_CartItems_ShoppingCart_CartId] FOREIGN KEY ([CartId]) REFERENCES [ShoppingCart] ([Id]) ON DELETE CASCADE
    );
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20230812153915_AllMigrationToPaymentTable')
BEGIN
    CREATE TABLE [Orders] (
        [Id] int NOT NULL IDENTITY,
        [UserId] nvarchar(450) NOT NULL,
        [CartId] int NOT NULL,
        [PaymentId] int NOT NULL,
        [CreatedAt] datetime2 NOT NULL,
        CONSTRAINT [PK_Orders] PRIMARY KEY ([Id]),
        CONSTRAINT [FK_Orders_Payments_PaymentId] FOREIGN KEY ([PaymentId]) REFERENCES [Payments] ([Id]) ON DELETE CASCADE,
        CONSTRAINT [FK_Orders_ShoppingCart_CartId] FOREIGN KEY ([CartId]) REFERENCES [ShoppingCart] ([Id]) ON DELETE CASCADE,
        CONSTRAINT [FK_Orders_User_UserId] FOREIGN KEY ([UserId]) REFERENCES [Auth].[User] ([Id]) ON DELETE CASCADE
    );
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20230812153915_AllMigrationToPaymentTable')
BEGIN
    CREATE INDEX [IX_CartItems_CartId] ON [CartItems] ([CartId]);
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20230812153915_AllMigrationToPaymentTable')
BEGIN
    CREATE INDEX [IX_CartItems_SalesProductId] ON [CartItems] ([SalesProductId]);
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20230812153915_AllMigrationToPaymentTable')
BEGIN
    CREATE INDEX [IX_Orders_CartId] ON [Orders] ([CartId]);
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20230812153915_AllMigrationToPaymentTable')
BEGIN
    CREATE INDEX [IX_Orders_PaymentId] ON [Orders] ([PaymentId]);
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20230812153915_AllMigrationToPaymentTable')
BEGIN
    CREATE INDEX [IX_Orders_UserId] ON [Orders] ([UserId]);
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20230812153915_AllMigrationToPaymentTable')
BEGIN
    CREATE INDEX [IX_Payments_PaymentMethodId] ON [Payments] ([PaymentMethodId]);
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20230812153915_AllMigrationToPaymentTable')
BEGIN
    CREATE INDEX [IX_Products_CategoryId] ON [Products] ([CategoryId]);
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20230812153915_AllMigrationToPaymentTable')
BEGIN
    CREATE INDEX [IX_Products_OfferId] ON [Products] ([OfferId]);
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20230812153915_AllMigrationToPaymentTable')
BEGIN
    CREATE INDEX [IX_Reviews_ProductId] ON [Reviews] ([ProductId]);
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20230812153915_AllMigrationToPaymentTable')
BEGIN
    CREATE INDEX [IX_Reviews_UserId] ON [Reviews] ([UserId]);
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20230812153915_AllMigrationToPaymentTable')
BEGIN
    EXEC(N'CREATE UNIQUE INDEX [RoleNameIndex] ON [Auth].[Role] ([NormalizedName]) WHERE [NormalizedName] IS NOT NULL');
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20230812153915_AllMigrationToPaymentTable')
BEGIN
    CREATE INDEX [IX_RoleClaims_RoleId] ON [Auth].[RoleClaims] ([RoleId]);
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20230812153915_AllMigrationToPaymentTable')
BEGIN
    CREATE INDEX [IX_RoleLogins_UserId] ON [Auth].[RoleLogins] ([UserId]);
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20230812153915_AllMigrationToPaymentTable')
BEGIN
    CREATE INDEX [IX_ShoppingCart_UserId] ON [ShoppingCart] ([UserId]);
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20230812153915_AllMigrationToPaymentTable')
BEGIN
    CREATE INDEX [EmailIndex] ON [Auth].[User] ([NormalizedEmail]);
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20230812153915_AllMigrationToPaymentTable')
BEGIN
    EXEC(N'CREATE UNIQUE INDEX [UserNameIndex] ON [Auth].[User] ([NormalizedUserName]) WHERE [NormalizedUserName] IS NOT NULL');
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20230812153915_AllMigrationToPaymentTable')
BEGIN
    CREATE INDEX [IX_UserClaims_UserId] ON [Auth].[UserClaims] ([UserId]);
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20230812153915_AllMigrationToPaymentTable')
BEGIN
    CREATE INDEX [IX_UserRoles_RoleId] ON [Auth].[UserRoles] ([RoleId]);
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20230812153915_AllMigrationToPaymentTable')
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20230812153915_AllMigrationToPaymentTable', N'7.0.9');
END;
GO

COMMIT;
GO

BEGIN TRANSACTION;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20230812155407_AddRoleSeeds')
BEGIN
    IF EXISTS (SELECT * FROM [sys].[identity_columns] WHERE [name] IN (N'Id', N'Name', N'NormalizedName', N'ConcurrencyStamp') AND [object_id] = OBJECT_ID(N'[Auth].[Role]'))
        SET IDENTITY_INSERT [Auth].[Role] ON;
    EXEC(N'INSERT INTO [Auth].[Role] ([Id], [Name], [NormalizedName], [ConcurrencyStamp])
    VALUES (N''f43e87c4-cab4-49d0-80a1-b7b74204ca25'', N''User'', N''USER'', N''4dc2a508-cdb5-43f1-acf2-075b16c406d3'')');
    IF EXISTS (SELECT * FROM [sys].[identity_columns] WHERE [name] IN (N'Id', N'Name', N'NormalizedName', N'ConcurrencyStamp') AND [object_id] = OBJECT_ID(N'[Auth].[Role]'))
        SET IDENTITY_INSERT [Auth].[Role] OFF;
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20230812155407_AddRoleSeeds')
BEGIN
    IF EXISTS (SELECT * FROM [sys].[identity_columns] WHERE [name] IN (N'Id', N'Name', N'NormalizedName', N'ConcurrencyStamp') AND [object_id] = OBJECT_ID(N'[Auth].[Role]'))
        SET IDENTITY_INSERT [Auth].[Role] ON;
    EXEC(N'INSERT INTO [Auth].[Role] ([Id], [Name], [NormalizedName], [ConcurrencyStamp])
    VALUES (N''d4777b8a-7b5b-4641-91d3-f42e0d55793c'', N''Admin'', N''ADMIN'', N''a1ff8732-8227-4f01-9670-b5253e70c06b'')');
    IF EXISTS (SELECT * FROM [sys].[identity_columns] WHERE [name] IN (N'Id', N'Name', N'NormalizedName', N'ConcurrencyStamp') AND [object_id] = OBJECT_ID(N'[Auth].[Role]'))
        SET IDENTITY_INSERT [Auth].[Role] OFF;
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20230812155407_AddRoleSeeds')
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20230812155407_AddRoleSeeds', N'7.0.9');
END;
GO

COMMIT;
GO

BEGIN TRANSACTION;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20230812172239_AlterSalesProductsTable')
BEGIN
    ALTER TABLE [SalesProducts] ADD [Quantity] int NOT NULL DEFAULT 0;
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20230812172239_AlterSalesProductsTable')
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20230812172239_AlterSalesProductsTable', N'7.0.9');
END;
GO

COMMIT;
GO

BEGIN TRANSACTION;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20230812191757_AddCartItemsIdToSalesProductsTable')
BEGIN
    ALTER TABLE [SalesProducts] ADD [CartItemsId] int NOT NULL DEFAULT 0;
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20230812191757_AddCartItemsIdToSalesProductsTable')
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20230812191757_AddCartItemsIdToSalesProductsTable', N'7.0.9');
END;
GO

COMMIT;
GO

BEGIN TRANSACTION;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20230816224854_AddRefreshTokenTables')
BEGIN
    CREATE TABLE [Auth].[RefreshToken] (
        [AppUserId] nvarchar(450) NOT NULL,
        [Id] int NOT NULL IDENTITY,
        [Token] nvarchar(max) NULL,
        [ExpiresOn] datetime2 NOT NULL,
        [CreatedOn] datetime2 NOT NULL,
        [RevokedOn] datetime2 NULL,
        CONSTRAINT [PK_RefreshToken] PRIMARY KEY ([AppUserId], [Id]),
        CONSTRAINT [FK_RefreshToken_User_AppUserId] FOREIGN KEY ([AppUserId]) REFERENCES [Auth].[User] ([Id]) ON DELETE CASCADE
    );
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20230816224854_AddRefreshTokenTables')
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20230816224854_AddRefreshTokenTables', N'7.0.9');
END;
GO

COMMIT;
GO

BEGIN TRANSACTION;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20230826203410_AddResetPasswordFields')
BEGIN
    DECLARE @var0 sysname;
    SELECT @var0 = [d].[name]
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'[Auth].[User]') AND [c].[name] = N'ModifiedAt');
    IF @var0 IS NOT NULL EXEC(N'ALTER TABLE [Auth].[User] DROP CONSTRAINT [' + @var0 + '];');
    ALTER TABLE [Auth].[User] ALTER COLUMN [ModifiedAt] nvarchar(max) NULL;
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20230826203410_AddResetPasswordFields')
BEGIN
    DECLARE @var1 sysname;
    SELECT @var1 = [d].[name]
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'[Auth].[User]') AND [c].[name] = N'Mobile');
    IF @var1 IS NOT NULL EXEC(N'ALTER TABLE [Auth].[User] DROP CONSTRAINT [' + @var1 + '];');
    EXEC(N'UPDATE [Auth].[User] SET [Mobile] = N'''' WHERE [Mobile] IS NULL');
    ALTER TABLE [Auth].[User] ALTER COLUMN [Mobile] nvarchar(20) NOT NULL;
    ALTER TABLE [Auth].[User] ADD DEFAULT N'' FOR [Mobile];
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20230826203410_AddResetPasswordFields')
BEGIN
    DECLARE @var2 sysname;
    SELECT @var2 = [d].[name]
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'[Auth].[User]') AND [c].[name] = N'LastName');
    IF @var2 IS NOT NULL EXEC(N'ALTER TABLE [Auth].[User] DROP CONSTRAINT [' + @var2 + '];');
    EXEC(N'UPDATE [Auth].[User] SET [LastName] = N'''' WHERE [LastName] IS NULL');
    ALTER TABLE [Auth].[User] ALTER COLUMN [LastName] nvarchar(50) NOT NULL;
    ALTER TABLE [Auth].[User] ADD DEFAULT N'' FOR [LastName];
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20230826203410_AddResetPasswordFields')
BEGIN
    DECLARE @var3 sysname;
    SELECT @var3 = [d].[name]
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'[Auth].[User]') AND [c].[name] = N'FirstName');
    IF @var3 IS NOT NULL EXEC(N'ALTER TABLE [Auth].[User] DROP CONSTRAINT [' + @var3 + '];');
    EXEC(N'UPDATE [Auth].[User] SET [FirstName] = N'''' WHERE [FirstName] IS NULL');
    ALTER TABLE [Auth].[User] ALTER COLUMN [FirstName] nvarchar(50) NOT NULL;
    ALTER TABLE [Auth].[User] ADD DEFAULT N'' FOR [FirstName];
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20230826203410_AddResetPasswordFields')
BEGIN
    DECLARE @var4 sysname;
    SELECT @var4 = [d].[name]
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'[Auth].[User]') AND [c].[name] = N'CreatedAt');
    IF @var4 IS NOT NULL EXEC(N'ALTER TABLE [Auth].[User] DROP CONSTRAINT [' + @var4 + '];');
    ALTER TABLE [Auth].[User] ALTER COLUMN [CreatedAt] nvarchar(max) NULL;
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20230826203410_AddResetPasswordFields')
BEGIN
    DECLARE @var5 sysname;
    SELECT @var5 = [d].[name]
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'[Auth].[User]') AND [c].[name] = N'Address');
    IF @var5 IS NOT NULL EXEC(N'ALTER TABLE [Auth].[User] DROP CONSTRAINT [' + @var5 + '];');
    EXEC(N'UPDATE [Auth].[User] SET [Address] = N'''' WHERE [Address] IS NULL');
    ALTER TABLE [Auth].[User] ALTER COLUMN [Address] nvarchar(100) NOT NULL;
    ALTER TABLE [Auth].[User] ADD DEFAULT N'' FOR [Address];
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20230826203410_AddResetPasswordFields')
BEGIN
    ALTER TABLE [Auth].[User] ADD [ResetPasswordToken] nvarchar(max) NULL;
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20230826203410_AddResetPasswordFields')
BEGIN
    ALTER TABLE [Auth].[User] ADD [ResetPasswordTokenExpiry] datetime2 NOT NULL DEFAULT '0001-01-01T00:00:00.0000000';
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20230826203410_AddResetPasswordFields')
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20230826203410_AddResetPasswordFields', N'7.0.9');
END;
GO

COMMIT;
GO

BEGIN TRANSACTION;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20230827122729_DeleteMobileColumn')
BEGIN
    DECLARE @var6 sysname;
    SELECT @var6 = [d].[name]
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'[Auth].[User]') AND [c].[name] = N'Mobile');
    IF @var6 IS NOT NULL EXEC(N'ALTER TABLE [Auth].[User] DROP CONSTRAINT [' + @var6 + '];');
    ALTER TABLE [Auth].[User] DROP COLUMN [Mobile];
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20230827122729_DeleteMobileColumn')
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20230827122729_DeleteMobileColumn', N'7.0.9');
END;
GO

COMMIT;
GO

