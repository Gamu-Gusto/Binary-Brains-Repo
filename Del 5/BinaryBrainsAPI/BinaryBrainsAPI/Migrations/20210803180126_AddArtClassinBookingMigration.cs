using Microsoft.EntityFrameworkCore.Migrations;

namespace BinaryBrainsAPI.Migrations
{
    public partial class AddArtClassinBookingMigration : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "ArtClassID",
                table: "Booking",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Booking_ArtClassID",
                table: "Booking",
                column: "ArtClassID");

            migrationBuilder.AddForeignKey(
                name: "FK_Booking_ArtClasse_ArtClassID",
                table: "Booking",
                column: "ArtClassID",
                principalTable: "ArtClasse",
                principalColumn: "ArtClassID",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Booking_ArtClasse_ArtClassID",
                table: "Booking");

            migrationBuilder.DropIndex(
                name: "IX_Booking_ArtClassID",
                table: "Booking");

            migrationBuilder.DropColumn(
                name: "ArtClassID",
                table: "Booking");
        }
    }
}
