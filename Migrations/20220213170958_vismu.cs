using Microsoft.EntityFrameworkCore.Migrations;

namespace LaundryManagerAPI.Migrations
{
    public partial class vismu : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "MembershipID",
                table: "tblRecharge",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "MembershipID",
                table: "tblRecharge");
        }
    }
}
