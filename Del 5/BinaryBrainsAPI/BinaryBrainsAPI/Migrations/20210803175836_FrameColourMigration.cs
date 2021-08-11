using Microsoft.EntityFrameworkCore.Migrations;

namespace BinaryBrainsAPI.Migrations
{
    public partial class FrameColourMigration : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "FrameColourID",
                table: "Artwork",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "FrameColour",
                columns: table => new
                {
                    FrameColourID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    FrameColourDescription = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FrameColour", x => x.FrameColourID);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Artwork_FrameColourID",
                table: "Artwork",
                column: "FrameColourID");

            migrationBuilder.AddForeignKey(
                name: "FK_Artwork_FrameColour_FrameColourID",
                table: "Artwork",
                column: "FrameColourID",
                principalTable: "FrameColour",
                principalColumn: "FrameColourID",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Artwork_FrameColour_FrameColourID",
                table: "Artwork");

            migrationBuilder.DropTable(
                name: "FrameColour");

            migrationBuilder.DropIndex(
                name: "IX_Artwork_FrameColourID",
                table: "Artwork");

            migrationBuilder.DropColumn(
                name: "FrameColourID",
                table: "Artwork");
        }
    }
}
