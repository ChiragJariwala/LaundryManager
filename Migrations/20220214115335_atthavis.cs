using Microsoft.EntityFrameworkCore.Migrations;

namespace LaundryManagerAPI.Migrations
{
    public partial class atthavis : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "RoleName",
                table: "tblUserType",
                type: "nvarchar(450)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "PhyRole",
                table: "tblPhycalRole",
                type: "nvarchar(450)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "MembershipName",
                table: "tblMembership",
                type: "nvarchar(450)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AlterColumn<string>(
                name: "LocalArea",
                table: "tblLocality",
                type: "nvarchar(450)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "CustomerTypeName",
                table: "tblCustomerType",
                type: "nvarchar(450)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.CreateIndex(
                name: "IX_tblUserType_RoleName",
                table: "tblUserType",
                column: "RoleName",
                unique: true,
                filter: "[RoleName] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_tblPhycalRole_PhyRole",
                table: "tblPhycalRole",
                column: "PhyRole",
                unique: true,
                filter: "[PhyRole] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_tblMembership_MembershipName",
                table: "tblMembership",
                column: "MembershipName",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_tblLocality_LocalArea",
                table: "tblLocality",
                column: "LocalArea",
                unique: true,
                filter: "[LocalArea] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_tblCustomerType_CustomerTypeName",
                table: "tblCustomerType",
                column: "CustomerTypeName",
                unique: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_tblUserType_RoleName",
                table: "tblUserType");

            migrationBuilder.DropIndex(
                name: "IX_tblPhycalRole_PhyRole",
                table: "tblPhycalRole");

            migrationBuilder.DropIndex(
                name: "IX_tblMembership_MembershipName",
                table: "tblMembership");

            migrationBuilder.DropIndex(
                name: "IX_tblLocality_LocalArea",
                table: "tblLocality");

            migrationBuilder.DropIndex(
                name: "IX_tblCustomerType_CustomerTypeName",
                table: "tblCustomerType");

            migrationBuilder.AlterColumn<string>(
                name: "RoleName",
                table: "tblUserType",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(450)",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "PhyRole",
                table: "tblPhycalRole",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(450)",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "MembershipName",
                table: "tblMembership",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(450)");

            migrationBuilder.AlterColumn<string>(
                name: "LocalArea",
                table: "tblLocality",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(450)",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "CustomerTypeName",
                table: "tblCustomerType",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(450)");
        }
    }
}
