using Microsoft.EntityFrameworkCore.Migrations;

namespace BinaryBrainsAPI.Migrations
{
    public partial class ScheduleTypeMigration : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "ScheduleTypeID",
                table: "Schedule",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "ScheduleType",
                columns: table => new
                {
                    ScheduleTypeID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ScheduleTypeDescription = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ScheduleType", x => x.ScheduleTypeID);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Schedule_ScheduleTypeID",
                table: "Schedule",
                column: "ScheduleTypeID");

            migrationBuilder.AddForeignKey(
                name: "FK_Schedule_ScheduleType_ScheduleTypeID",
                table: "Schedule",
                column: "ScheduleTypeID",
                principalTable: "ScheduleType",
                principalColumn: "ScheduleTypeID",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Schedule_ScheduleType_ScheduleTypeID",
                table: "Schedule");

            migrationBuilder.DropTable(
                name: "ScheduleType");

            migrationBuilder.DropIndex(
                name: "IX_Schedule_ScheduleTypeID",
                table: "Schedule");

            migrationBuilder.DropColumn(
                name: "ScheduleTypeID",
                table: "Schedule");
        }
    }
}
