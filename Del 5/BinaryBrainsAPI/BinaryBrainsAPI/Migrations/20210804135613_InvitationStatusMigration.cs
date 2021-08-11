using Microsoft.EntityFrameworkCore.Migrations;

namespace BinaryBrainsAPI.Migrations
{
    public partial class InvitationStatusMigration : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "InvitationStatusID",
                table: "Invitation",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "InvitationStatus",
                columns: table => new
                {
                    InvitationStatusID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    InvitationStatusDescription = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_InvitationStatus", x => x.InvitationStatusID);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Invitation_InvitationStatusID",
                table: "Invitation",
                column: "InvitationStatusID");

            migrationBuilder.AddForeignKey(
                name: "FK_Invitation_InvitationStatus_InvitationStatusID",
                table: "Invitation",
                column: "InvitationStatusID",
                principalTable: "InvitationStatus",
                principalColumn: "InvitationStatusID",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Invitation_InvitationStatus_InvitationStatusID",
                table: "Invitation");

            migrationBuilder.DropTable(
                name: "InvitationStatus");

            migrationBuilder.DropIndex(
                name: "IX_Invitation_InvitationStatusID",
                table: "Invitation");

            migrationBuilder.DropColumn(
                name: "InvitationStatusID",
                table: "Invitation");
        }
    }
}
