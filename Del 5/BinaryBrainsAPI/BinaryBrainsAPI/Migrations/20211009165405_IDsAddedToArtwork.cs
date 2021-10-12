using Microsoft.EntityFrameworkCore.Migrations;

namespace BinaryBrainsAPI.Migrations
{
    public partial class IDsAddedToArtwork : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "PaymentStatusID",
                table: "Booking",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "ExhibitionID",
                table: "Artwork",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Booking_PaymentStatusID",
                table: "Booking",
                column: "PaymentStatusID");

            migrationBuilder.CreateIndex(
                name: "IX_Artwork_ExhibitionID",
                table: "Artwork",
                column: "ExhibitionID");

            migrationBuilder.AddForeignKey(
                name: "FK_Artwork_Exhibition_ExhibitionID",
                table: "Artwork",
                column: "ExhibitionID",
                principalTable: "Exhibition",
                principalColumn: "ExhibitionID",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Booking_PaymentStatus_PaymentStatusID",
                table: "Booking",
                column: "PaymentStatusID",
                principalTable: "PaymentStatus",
                principalColumn: "PaymentStatusID",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Artwork_Exhibition_ExhibitionID",
                table: "Artwork");

            migrationBuilder.DropForeignKey(
                name: "FK_Booking_PaymentStatus_PaymentStatusID",
                table: "Booking");

            migrationBuilder.DropIndex(
                name: "IX_Booking_PaymentStatusID",
                table: "Booking");

            migrationBuilder.DropIndex(
                name: "IX_Artwork_ExhibitionID",
                table: "Artwork");

            migrationBuilder.DropColumn(
                name: "PaymentStatusID",
                table: "Booking");

            migrationBuilder.DropColumn(
                name: "ExhibitionID",
                table: "Artwork");
        }
    }
}
