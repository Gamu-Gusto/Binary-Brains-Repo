using Microsoft.EntityFrameworkCore.Migrations;

namespace BinaryBrainsAPI.Migrations
{
    public partial class ExhibitionAnnouncementMigration : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "ExhibitionAnnouncementID",
                table: "Exhibition",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "ExhibitionAnnouncement",
                columns: table => new
                {
                    ExhibitionAnnouncementID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ExhibitionAnnouncementDescription = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ExhibitionAnnouncement", x => x.ExhibitionAnnouncementID);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Exhibition_ExhibitionAnnouncementID",
                table: "Exhibition",
                column: "ExhibitionAnnouncementID");

            migrationBuilder.AddForeignKey(
                name: "FK_Exhibition_ExhibitionAnnouncement_ExhibitionAnnouncementID",
                table: "Exhibition",
                column: "ExhibitionAnnouncementID",
                principalTable: "ExhibitionAnnouncement",
                principalColumn: "ExhibitionAnnouncementID",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Exhibition_ExhibitionAnnouncement_ExhibitionAnnouncementID",
                table: "Exhibition");

            migrationBuilder.DropTable(
                name: "ExhibitionAnnouncement");

            migrationBuilder.DropIndex(
                name: "IX_Exhibition_ExhibitionAnnouncementID",
                table: "Exhibition");

            migrationBuilder.DropColumn(
                name: "ExhibitionAnnouncementID",
                table: "Exhibition");
        }
    }
}
