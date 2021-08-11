using Microsoft.EntityFrameworkCore.Migrations;

namespace BinaryBrainsAPI.Migrations
{
    public partial class ArtworkStatusMigration : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "ArtworkStatusID",
                table: "Artwork",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "ArtworkStatus",
                columns: table => new
                {
                    ArtworkStatusID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ArtworkStatusDescription = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ArtworkStatus", x => x.ArtworkStatusID);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Artwork_ArtworkStatusID",
                table: "Artwork",
                column: "ArtworkStatusID");

            migrationBuilder.AddForeignKey(
                name: "FK_Artwork_ArtworkStatus_ArtworkStatusID",
                table: "Artwork",
                column: "ArtworkStatusID",
                principalTable: "ArtworkStatus",
                principalColumn: "ArtworkStatusID",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Artwork_ArtworkStatus_ArtworkStatusID",
                table: "Artwork");

            migrationBuilder.DropTable(
                name: "ArtworkStatus");

            migrationBuilder.DropIndex(
                name: "IX_Artwork_ArtworkStatusID",
                table: "Artwork");

            migrationBuilder.DropColumn(
                name: "ArtworkStatusID",
                table: "Artwork");
        }
    }
}
