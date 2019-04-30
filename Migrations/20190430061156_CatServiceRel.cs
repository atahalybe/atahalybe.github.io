using Microsoft.EntityFrameworkCore.Migrations;

namespace BeautySoul_Core.Migrations
{
    public partial class CatServiceRel : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "serviceCategoryId",
                table: "Services",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Services_serviceCategoryId",
                table: "Services",
                column: "serviceCategoryId");

            migrationBuilder.AddForeignKey(
                name: "FK_Services_ServiceCategories_serviceCategoryId",
                table: "Services",
                column: "serviceCategoryId",
                principalTable: "ServiceCategories",
                principalColumn: "serviceCategoryId",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Services_ServiceCategories_serviceCategoryId",
                table: "Services");

            migrationBuilder.DropIndex(
                name: "IX_Services_serviceCategoryId",
                table: "Services");

            migrationBuilder.DropColumn(
                name: "serviceCategoryId",
                table: "Services");
        }
    }
}
