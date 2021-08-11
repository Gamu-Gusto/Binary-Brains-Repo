using Microsoft.EntityFrameworkCore.Migrations;

namespace BinaryBrainsAPI.Migrations
{
    public partial class ArtClassTypeMigration : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "ArtClassTypeID",
                table: "ArtClasse",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "ArtClassType",
                columns: table => new
                {
                    ArtClassTypeID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ArtClassTypeDescription = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ArtClassType", x => x.ArtClassTypeID);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ArtClasse_ArtClassTypeID",
                table: "ArtClasse",
                column: "ArtClassTypeID");

            migrationBuilder.AddForeignKey(
                name: "FK_ArtClasse_ArtClassType_ArtClassTypeID",
                table: "ArtClasse",
                column: "ArtClassTypeID",
                principalTable: "ArtClassType",
                principalColumn: "ArtClassTypeID",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ArtClasse_ArtClassType_ArtClassTypeID",
                table: "ArtClasse");

            migrationBuilder.DropTable(
                name: "ArtClassType");

            migrationBuilder.DropIndex(
                name: "IX_ArtClasse_ArtClassTypeID",
                table: "ArtClasse");

            migrationBuilder.DropColumn(
                name: "ArtClassTypeID",
                table: "ArtClasse");
        }
    }
}
