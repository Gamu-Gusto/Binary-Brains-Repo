using Microsoft.EntityFrameworkCore.Migrations;

namespace BinaryBrainsAPI.Migrations
{
    public partial class TeacherTypeMigration : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "TeacherTypeID",
                table: "ClassTeacher",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "TeacherType",
                columns: table => new
                {
                    TeacherTypeID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    TeacherTypeDescription = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TeacherType", x => x.TeacherTypeID);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ClassTeacher_TeacherTypeID",
                table: "ClassTeacher",
                column: "TeacherTypeID");

            migrationBuilder.AddForeignKey(
                name: "FK_ClassTeacher_TeacherType_TeacherTypeID",
                table: "ClassTeacher",
                column: "TeacherTypeID",
                principalTable: "TeacherType",
                principalColumn: "TeacherTypeID",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ClassTeacher_TeacherType_TeacherTypeID",
                table: "ClassTeacher");

            migrationBuilder.DropTable(
                name: "TeacherType");

            migrationBuilder.DropIndex(
                name: "IX_ClassTeacher_TeacherTypeID",
                table: "ClassTeacher");

            migrationBuilder.DropColumn(
                name: "TeacherTypeID",
                table: "ClassTeacher");
        }
    }
}
