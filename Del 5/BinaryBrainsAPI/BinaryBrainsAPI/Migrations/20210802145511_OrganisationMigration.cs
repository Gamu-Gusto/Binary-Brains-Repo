using Microsoft.EntityFrameworkCore.Migrations;

namespace BinaryBrainsAPI.Migrations
{
    public partial class OrganisationMigration : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "OrganisationID",
                table: "Exhibition",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "Organisation",
                columns: table => new
                {
                    OrganisationID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    OrganisationalAddress = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    OrganisationalName = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Organisation", x => x.OrganisationID);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Exhibition_OrganisationID",
                table: "Exhibition",
                column: "OrganisationID");

            migrationBuilder.AddForeignKey(
                name: "FK_Exhibition_Organisation_OrganisationID",
                table: "Exhibition",
                column: "OrganisationID",
                principalTable: "Organisation",
                principalColumn: "OrganisationID",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Exhibition_Organisation_OrganisationID",
                table: "Exhibition");

            migrationBuilder.DropTable(
                name: "Organisation");

            migrationBuilder.DropIndex(
                name: "IX_Exhibition_OrganisationID",
                table: "Exhibition");

            migrationBuilder.DropColumn(
                name: "OrganisationID",
                table: "Exhibition");
        }
    }
}
