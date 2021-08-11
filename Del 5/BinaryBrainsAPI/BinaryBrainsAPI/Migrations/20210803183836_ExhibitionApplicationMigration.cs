using Microsoft.EntityFrameworkCore.Migrations;

namespace BinaryBrainsAPI.Migrations
{
    public partial class ExhibitionApplicationMigration : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "ExhibitionApplication",
                columns: table => new
                {
                    ExhibitionApplicationID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ExhibitionPicture1 = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ExhibitionPicture2 = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ExhibitionPicture3 = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ApplicationDescription = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ExhibitionID = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ExhibitionApplication", x => x.ExhibitionApplicationID);
                    table.ForeignKey(
                        name: "FK_ExhibitionApplication_Exhibition_ExhibitionID",
                        column: x => x.ExhibitionID,
                        principalTable: "Exhibition",
                        principalColumn: "ExhibitionID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ExhibitionApplication_ExhibitionID",
                table: "ExhibitionApplication",
                column: "ExhibitionID");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ExhibitionApplication");
        }
    }
}
