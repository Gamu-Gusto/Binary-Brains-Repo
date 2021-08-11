using Microsoft.EntityFrameworkCore.Migrations;

namespace BinaryBrainsAPI.Migrations
{
    public partial class BookingNotificationMigration : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "BookingNotificationID",
                table: "Booking",
                type: "int",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "BookingNotification",
                columns: table => new
                {
                    BookingNotificationID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    BookNotificationDescription = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BookingNotification", x => x.BookingNotificationID);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Booking_BookingNotificationID",
                table: "Booking",
                column: "BookingNotificationID");

            migrationBuilder.AddForeignKey(
                name: "FK_Booking_BookingNotification_BookingNotificationID",
                table: "Booking",
                column: "BookingNotificationID",
                principalTable: "BookingNotification",
                principalColumn: "BookingNotificationID",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Booking_BookingNotification_BookingNotificationID",
                table: "Booking");

            migrationBuilder.DropTable(
                name: "BookingNotification");

            migrationBuilder.DropIndex(
                name: "IX_Booking_BookingNotificationID",
                table: "Booking");

            migrationBuilder.DropColumn(
                name: "BookingNotificationID",
                table: "Booking");
        }
    }
}
