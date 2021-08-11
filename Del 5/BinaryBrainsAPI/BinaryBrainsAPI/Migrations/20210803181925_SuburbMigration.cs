using Microsoft.EntityFrameworkCore.Migrations;

namespace BinaryBrainsAPI.Migrations
{
    public partial class SuburbMigration : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "SuburbID",
                table: "User",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "Suburb",
                columns: table => new
                {
                    SuburbID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    SuburbDescription = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Suburb", x => x.SuburbID);
                });

            migrationBuilder.CreateIndex(
                name: "IX_User_SuburbID",
                table: "User",
                column: "SuburbID");

            migrationBuilder.AddForeignKey(
                name: "FK_User_Suburb_SuburbID",
                table: "User",
                column: "SuburbID",
                principalTable: "Suburb",
                principalColumn: "SuburbID",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_User_Suburb_SuburbID",
                table: "User");

            migrationBuilder.DropTable(
                name: "Suburb");

            migrationBuilder.DropIndex(
                name: "IX_User_SuburbID",
                table: "User");

            migrationBuilder.DropColumn(
                name: "SuburbID",
                table: "User");
        }
    }
}
