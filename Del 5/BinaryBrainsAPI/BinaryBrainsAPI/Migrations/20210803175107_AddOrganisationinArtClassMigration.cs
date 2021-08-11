using Microsoft.EntityFrameworkCore.Migrations;

namespace BinaryBrainsAPI.Migrations
{
    public partial class AddOrganisationinArtClassMigration : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "OrganisationID",
                table: "ArtClasse",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_ArtClasse_OrganisationID",
                table: "ArtClasse",
                column: "OrganisationID");

            migrationBuilder.AddForeignKey(
                name: "FK_ArtClasse_Organisation_OrganisationID",
                table: "ArtClasse",
                column: "OrganisationID",
                principalTable: "Organisation",
                principalColumn: "OrganisationID",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ArtClasse_Organisation_OrganisationID",
                table: "ArtClasse");

            migrationBuilder.DropIndex(
                name: "IX_ArtClasse_OrganisationID",
                table: "ArtClasse");

            migrationBuilder.DropColumn(
                name: "OrganisationID",
                table: "ArtClasse");
        }
    }
}
