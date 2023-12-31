USE [master]
GO
/****** Object:  Database [EStore]    Script Date: 8/22/2023 4:21:09 PM ******/
CREATE DATABASE [EStore]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'EStore', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL16.SQLEXPRESS\MSSQL\DATA\EStore.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'EStore_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL16.SQLEXPRESS\MSSQL\DATA\EStore_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
 WITH CATALOG_COLLATION = DATABASE_DEFAULT, LEDGER = OFF
GO
ALTER DATABASE [EStore] SET COMPATIBILITY_LEVEL = 160
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [EStore].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [EStore] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [EStore] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [EStore] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [EStore] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [EStore] SET ARITHABORT OFF 
GO
ALTER DATABASE [EStore] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [EStore] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [EStore] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [EStore] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [EStore] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [EStore] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [EStore] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [EStore] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [EStore] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [EStore] SET  DISABLE_BROKER 
GO
ALTER DATABASE [EStore] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [EStore] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [EStore] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [EStore] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [EStore] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [EStore] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [EStore] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [EStore] SET RECOVERY SIMPLE 
GO
ALTER DATABASE [EStore] SET  MULTI_USER 
GO
ALTER DATABASE [EStore] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [EStore] SET DB_CHAINING OFF 
GO
ALTER DATABASE [EStore] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [EStore] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [EStore] SET DELAYED_DURABILITY = DISABLED 
GO
ALTER DATABASE [EStore] SET ACCELERATED_DATABASE_RECOVERY = OFF  
GO
ALTER DATABASE [EStore] SET QUERY_STORE = ON
GO
ALTER DATABASE [EStore] SET QUERY_STORE (OPERATION_MODE = READ_WRITE, CLEANUP_POLICY = (STALE_QUERY_THRESHOLD_DAYS = 30), DATA_FLUSH_INTERVAL_SECONDS = 900, INTERVAL_LENGTH_MINUTES = 60, MAX_STORAGE_SIZE_MB = 1000, QUERY_CAPTURE_MODE = AUTO, SIZE_BASED_CLEANUP_MODE = AUTO, MAX_PLANS_PER_QUERY = 200, WAIT_STATS_CAPTURE_MODE = ON)
GO
USE [EStore]
GO
/****** Object:  Table [dbo].[__EFMigrationsHistory]    Script Date: 8/22/2023 4:21:09 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[__EFMigrationsHistory](
	[MigrationId] [nvarchar](150) NOT NULL,
	[ProductVersion] [nvarchar](32) NOT NULL,
 CONSTRAINT [PK___EFMigrationsHistory] PRIMARY KEY CLUSTERED 
(
	[MigrationId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[AspNetRoleClaims]    Script Date: 8/22/2023 4:21:10 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[AspNetRoleClaims](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[RoleId] [nvarchar](450) NOT NULL,
	[ClaimType] [nvarchar](max) NULL,
	[ClaimValue] [nvarchar](max) NULL,
 CONSTRAINT [PK_AspNetRoleClaims] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[AspNetRoles]    Script Date: 8/22/2023 4:21:10 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[AspNetRoles](
	[Id] [nvarchar](450) NOT NULL,
	[Name] [nvarchar](256) NULL,
	[NormalizedName] [nvarchar](256) NULL,
	[ConcurrencyStamp] [nvarchar](max) NULL,
 CONSTRAINT [PK_AspNetRoles] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[AspNetUserClaims]    Script Date: 8/22/2023 4:21:10 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[AspNetUserClaims](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[UserId] [nvarchar](450) NOT NULL,
	[ClaimType] [nvarchar](max) NULL,
	[ClaimValue] [nvarchar](max) NULL,
 CONSTRAINT [PK_AspNetUserClaims] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[AspNetUserLogins]    Script Date: 8/22/2023 4:21:10 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[AspNetUserLogins](
	[LoginProvider] [nvarchar](450) NOT NULL,
	[ProviderKey] [nvarchar](450) NOT NULL,
	[ProviderDisplayName] [nvarchar](max) NULL,
	[UserId] [nvarchar](450) NOT NULL,
 CONSTRAINT [PK_AspNetUserLogins] PRIMARY KEY CLUSTERED 
(
	[LoginProvider] ASC,
	[ProviderKey] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[AspNetUserRoles]    Script Date: 8/22/2023 4:21:10 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[AspNetUserRoles](
	[UserId] [nvarchar](450) NOT NULL,
	[RoleId] [nvarchar](450) NOT NULL,
 CONSTRAINT [PK_AspNetUserRoles] PRIMARY KEY CLUSTERED 
(
	[UserId] ASC,
	[RoleId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[AspNetUsers]    Script Date: 8/22/2023 4:21:10 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[AspNetUsers](
	[Id] [nvarchar](450) NOT NULL,
	[Discriminator] [nvarchar](max) NOT NULL,
	[LicenceNumber] [nvarchar](max) NULL,
	[FirstName] [nvarchar](max) NULL,
	[LastName] [nvarchar](max) NULL,
	[MiddleInitial] [nvarchar](max) NULL,
	[IsActive] [bit] NULL,
	[Notes] [nvarchar](max) NULL,
	[office] [nvarchar](max) NULL,
	[DepartmentId] [int] NULL,
	[isDeleted] [bit] NULL,
	[UserName] [nvarchar](256) NULL,
	[NormalizedUserName] [nvarchar](256) NULL,
	[Email] [nvarchar](256) NULL,
	[NormalizedEmail] [nvarchar](256) NULL,
	[EmailConfirmed] [bit] NOT NULL,
	[PasswordHash] [nvarchar](max) NULL,
	[SecurityStamp] [nvarchar](max) NULL,
	[ConcurrencyStamp] [nvarchar](max) NULL,
	[PhoneNumber] [nvarchar](max) NULL,
	[PhoneNumberConfirmed] [bit] NOT NULL,
	[TwoFactorEnabled] [bit] NOT NULL,
	[LockoutEnd] [datetimeoffset](7) NULL,
	[LockoutEnabled] [bit] NOT NULL,
	[AccessFailedCount] [int] NOT NULL,
	[Address] [nvarchar](max) NULL,
	[PostalCode] [nvarchar](50) NULL,
	[State] [nvarchar](50) NULL,
	[Country] [nvarchar](50) NULL,
	[Image] [nvarchar](max) NULL,
 CONSTRAINT [PK_AspNetUsers] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[AspNetUserTokens]    Script Date: 8/22/2023 4:21:10 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[AspNetUserTokens](
	[UserId] [nvarchar](450) NOT NULL,
	[LoginProvider] [nvarchar](450) NOT NULL,
	[Name] [nvarchar](450) NOT NULL,
	[Value] [nvarchar](max) NULL,
 CONSTRAINT [PK_AspNetUserTokens] PRIMARY KEY CLUSTERED 
(
	[UserId] ASC,
	[LoginProvider] ASC,
	[Name] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Category]    Script Date: 8/22/2023 4:21:10 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Category](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](max) NOT NULL,
	[isDeleted] [bit] NOT NULL,
 CONSTRAINT [PK_Category] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Email_Settings]    Script Date: 8/22/2023 4:21:10 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Email_Settings](
	[Setting_ID] [int] NOT NULL,
	[SMTP_Server] [varchar](100) NULL,
	[Port] [int] NULL,
	[Username] [varchar](50) NULL,
	[Password] [varchar](100) NULL,
	[Encryption] [varchar](20) NULL,
	[Signature] [text] NULL,
	[Last_Updated] [datetime] NULL
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Message]    Script Date: 8/22/2023 4:21:10 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Message](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](max) NOT NULL,
	[Email] [nvarchar](max) NOT NULL,
	[Subject] [nvarchar](max) NOT NULL,
	[Messages] [nvarchar](max) NOT NULL,
	[Date] [nvarchar](max) NULL,
 CONSTRAINT [PK_Message] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Order]    Script Date: 8/22/2023 4:21:10 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Order](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[OrderNo] [nvarchar](max) NOT NULL,
	[Date] [datetime2](7) NOT NULL,
	[UserId] [nvarchar](max) NULL,
	[Status] [nvarchar](max) NOT NULL,
	[Payment_Mode] [nvarchar](max) NOT NULL,
	[TotalAmount] [decimal](18, 2) NULL,
 CONSTRAINT [PK_Order] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[OrderDetail]    Script Date: 8/22/2023 4:21:10 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[OrderDetail](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[ProductId] [int] NOT NULL,
	[OrderQuantity] [int] NOT NULL,
	[OrderId] [int] NOT NULL,
	[Price] [decimal](18, 2) NULL,
	[Discount] [decimal](18, 2) NULL,
 CONSTRAINT [PK_OrderDetail] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Product]    Script Date: 8/22/2023 4:21:10 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Product](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[CategoryId] [int] NOT NULL,
	[Code] [nvarchar](max) NOT NULL,
	[Name] [nvarchar](max) NOT NULL,
	[Description] [nvarchar](max) NOT NULL,
	[SalePrice] [decimal](18, 2) NOT NULL,
	[Image] [nvarchar](max) NOT NULL,
	[isDeleted] [bit] NOT NULL,
	[PurchasePrice] [decimal](18, 2) NOT NULL,
	[Quantity] [int] NULL,
	[Discount] [decimal](18, 2) NULL,
 CONSTRAINT [PK_Product] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
INSERT [dbo].[__EFMigrationsHistory] ([MigrationId], [ProductVersion]) VALUES (N'20230817082302_AddingDB', N'6.0.13')
GO
INSERT [dbo].[AspNetRoles] ([Id], [Name], [NormalizedName], [ConcurrencyStamp]) VALUES (N'0762ef33-6525-48b7-a0b6-e792a5ab0b97', N'User', N'USER', N'3975efd2-5059-4404-bbd1-3943aff8d3da')
INSERT [dbo].[AspNetRoles] ([Id], [Name], [NormalizedName], [ConcurrencyStamp]) VALUES (N'426d79db-9add-4948-81e8-3db2f966bd01', N'Administrator', N'ADMINISTRATOR', NULL)
INSERT [dbo].[AspNetRoles] ([Id], [Name], [NormalizedName], [ConcurrencyStamp]) VALUES (N'426d79db-9add-4948-81e8-3db2f966bd02', N'Customer', N'CUSTOMER', NULL)
INSERT [dbo].[AspNetRoles] ([Id], [Name], [NormalizedName], [ConcurrencyStamp]) VALUES (N'a419f7a1-c5f2-4a64-a852-4f6cb79f1f19', N'Admin', N'ADMIN', N'949370ac-19f7-4c3e-a231-81c8f5b8c42c')
GO
INSERT [dbo].[AspNetUserRoles] ([UserId], [RoleId]) VALUES (N'426d79db-9add-4948-81e8-3db2f966bd07', N'426d79db-9add-4948-81e8-3db2f966bd01')
INSERT [dbo].[AspNetUserRoles] ([UserId], [RoleId]) VALUES (N'426d79db-9add-4948-81e8-3db2f966bd05', N'426d79db-9add-4948-81e8-3db2f966bd02')
GO
INSERT [dbo].[AspNetUsers] ([Id], [Discriminator], [LicenceNumber], [FirstName], [LastName], [MiddleInitial], [IsActive], [Notes], [office], [DepartmentId], [isDeleted], [UserName], [NormalizedUserName], [Email], [NormalizedEmail], [EmailConfirmed], [PasswordHash], [SecurityStamp], [ConcurrencyStamp], [PhoneNumber], [PhoneNumberConfirmed], [TwoFactorEnabled], [LockoutEnd], [LockoutEnabled], [AccessFailedCount], [Address], [PostalCode], [State], [Country], [Image]) VALUES (N'426d79db-9add-4948-81e8-3db2f966bd05', N'Hamza Farooq', NULL, N'Hamza', N'Farooq', NULL, 1, NULL, NULL, NULL, 0, N'customer@gmail.com', N'CUSTOMER@GMAIL.COM', N'customer@gmail.com', N'CUSTOMER@GMAIL.COM', 1, N'AQAAAAEAACcQAAAAEAC+C3pK5CbOfteHK9UPBPxcgV6uNUD0WIbuhl3StUyU4XQ5EwjqKN7WNXpXBwZSsw==', N'EMHRXMHGCVLGYTLXNGN5LBA53XYQSTBT', N'9639b85e-e5a4-4cb3-bedf-73742c4514ba', N'03000410456', 0, 0, NULL, 0, 0, N'fdfdffd', N'52250', N'fdfdffd', N'fdfdffd', NULL)
INSERT [dbo].[AspNetUsers] ([Id], [Discriminator], [LicenceNumber], [FirstName], [LastName], [MiddleInitial], [IsActive], [Notes], [office], [DepartmentId], [isDeleted], [UserName], [NormalizedUserName], [Email], [NormalizedEmail], [EmailConfirmed], [PasswordHash], [SecurityStamp], [ConcurrencyStamp], [PhoneNumber], [PhoneNumberConfirmed], [TwoFactorEnabled], [LockoutEnd], [LockoutEnabled], [AccessFailedCount], [Address], [PostalCode], [State], [Country], [Image]) VALUES (N'426d79db-9add-4948-81e8-3db2f966bd07', N'Hamza Farooq', NULL, N'Hamza', N'Farooq', NULL, 1, NULL, NULL, NULL, 0, N'hamza.farooq1587@gmail.com', N'HAMZA.FAROOQ1587@GMAIL.COM', N'hamza.farooq1587@gmail.com', N'HAMZA.FAROOQ1587@GMAIL.COM', 1, N'AQAAAAEAACcQAAAAEAC+C3pK5CbOfteHK9UPBPxcgV6uNUD0WIbuhl3StUyU4XQ5EwjqKN7WNXpXBwZSsw==', N'EMHRXMHGCVLGYTLXNGN5LBA53XYQSTBT', N'9639b85e-e5a4-4cb3-bedf-73742c4514ba', N'+923000410456', 0, 0, NULL, 0, 0, N'Gujranwala', N'52250', N'Pubjab', N'Pakistan', N'51c43784-7345-4d4a-aaff-ebe8836234ad.jpg')
GO
SET IDENTITY_INSERT [dbo].[Category] ON 

INSERT [dbo].[Category] ([Id], [Name], [isDeleted]) VALUES (1, N'Dame', 0)
INSERT [dbo].[Category] ([Id], [Name], [isDeleted]) VALUES (2, N'HERRER', 0)
INSERT [dbo].[Category] ([Id], [Name], [isDeleted]) VALUES (3, N'BARNEKLIPPS', 0)
INSERT [dbo].[Category] ([Id], [Name], [isDeleted]) VALUES (5, N'Demo', 1)
INSERT [dbo].[Category] ([Id], [Name], [isDeleted]) VALUES (6, N'Dummy', 1)
INSERT [dbo].[Category] ([Id], [Name], [isDeleted]) VALUES (7, N'Hissss', 1)
INSERT [dbo].[Category] ([Id], [Name], [isDeleted]) VALUES (8, N'lkklkll', 1)
INSERT [dbo].[Category] ([Id], [Name], [isDeleted]) VALUES (9, N'jjjkjkjk', 1)
INSERT [dbo].[Category] ([Id], [Name], [isDeleted]) VALUES (10, N'kkjjkjk', 1)
INSERT [dbo].[Category] ([Id], [Name], [isDeleted]) VALUES (11, N'lkklkl', 1)
INSERT [dbo].[Category] ([Id], [Name], [isDeleted]) VALUES (12, N'kjk', 1)
INSERT [dbo].[Category] ([Id], [Name], [isDeleted]) VALUES (13, N'kjjkjkkj', 1)
INSERT [dbo].[Category] ([Id], [Name], [isDeleted]) VALUES (14, N'kjjkjkjkjk', 1)
INSERT [dbo].[Category] ([Id], [Name], [isDeleted]) VALUES (15, N'kkkllk', 1)
INSERT [dbo].[Category] ([Id], [Name], [isDeleted]) VALUES (16, N'lkkllkk', 1)
INSERT [dbo].[Category] ([Id], [Name], [isDeleted]) VALUES (17, N'lkklklklkl', 1)
INSERT [dbo].[Category] ([Id], [Name], [isDeleted]) VALUES (18, N'kklklklklkkl', 1)
INSERT [dbo].[Category] ([Id], [Name], [isDeleted]) VALUES (19, N'kjjkjkjk', 1)
INSERT [dbo].[Category] ([Id], [Name], [isDeleted]) VALUES (20, N'JJ', 1)
INSERT [dbo].[Category] ([Id], [Name], [isDeleted]) VALUES (21, N'klklkllkkl', 1)
INSERT [dbo].[Category] ([Id], [Name], [isDeleted]) VALUES (22, N'fdffd', 1)
SET IDENTITY_INSERT [dbo].[Category] OFF
GO
INSERT [dbo].[Email_Settings] ([Setting_ID], [SMTP_Server], [Port], [Username], [Password], [Encryption], [Signature], [Last_Updated]) VALUES (1, N'smtp.gmail.com', 587, N'hammadtariq159357@gmail.com', N'ziylqtwigcopollc', N'SSL', N'Ecom store', CAST(N'2023-08-22T14:51:16.340' AS DateTime))
GO
SET IDENTITY_INSERT [dbo].[Order] ON 

INSERT [dbo].[Order] ([Id], [OrderNo], [Date], [UserId], [Status], [Payment_Mode], [TotalAmount]) VALUES (1, N'202308221353582529', CAST(N'2023-08-22T13:53:58.0517217' AS DateTime2), N'426d79db-9add-4948-81e8-3db2f966bd07', N'Canceled', N'Cash', CAST(200.00 AS Decimal(18, 2)))
INSERT [dbo].[Order] ([Id], [OrderNo], [Date], [UserId], [Status], [Payment_Mode], [TotalAmount]) VALUES (2, N'202308221356575748', CAST(N'2023-08-22T13:56:57.9233073' AS DateTime2), N'426d79db-9add-4948-81e8-3db2f966bd07', N'Accepted', N'Cash', CAST(100.00 AS Decimal(18, 2)))
INSERT [dbo].[Order] ([Id], [OrderNo], [Date], [UserId], [Status], [Payment_Mode], [TotalAmount]) VALUES (4, N'202308221407134806', CAST(N'2023-08-22T14:07:13.7974108' AS DateTime2), N'426d79db-9add-4948-81e8-3db2f966bd07', N'Pending', N'Cash', CAST(100.00 AS Decimal(18, 2)))
SET IDENTITY_INSERT [dbo].[Order] OFF
GO
SET IDENTITY_INSERT [dbo].[OrderDetail] ON 

INSERT [dbo].[OrderDetail] ([Id], [ProductId], [OrderQuantity], [OrderId], [Price], [Discount]) VALUES (1, 1, 1, 1, CAST(100.00 AS Decimal(18, 2)), CAST(0.00 AS Decimal(18, 2)))
INSERT [dbo].[OrderDetail] ([Id], [ProductId], [OrderQuantity], [OrderId], [Price], [Discount]) VALUES (2, 2, 1, 1, CAST(100.00 AS Decimal(18, 2)), CAST(0.00 AS Decimal(18, 2)))
INSERT [dbo].[OrderDetail] ([Id], [ProductId], [OrderQuantity], [OrderId], [Price], [Discount]) VALUES (3, 1, 1, 2, CAST(100.00 AS Decimal(18, 2)), CAST(0.00 AS Decimal(18, 2)))
INSERT [dbo].[OrderDetail] ([Id], [ProductId], [OrderQuantity], [OrderId], [Price], [Discount]) VALUES (5, 1, 1, 2, CAST(100.00 AS Decimal(18, 2)), CAST(0.00 AS Decimal(18, 2)))
SET IDENTITY_INSERT [dbo].[OrderDetail] OFF
GO
SET IDENTITY_INSERT [dbo].[Product] ON 

INSERT [dbo].[Product] ([Id], [CategoryId], [Code], [Name], [Description], [SalePrice], [Image], [isDeleted], [PurchasePrice], [Quantity], [Discount]) VALUES (1, 1, N'8986', N'Gallaxy', N'Gallaxy Product', CAST(100.00 AS Decimal(18, 2)), N'64e0bf82-48d3-452a-9596-b6fc915d3b9b.jpg', 0, CAST(100.00 AS Decimal(18, 2)), 10, CAST(0.00 AS Decimal(18, 2)))
INSERT [dbo].[Product] ([Id], [CategoryId], [Code], [Name], [Description], [SalePrice], [Image], [isDeleted], [PurchasePrice], [Quantity], [Discount]) VALUES (2, 1, N'jhhjjh', N'jhjhjh', N'jkkjkj', CAST(100.00 AS Decimal(18, 2)), N'64e0bf82-48d3-452a-9596-b6fc915d3b9b.jpg', 0, CAST(100.00 AS Decimal(18, 2)), 10, CAST(0.00 AS Decimal(18, 2)))
INSERT [dbo].[Product] ([Id], [CategoryId], [Code], [Name], [Description], [SalePrice], [Image], [isDeleted], [PurchasePrice], [Quantity], [Discount]) VALUES (3, 1, N'jhhjjh', N'jhjhjh', N'jkkjkj', CAST(100.00 AS Decimal(18, 2)), N'64e0bf82-48d3-452a-9596-b6fc915d3b9b.jpg', 0, CAST(100.00 AS Decimal(18, 2)), 10, CAST(0.00 AS Decimal(18, 2)))
INSERT [dbo].[Product] ([Id], [CategoryId], [Code], [Name], [Description], [SalePrice], [Image], [isDeleted], [PurchasePrice], [Quantity], [Discount]) VALUES (4, 1, N'jhhjjh', N'jhjhjh', N'jkkjkj', CAST(100.00 AS Decimal(18, 2)), N'64e0bf82-48d3-452a-9596-b6fc915d3b9b.jpg', 0, CAST(100.00 AS Decimal(18, 2)), 10, CAST(0.00 AS Decimal(18, 2)))
INSERT [dbo].[Product] ([Id], [CategoryId], [Code], [Name], [Description], [SalePrice], [Image], [isDeleted], [PurchasePrice], [Quantity], [Discount]) VALUES (5, 2, N'78878', N'Forest', N'Forest Product', CAST(100.00 AS Decimal(18, 2)), N'64e0bf82-48d3-452a-9596-b6fc915d3b9b.jpg', 0, CAST(100.00 AS Decimal(18, 2)), 10, CAST(0.00 AS Decimal(18, 2)))
INSERT [dbo].[Product] ([Id], [CategoryId], [Code], [Name], [Description], [SalePrice], [Image], [isDeleted], [PurchasePrice], [Quantity], [Discount]) VALUES (6, 1, N'898989', N'kjsdjkjkdsjk', N'kdldlksd', CAST(100.00 AS Decimal(18, 2)), N'64e0bf82-48d3-452a-9596-b6fc915d3b9b.jpg', 0, CAST(100.00 AS Decimal(18, 2)), 10, CAST(0.00 AS Decimal(18, 2)))
INSERT [dbo].[Product] ([Id], [CategoryId], [Code], [Name], [Description], [SalePrice], [Image], [isDeleted], [PurchasePrice], [Quantity], [Discount]) VALUES (7, 1, N'8986', N'Gallaxy', N'Gallaxy Product', CAST(100.00 AS Decimal(18, 2)), N'64e0bf82-48d3-452a-9596-b6fc915d3b9b.jpg', 0, CAST(100.00 AS Decimal(18, 2)), 10, CAST(0.00 AS Decimal(18, 2)))
INSERT [dbo].[Product] ([Id], [CategoryId], [Code], [Name], [Description], [SalePrice], [Image], [isDeleted], [PurchasePrice], [Quantity], [Discount]) VALUES (8, 1, N'jhhjjh', N'jhjhjh', N'jkkjkj', CAST(100.00 AS Decimal(18, 2)), N'64e0bf82-48d3-452a-9596-b6fc915d3b9b.jpg', 0, CAST(100.00 AS Decimal(18, 2)), 10, CAST(0.00 AS Decimal(18, 2)))
INSERT [dbo].[Product] ([Id], [CategoryId], [Code], [Name], [Description], [SalePrice], [Image], [isDeleted], [PurchasePrice], [Quantity], [Discount]) VALUES (9, 1, N'jhhjjh', N'jhjhjh', N'jkkjkj', CAST(100.00 AS Decimal(18, 2)), N'64e0bf82-48d3-452a-9596-b6fc915d3b9b.jpg', 0, CAST(100.00 AS Decimal(18, 2)), 10, CAST(0.00 AS Decimal(18, 2)))
INSERT [dbo].[Product] ([Id], [CategoryId], [Code], [Name], [Description], [SalePrice], [Image], [isDeleted], [PurchasePrice], [Quantity], [Discount]) VALUES (10, 1, N'jhhjjh', N'jhjhjh', N'jkkjkj', CAST(100.00 AS Decimal(18, 2)), N'64e0bf82-48d3-452a-9596-b6fc915d3b9b.jpg', 1, CAST(100.00 AS Decimal(18, 2)), 10, CAST(0.00 AS Decimal(18, 2)))
INSERT [dbo].[Product] ([Id], [CategoryId], [Code], [Name], [Description], [SalePrice], [Image], [isDeleted], [PurchasePrice], [Quantity], [Discount]) VALUES (11, 2, N'78878', N'Forest', N'Forest Product', CAST(100.00 AS Decimal(18, 2)), N'64e0bf82-48d3-452a-9596-b6fc915d3b9b.jpg', 1, CAST(100.00 AS Decimal(18, 2)), 10, CAST(0.00 AS Decimal(18, 2)))
SET IDENTITY_INSERT [dbo].[Product] OFF
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [IX_AspNetRoleClaims_RoleId]    Script Date: 8/22/2023 4:21:10 PM ******/
CREATE NONCLUSTERED INDEX [IX_AspNetRoleClaims_RoleId] ON [dbo].[AspNetRoleClaims]
(
	[RoleId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [RoleNameIndex]    Script Date: 8/22/2023 4:21:10 PM ******/
CREATE UNIQUE NONCLUSTERED INDEX [RoleNameIndex] ON [dbo].[AspNetRoles]
(
	[NormalizedName] ASC
)
WHERE ([NormalizedName] IS NOT NULL)
WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [IX_AspNetUserClaims_UserId]    Script Date: 8/22/2023 4:21:10 PM ******/
CREATE NONCLUSTERED INDEX [IX_AspNetUserClaims_UserId] ON [dbo].[AspNetUserClaims]
(
	[UserId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [IX_AspNetUserLogins_UserId]    Script Date: 8/22/2023 4:21:10 PM ******/
CREATE NONCLUSTERED INDEX [IX_AspNetUserLogins_UserId] ON [dbo].[AspNetUserLogins]
(
	[UserId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [IX_AspNetUserRoles_RoleId]    Script Date: 8/22/2023 4:21:10 PM ******/
CREATE NONCLUSTERED INDEX [IX_AspNetUserRoles_RoleId] ON [dbo].[AspNetUserRoles]
(
	[RoleId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [EmailIndex]    Script Date: 8/22/2023 4:21:10 PM ******/
CREATE NONCLUSTERED INDEX [EmailIndex] ON [dbo].[AspNetUsers]
(
	[NormalizedEmail] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [UserNameIndex]    Script Date: 8/22/2023 4:21:10 PM ******/
CREATE UNIQUE NONCLUSTERED INDEX [UserNameIndex] ON [dbo].[AspNetUsers]
(
	[NormalizedUserName] ASC
)
WHERE ([NormalizedUserName] IS NOT NULL)
WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [IX_OrderDetail_ProductId]    Script Date: 8/22/2023 4:21:10 PM ******/
CREATE NONCLUSTERED INDEX [IX_OrderDetail_ProductId] ON [dbo].[OrderDetail]
(
	[ProductId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
ALTER TABLE [dbo].[Product] ADD  CONSTRAINT [DF__Product__Purchas__4E88ABD4]  DEFAULT (N'') FOR [PurchasePrice]
GO
ALTER TABLE [dbo].[AspNetRoleClaims]  WITH CHECK ADD  CONSTRAINT [FK_AspNetRoleClaims_AspNetRoles_RoleId] FOREIGN KEY([RoleId])
REFERENCES [dbo].[AspNetRoles] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[AspNetRoleClaims] CHECK CONSTRAINT [FK_AspNetRoleClaims_AspNetRoles_RoleId]
GO
ALTER TABLE [dbo].[AspNetUserClaims]  WITH CHECK ADD  CONSTRAINT [FK_AspNetUserClaims_AspNetUsers_UserId] FOREIGN KEY([UserId])
REFERENCES [dbo].[AspNetUsers] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[AspNetUserClaims] CHECK CONSTRAINT [FK_AspNetUserClaims_AspNetUsers_UserId]
GO
ALTER TABLE [dbo].[AspNetUserLogins]  WITH CHECK ADD  CONSTRAINT [FK_AspNetUserLogins_AspNetUsers_UserId] FOREIGN KEY([UserId])
REFERENCES [dbo].[AspNetUsers] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[AspNetUserLogins] CHECK CONSTRAINT [FK_AspNetUserLogins_AspNetUsers_UserId]
GO
ALTER TABLE [dbo].[AspNetUserRoles]  WITH CHECK ADD  CONSTRAINT [FK_AspNetUserRoles_AspNetRoles_RoleId] FOREIGN KEY([RoleId])
REFERENCES [dbo].[AspNetRoles] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[AspNetUserRoles] CHECK CONSTRAINT [FK_AspNetUserRoles_AspNetRoles_RoleId]
GO
ALTER TABLE [dbo].[AspNetUserRoles]  WITH CHECK ADD  CONSTRAINT [FK_AspNetUserRoles_AspNetUsers_UserId] FOREIGN KEY([UserId])
REFERENCES [dbo].[AspNetUsers] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[AspNetUserRoles] CHECK CONSTRAINT [FK_AspNetUserRoles_AspNetUsers_UserId]
GO
ALTER TABLE [dbo].[AspNetUserTokens]  WITH CHECK ADD  CONSTRAINT [FK_AspNetUserTokens_AspNetUsers_UserId] FOREIGN KEY([UserId])
REFERENCES [dbo].[AspNetUsers] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[AspNetUserTokens] CHECK CONSTRAINT [FK_AspNetUserTokens_AspNetUsers_UserId]
GO
ALTER TABLE [dbo].[OrderDetail]  WITH CHECK ADD  CONSTRAINT [FK_OrderDetail_Product_ProductId] FOREIGN KEY([ProductId])
REFERENCES [dbo].[Product] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[OrderDetail] CHECK CONSTRAINT [FK_OrderDetail_Product_ProductId]
GO
USE [master]
GO
ALTER DATABASE [EStore] SET  READ_WRITE 
GO
