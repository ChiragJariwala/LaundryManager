using Microsoft.EntityFrameworkCore.Migrations;

namespace LaundryManagerAPI.Migrations
{
    public partial class sol : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Address",
                table: "tblUsers",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Area",
                table: "tblUsers",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "City",
                table: "tblUsers",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ContactNumber",
                table: "tblUsers",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Name",
                table: "tblUsers",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "PhysicalRole",
                table: "tblUsers",
                type: "nvarchar(max)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Address",
                table: "tblUsers");

            migrationBuilder.DropColumn(
                name: "Area",
                table: "tblUsers");

            migrationBuilder.DropColumn(
                name: "City",
                table: "tblUsers");

            migrationBuilder.DropColumn(
                name: "ContactNumber",
                table: "tblUsers");

            migrationBuilder.DropColumn(
                name: "Name",
                table: "tblUsers");

            migrationBuilder.DropColumn(
                name: "PhysicalRole",
                table: "tblUsers");
        }
    }
}
