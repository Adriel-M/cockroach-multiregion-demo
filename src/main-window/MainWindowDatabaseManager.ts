import DatabaseConnection from "../database/DatabaseConnection";

import connectionInfo from "../connectionInfo.json";
import { demoTables } from "../database/DemoTable";

class MainWindowDatabaseManager {
  private databaseConnection: DatabaseConnection;

  constructor() {
    this.databaseConnection = new DatabaseConnection(connectionInfo[0]);
  }

  async setupDatabase() {
    await this.databaseConnection.knex.raw("DROP DATABASE IF EXISTS defaultdb");
    await this.databaseConnection.knex.raw("CREATE DATABASE defaultdb");
    await this.databaseConnection.knex.raw(
      `ALTER DATABASE defaultdb PRIMARY REGION "us-east1"`,
    );
    await this.databaseConnection.knex.raw(
      `ALTER DATABASE defaultdb ADD REGION "us-west1"`,
    );
    await this.databaseConnection.knex.raw(
      `ALTER DATABASE defaultdb ADD REGION "europe-west1"`,
    );
    for (const demoTable of demoTables) {
      await this.databaseConnection.knex.raw(demoTable.toCreateTableSql());
      await this.databaseConnection
        .knex(demoTable.tableName)
        .insert({ id: 1, color: "primary" });
    }
  }
}

export default new MainWindowDatabaseManager();
