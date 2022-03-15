using Microsoft.EntityFrameworkCore.Migrations;

namespace LaundryManagerAPI.Migrations
{
    public partial class sattarmu : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "ActiveMembership",
                table: "tblCustomers",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<double>(
                name: "Balance",
                table: "tblCustomers",
                type: "float",
                nullable: false,
                defaultValue: 0.0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ActiveMembership",
                table: "tblCustomers");

            migrationBuilder.DropColumn(
                name: "Balance",
                table: "tblCustomers");
        }
    }
}
