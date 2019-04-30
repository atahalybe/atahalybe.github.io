﻿// <auto-generated />
using BeautySoul_Core.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace BeautySoul_Core.Migrations
{
    [DbContext(typeof(ApplicationDbContext))]
    [Migration("20190430061156_CatServiceRel")]
    partial class CatServiceRel
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "2.1.0-rtm-30799")
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("BeautySoul_Core.Models.Service", b =>
                {
                    b.Property<int>("serviceId")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("imageURL");

                    b.Property<double>("price");

                    b.Property<int>("serviceCategoryId");

                    b.Property<string>("serviceTitle");

                    b.HasKey("serviceId");

                    b.HasIndex("serviceCategoryId");

                    b.ToTable("Services");
                });

            modelBuilder.Entity("BeautySoul_Core.Models.ServiceCategory", b =>
                {
                    b.Property<int>("serviceCategoryId")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("serviceCategoryTitle");

                    b.HasKey("serviceCategoryId");

                    b.ToTable("ServiceCategories");
                });

            modelBuilder.Entity("BeautySoul_Core.Models.User", b =>
                {
                    b.Property<int>("id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("displayName");

                    b.Property<string>("email");

                    b.Property<bool>("emailVerified");

                    b.Property<bool>("isAdmin");

                    b.Property<string>("password");

                    b.Property<string>("path");

                    b.Property<string>("phoneNumber");

                    b.Property<string>("photoURL");

                    b.Property<string>("uid");

                    b.HasKey("id");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("BeautySoul_Core.Models.Service", b =>
                {
                    b.HasOne("BeautySoul_Core.Models.ServiceCategory", "serviceCategory")
                        .WithMany()
                        .HasForeignKey("serviceCategoryId")
                        .OnDelete(DeleteBehavior.Cascade);
                });
#pragma warning restore 612, 618
        }
    }
}
