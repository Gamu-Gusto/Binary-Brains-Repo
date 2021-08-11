using Microsoft.EntityFrameworkCore.Migrations;

namespace BinaryBrainsAPI.Migrations
{
    public partial class AddClassTeacherinArtClassMigration : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "ClassTeacherID",
                table: "ArtClasse",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_ArtClasse_ClassTeacherID",
                table: "ArtClasse",
                column: "ClassTeacherID");

            migrationBuilder.AddForeignKey(
                name: "FK_ArtClasse_ClassTeacher_ClassTeacherID",
                table: "ArtClasse",
                column: "ClassTeacherID",
                principalTable: "ClassTeacher",
                principalColumn: "ClassTeacherID",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ArtClasse_ClassTeacher_ClassTeacherID",
                table: "ArtClasse");

            migrationBuilder.DropIndex(
                name: "IX_ArtClasse_ClassTeacherID",
                table: "ArtClasse");

            migrationBuilder.DropColumn(
                name: "ClassTeacherID",
                table: "ArtClasse");
        }
    }
}
