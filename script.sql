USE [master]
GO
/****** Object:  Database [BeautySoulCoreDb]    Script Date: 4/30/2019 4:47:55 PM ******/
CREATE DATABASE [BeautySoulCoreDb] ON  PRIMARY 
( NAME = N'BeautySoulCoreDb', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL12.MSSQLSERVER\MSSQL\DATA\BeautySoulCoreDb.mdf' , SIZE = 3264KB , MAXSIZE = UNLIMITED, FILEGROWTH = 1024KB )
 LOG ON 
( NAME = N'BeautySoulCoreDb_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL12.MSSQLSERVER\MSSQL\DATA\BeautySoulCoreDb_log.ldf' , SIZE = 816KB , MAXSIZE = 2048GB , FILEGROWTH = 10%)
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [BeautySoulCoreDb].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [BeautySoulCoreDb] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [BeautySoulCoreDb] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [BeautySoulCoreDb] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [BeautySoulCoreDb] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [BeautySoulCoreDb] SET ARITHABORT OFF 
GO
ALTER DATABASE [BeautySoulCoreDb] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [BeautySoulCoreDb] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [BeautySoulCoreDb] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [BeautySoulCoreDb] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [BeautySoulCoreDb] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [BeautySoulCoreDb] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [BeautySoulCoreDb] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [BeautySoulCoreDb] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [BeautySoulCoreDb] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [BeautySoulCoreDb] SET  ENABLE_BROKER 
GO
ALTER DATABASE [BeautySoulCoreDb] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [BeautySoulCoreDb] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [BeautySoulCoreDb] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [BeautySoulCoreDb] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [BeautySoulCoreDb] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [BeautySoulCoreDb] SET READ_COMMITTED_SNAPSHOT ON 
GO
ALTER DATABASE [BeautySoulCoreDb] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [BeautySoulCoreDb] SET RECOVERY FULL 
GO
ALTER DATABASE [BeautySoulCoreDb] SET  MULTI_USER 
GO
ALTER DATABASE [BeautySoulCoreDb] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [BeautySoulCoreDb] SET DB_CHAINING OFF 
GO
EXEC sys.sp_db_vardecimal_storage_format N'BeautySoulCoreDb', N'ON'
GO
USE [BeautySoulCoreDb]
GO
/****** Object:  Table [dbo].[__EFMigrationsHistory]    Script Date: 4/30/2019 4:47:56 PM ******/
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
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[ServiceCategories]    Script Date: 4/30/2019 4:47:56 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ServiceCategories](
	[serviceCategoryId] [int] IDENTITY(1,1) NOT NULL,
	[serviceCategoryTitle] [nvarchar](max) NULL,
 CONSTRAINT [PK_ServiceCategories] PRIMARY KEY CLUSTERED 
(
	[serviceCategoryId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
/****** Object:  Table [dbo].[Services]    Script Date: 4/30/2019 4:47:56 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Services](
	[serviceId] [int] IDENTITY(1,1) NOT NULL,
	[serviceTitle] [nvarchar](max) NULL,
	[price] [float] NOT NULL,
	[imageURL] [nvarchar](max) NULL,
	[serviceCategoryId] [int] NOT NULL DEFAULT ((0)),
	[description] [nvarchar](max) NULL,
 CONSTRAINT [PK_Services] PRIMARY KEY CLUSTERED 
(
	[serviceId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
/****** Object:  Table [dbo].[Users]    Script Date: 4/30/2019 4:47:56 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Users](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[uid] [nvarchar](max) NULL,
	[email] [nvarchar](max) NULL,
	[emailVerified] [bit] NOT NULL,
	[phoneNumber] [nvarchar](max) NULL,
	[displayName] [nvarchar](max) NULL,
	[photoURL] [nvarchar](max) NULL,
	[path] [nvarchar](max) NULL,
	[password] [nvarchar](max) NULL,
	[isAdmin] [bit] NOT NULL,
 CONSTRAINT [PK_Users] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
INSERT [dbo].[__EFMigrationsHistory] ([MigrationId], [ProductVersion]) VALUES (N'20190429104500_InitialCreate', N'2.1.0-rtm-30799')
INSERT [dbo].[__EFMigrationsHistory] ([MigrationId], [ProductVersion]) VALUES (N'20190430060747_CatService', N'2.1.0-rtm-30799')
INSERT [dbo].[__EFMigrationsHistory] ([MigrationId], [ProductVersion]) VALUES (N'20190430061156_CatServiceRel', N'2.1.0-rtm-30799')
INSERT [dbo].[__EFMigrationsHistory] ([MigrationId], [ProductVersion]) VALUES (N'20190430083119_addescriptionservice', N'2.1.0-rtm-30799')
SET IDENTITY_INSERT [dbo].[ServiceCategories] ON 

INSERT [dbo].[ServiceCategories] ([serviceCategoryId], [serviceCategoryTitle]) VALUES (5, N'MakeUp')
INSERT [dbo].[ServiceCategories] ([serviceCategoryId], [serviceCategoryTitle]) VALUES (6, N'Treatments')
INSERT [dbo].[ServiceCategories] ([serviceCategoryId], [serviceCategoryTitle]) VALUES (7, N'Art')
INSERT [dbo].[ServiceCategories] ([serviceCategoryId], [serviceCategoryTitle]) VALUES (8, N'Therpy')
INSERT [dbo].[ServiceCategories] ([serviceCategoryId], [serviceCategoryTitle]) VALUES (9, N'Hair Styling')
INSERT [dbo].[ServiceCategories] ([serviceCategoryId], [serviceCategoryTitle]) VALUES (10, N'Mehndi')
SET IDENTITY_INSERT [dbo].[ServiceCategories] OFF
SET IDENTITY_INSERT [dbo].[Services] ON 

INSERT [dbo].[Services] ([serviceId], [serviceTitle], [price], [imageURL], [serviceCategoryId], [description]) VALUES (6, N'Bridal MakeUp', 5000, N'\uploads\dulhan-makeup-images2.jpg', 5, N'some description here')
INSERT [dbo].[Services] ([serviceId], [serviceTitle], [price], [imageURL], [serviceCategoryId], [description]) VALUES (7, N'Party Makeup', 4000, N'\uploads\g-4.jpg', 5, N'some descr')
INSERT [dbo].[Services] ([serviceId], [serviceTitle], [price], [imageURL], [serviceCategoryId], [description]) VALUES (8, N'Engagement Makeup', 3000, N'\uploads\bridal-makeup-images.jpg', 5, N'Soem desc')
INSERT [dbo].[Services] ([serviceId], [serviceTitle], [price], [imageURL], [serviceCategoryId], [description]) VALUES (9, N'Mayo Makeup', 3500, N'\uploads\g-26.jpg', 5, N'some desc')
INSERT [dbo].[Services] ([serviceId], [serviceTitle], [price], [imageURL], [serviceCategoryId], [description]) VALUES (10, N'Face Treatment', 1000, N'\uploads\services-2.jpg', 6, N'some desc')
INSERT [dbo].[Services] ([serviceId], [serviceTitle], [price], [imageURL], [serviceCategoryId], [description]) VALUES (11, N'Skin polish', 800, N'\uploads\services-11.jpg', 6, N'some desc')
INSERT [dbo].[Services] ([serviceId], [serviceTitle], [price], [imageURL], [serviceCategoryId], [description]) VALUES (12, N'Acne free skin', 500, N'\uploads\skin-treatment.jpg', 6, N'some desc')
INSERT [dbo].[Services] ([serviceId], [serviceTitle], [price], [imageURL], [serviceCategoryId], [description]) VALUES (13, N'Hair Curling', 4000, N'\uploads\services-6.jpg', 9, N'some desc')
INSERT [dbo].[Services] ([serviceId], [serviceTitle], [price], [imageURL], [serviceCategoryId], [description]) VALUES (14, N'Hair Rebaounding', 4000, N'\uploads\services-7.jpg', 9, N'some desc')
INSERT [dbo].[Services] ([serviceId], [serviceTitle], [price], [imageURL], [serviceCategoryId], [description]) VALUES (15, N'Mehndi-1', 300, N'\uploads\g-18.jpg', 10, N'some desc')
INSERT [dbo].[Services] ([serviceId], [serviceTitle], [price], [imageURL], [serviceCategoryId], [description]) VALUES (16, N'Mehndi-2', 500, N'\uploads\g-20.jpg', 10, N'some desc')
INSERT [dbo].[Services] ([serviceId], [serviceTitle], [price], [imageURL], [serviceCategoryId], [description]) VALUES (17, N'Mehndi-3', 500, N'\uploads\mehndi-2.jpg', 10, N'some desc')
INSERT [dbo].[Services] ([serviceId], [serviceTitle], [price], [imageURL], [serviceCategoryId], [description]) VALUES (18, N'tatoo designing', 2000, N'\uploads\tattoo-1.jpg', 7, N'some desc')
INSERT [dbo].[Services] ([serviceId], [serviceTitle], [price], [imageURL], [serviceCategoryId], [description]) VALUES (19, N'tatoo -1', 230, N'\uploads\tattoo-2.jpg', 5, N'some desc')
INSERT [dbo].[Services] ([serviceId], [serviceTitle], [price], [imageURL], [serviceCategoryId], [description]) VALUES (20, N'weight losss therpy/Exercise', 2000, N'\uploads\services-12.jpg', 8, N'some desc')
SET IDENTITY_INSERT [dbo].[Services] OFF
SET IDENTITY_INSERT [dbo].[Users] ON 

INSERT [dbo].[Users] ([id], [uid], [email], [emailVerified], [phoneNumber], [displayName], [photoURL], [path], [password], [isAdmin]) VALUES (1, N'7Qv6UvqUS2Qjz4tvJDz2cuTfjvJ2', N'wubot@getnada.com', 0, N'323012312', N'First user', NULL, NULL, N'Fifa1234!', 0)
INSERT [dbo].[Users] ([id], [uid], [email], [emailVerified], [phoneNumber], [displayName], [photoURL], [path], [password], [isAdmin]) VALUES (2, N'P5wE75bXvsU78Nk3dwoAkl9gPAw2', N'gumavum@getnada.com', 0, N'12321312', N'gumavum', NULL, NULL, N'Fifa1234!', 1)
INSERT [dbo].[Users] ([id], [uid], [email], [emailVerified], [phoneNumber], [displayName], [photoURL], [path], [password], [isAdmin]) VALUES (1002, N'M5kpkhtPuCfW1OBjG5WqVlJ4UqH2', N'ipyxunuty@boximail.com', 0, N'213123213', N'ipyxunuty', NULL, NULL, N'Fifa1234!', 0)
SET IDENTITY_INSERT [dbo].[Users] OFF
/****** Object:  Index [IX_Services_serviceCategoryId]    Script Date: 4/30/2019 4:47:56 PM ******/
CREATE NONCLUSTERED INDEX [IX_Services_serviceCategoryId] ON [dbo].[Services]
(
	[serviceCategoryId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
ALTER TABLE [dbo].[Services]  WITH CHECK ADD  CONSTRAINT [FK_Services_ServiceCategories_serviceCategoryId] FOREIGN KEY([serviceCategoryId])
REFERENCES [dbo].[ServiceCategories] ([serviceCategoryId])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[Services] CHECK CONSTRAINT [FK_Services_ServiceCategories_serviceCategoryId]
GO
USE [master]
GO
ALTER DATABASE [BeautySoulCoreDb] SET  READ_WRITE 
GO
