using Microsoft.EntityFrameworkCore.Migrations;

namespace BinaryBrainsAPI.Migrations
{
    public partial class MakeUserTypeForeignkey : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_User_UserTypeID",
                table: "User",
                column: "UserTypeID");

            migrationBuilder.AddForeignKey(
                name: "FK_User_UserType_UserTypeID",
                table: "User",
                column: "UserTypeID",
                principalTable: "UserType",
                principalColumn: "UserTypeID",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_User_UserType_UserTypeID",
                table: "User");

            migrationBuilder.DropIndex(
                name: "IX_User_UserTypeID",
                table: "User");
        }
    }
}
