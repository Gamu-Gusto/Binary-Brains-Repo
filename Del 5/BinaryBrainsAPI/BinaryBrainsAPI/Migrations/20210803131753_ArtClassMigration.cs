using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace BinaryBrainsAPI.Migrations
{
    public partial class ArtClassMigration : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "PaymentID",
                table: "Booking",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "ArtClasse",
                columns: table => new
                {
                    ArtClassID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ArtClassName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ArtClassDescription = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ArtClassStartDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ArtClassEndDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ClassLimit = table.Column<int>(type: "int", nullable: false),
                    RefundDayLimit = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ArtClasse", x => x.ArtClassID);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Booking_PaymentID",
                table: "Booking",
                column: "PaymentID");

            migrationBuilder.AddForeignKey(
                name: "FK_Booking_Payment_PaymentID",
                table: "Booking",
                column: "PaymentID",
                principalTable: "Payment",
                principalColumn: "PaymentID",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Booking_Payment_PaymentID",
                table: "Booking");

            migrationBuilder.DropTable(
                name: "ArtClasse");

            migrationBuilder.DropIndex(
                name: "IX_Booking_PaymentID",
                table: "Booking");

            migrationBuilder.DropColumn(
                name: "PaymentID",
                table: "Booking");
        }
    }
}
