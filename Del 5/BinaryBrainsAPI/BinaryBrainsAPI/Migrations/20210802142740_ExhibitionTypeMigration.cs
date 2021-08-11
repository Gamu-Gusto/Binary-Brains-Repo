using Microsoft.EntityFrameworkCore.Migrations;

namespace BinaryBrainsAPI.Migrations
{
    public partial class ExhibitionTypeMigration : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "ExhibitionTypeID",
                table: "Exhibition",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "ExhibitionType",
                columns: table => new
                {
                    ExhibitionTypeID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ExhibitionTypeDecription = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ExhibitionType", x => x.ExhibitionTypeID);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Exhibition_ExhibitionTypeID",
                table: "Exhibition",
                column: "ExhibitionTypeID");

            migrationBuilder.AddForeignKey(
                name: "FK_Exhibition_ExhibitionType_ExhibitionTypeID",
                table: "Exhibition",
                column: "ExhibitionTypeID",
                principalTable: "ExhibitionType",
                principalColumn: "ExhibitionTypeID",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Exhibition_ExhibitionType_ExhibitionTypeID",
                table: "Exhibition");

            migrationBuilder.DropTable(
                name: "ExhibitionType");

            migrationBuilder.DropIndex(
                name: "IX_Exhibition_ExhibitionTypeID",
                table: "Exhibition");

            migrationBuilder.DropColumn(
                name: "ExhibitionTypeID",
                table: "Exhibition");
        }
    }
}
