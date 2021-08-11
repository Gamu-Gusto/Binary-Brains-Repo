using Microsoft.EntityFrameworkCore.Migrations;

namespace BinaryBrainsAPI.Migrations
{
    public partial class SurfaceTypeMigration : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "SurfaceTypeID",
                table: "Artwork",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "SurfaceType",
                columns: table => new
                {
                    SurfaceTypeID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    SurfaceTypeName = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SurfaceType", x => x.SurfaceTypeID);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Artwork_SurfaceTypeID",
                table: "Artwork",
                column: "SurfaceTypeID");

            migrationBuilder.AddForeignKey(
                name: "FK_Artwork_SurfaceType_SurfaceTypeID",
                table: "Artwork",
                column: "SurfaceTypeID",
                principalTable: "SurfaceType",
                principalColumn: "SurfaceTypeID",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Artwork_SurfaceType_SurfaceTypeID",
                table: "Artwork");

            migrationBuilder.DropTable(
                name: "SurfaceType");

            migrationBuilder.DropIndex(
                name: "IX_Artwork_SurfaceTypeID",
                table: "Artwork");

            migrationBuilder.DropColumn(
                name: "SurfaceTypeID",
                table: "Artwork");
        }
    }
}
