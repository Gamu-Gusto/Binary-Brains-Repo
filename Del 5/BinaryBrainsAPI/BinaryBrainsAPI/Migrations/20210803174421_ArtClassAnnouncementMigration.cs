using Microsoft.EntityFrameworkCore.Migrations;

namespace BinaryBrainsAPI.Migrations
{
    public partial class ArtClassAnnouncementMigration : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "ArtClassAnnouncementID",
                table: "ArtClasse",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "ArtClassAnnouncement",
                columns: table => new
                {
                    ArtClassAnnouncementID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ArtClassAnnouncementDescription = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ArtClassAnnouncement", x => x.ArtClassAnnouncementID);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ArtClasse_ArtClassAnnouncementID",
                table: "ArtClasse",
                column: "ArtClassAnnouncementID");

            migrationBuilder.AddForeignKey(
                name: "FK_ArtClasse_ArtClassAnnouncement_ArtClassAnnouncementID",
                table: "ArtClasse",
                column: "ArtClassAnnouncementID",
                principalTable: "ArtClassAnnouncement",
                principalColumn: "ArtClassAnnouncementID",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ArtClasse_ArtClassAnnouncement_ArtClassAnnouncementID",
                table: "ArtClasse");

            migrationBuilder.DropTable(
                name: "ArtClassAnnouncement");

            migrationBuilder.DropIndex(
                name: "IX_ArtClasse_ArtClassAnnouncementID",
                table: "ArtClasse");

            migrationBuilder.DropColumn(
                name: "ArtClassAnnouncementID",
                table: "ArtClasse");
        }
    }
}
