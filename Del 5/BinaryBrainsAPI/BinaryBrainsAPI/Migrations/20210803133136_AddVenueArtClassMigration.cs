using Microsoft.EntityFrameworkCore.Migrations;

namespace BinaryBrainsAPI.Migrations
{
    public partial class AddVenueArtClassMigration : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "VenueID",
                table: "ArtClasse",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_ArtClasse_VenueID",
                table: "ArtClasse",
                column: "VenueID");

            migrationBuilder.AddForeignKey(
                name: "FK_ArtClasse_Venue_VenueID",
                table: "ArtClasse",
                column: "VenueID",
                principalTable: "Venue",
                principalColumn: "VenueID",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ArtClasse_Venue_VenueID",
                table: "ArtClasse");

            migrationBuilder.DropIndex(
                name: "IX_ArtClasse_VenueID",
                table: "ArtClasse");

            migrationBuilder.DropColumn(
                name: "VenueID",
                table: "ArtClasse");
        }
    }
}
