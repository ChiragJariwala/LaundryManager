using Microsoft.EntityFrameworkCore.Migrations;

namespace LaundryManagerAPI.Migrations
{
    public partial class pandar : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Flag",
                table: "tblCustomers",
                newName: "DeleteFlag");

            migrationBuilder.AddColumn<bool>(
                name: "ActiveFlag",
                table: "tblCustomers",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ActiveFlag",
                table: "tblCustomers");

            migrationBuilder.RenameColumn(
                name: "DeleteFlag",
                table: "tblCustomers",
                newName: "Flag");
        }
    }
}
