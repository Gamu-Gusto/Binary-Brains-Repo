using Microsoft.EntityFrameworkCore.Migrations;

namespace BinaryBrainsAPI.Migrations
{
    public partial class ArtworkDimensionMigration : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "ArtworkDimensionID",
                table: "Artwork",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "ArtworkDimension",
                columns: table => new
                {
                    ArtworkDimensionID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ArtworkDimensionDescription = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ArtworkDimension", x => x.ArtworkDimensionID);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Artwork_ArtworkDimensionID",
                table: "Artwork",
                column: "ArtworkDimensionID");

            migrationBuilder.AddForeignKey(
                name: "FK_Artwork_ArtworkDimension_ArtworkDimensionID",
                table: "Artwork",
                column: "ArtworkDimensionID",
                principalTable: "ArtworkDimension",
                principalColumn: "ArtworkDimensionID",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Artwork_ArtworkDimension_ArtworkDimensionID",
                table: "Artwork");

            migrationBuilder.DropTable(
                name: "ArtworkDimension");

            migrationBuilder.DropIndex(
                name: "IX_Artwork_ArtworkDimensionID",
                table: "Artwork");

            migrationBuilder.DropColumn(
                name: "ArtworkDimensionID",
                table: "Artwork");
        }
    }
}
