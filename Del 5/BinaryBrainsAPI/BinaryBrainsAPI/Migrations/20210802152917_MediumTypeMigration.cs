using Microsoft.EntityFrameworkCore.Migrations;

namespace BinaryBrainsAPI.Migrations
{
    public partial class MediumTypeMigration : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "MediumTypeID",
                table: "Artwork",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "MediumType",
                columns: table => new
                {
                    MediumTypeID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    MediumTypeName = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MediumType", x => x.MediumTypeID);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Artwork_MediumTypeID",
                table: "Artwork",
                column: "MediumTypeID");

            migrationBuilder.AddForeignKey(
                name: "FK_Artwork_MediumType_MediumTypeID",
                table: "Artwork",
                column: "MediumTypeID",
                principalTable: "MediumType",
                principalColumn: "MediumTypeID",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Artwork_MediumType_MediumTypeID",
                table: "Artwork");

            migrationBuilder.DropTable(
                name: "MediumType");

            migrationBuilder.DropIndex(
                name: "IX_Artwork_MediumTypeID",
                table: "Artwork");

            migrationBuilder.DropColumn(
                name: "MediumTypeID",
                table: "Artwork");
        }
    }
}
