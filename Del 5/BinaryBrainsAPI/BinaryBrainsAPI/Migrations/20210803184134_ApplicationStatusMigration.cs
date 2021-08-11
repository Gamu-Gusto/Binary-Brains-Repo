using Microsoft.EntityFrameworkCore.Migrations;

namespace BinaryBrainsAPI.Migrations
{
    public partial class ApplicationStatusMigration : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "ApplicationStatusID",
                table: "ExhibitionApplication",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "ApplicationStatus",
                columns: table => new
                {
                    ApplicationStatusID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ApplicationStatusDescription = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ApplicationStatus", x => x.ApplicationStatusID);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ExhibitionApplication_ApplicationStatusID",
                table: "ExhibitionApplication",
                column: "ApplicationStatusID");

            migrationBuilder.AddForeignKey(
                name: "FK_ExhibitionApplication_ApplicationStatus_ApplicationStatusID",
                table: "ExhibitionApplication",
                column: "ApplicationStatusID",
                principalTable: "ApplicationStatus",
                principalColumn: "ApplicationStatusID",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ExhibitionApplication_ApplicationStatus_ApplicationStatusID",
                table: "ExhibitionApplication");

            migrationBuilder.DropTable(
                name: "ApplicationStatus");

            migrationBuilder.DropIndex(
                name: "IX_ExhibitionApplication_ApplicationStatusID",
                table: "ExhibitionApplication");

            migrationBuilder.DropColumn(
                name: "ApplicationStatusID",
                table: "ExhibitionApplication");
        }
    }
}
