using Microsoft.EntityFrameworkCore.Migrations;

namespace BeautySoul_Core.Migrations
{
    public partial class addescriptionservice : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "description",
                table: "Services",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "description",
                table: "Services");
        }
    }
}
