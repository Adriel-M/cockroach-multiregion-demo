import DatabaseConnection from "../database/DatabaseConnection";

import connectionInfo from "../connectionInfo.json";

class MainWindowDatabaseManager {
  private databaseConnection: DatabaseConnection;

  constructor() {
    this.databaseConnection = new DatabaseConnection(connectionInfo[0]);
  }

  async setupDatabase() {
    await this.databaseConnection.knex.raw("DROP DATABASE IF EXISTS defaultdb");
    await this.databaseConnection.knex.raw("CREATE DATABASE defaultdb");
    await this.databaseConnection.knex.raw(
      `ALTER DATABASE defaultdb PRIMARY REGION "us-west1"`,
    );
    await this.databaseConnection.knex.raw(
      `ALTER DATABASE defaultdb ADD REGION "europe-west1"`,
    );
    await this.databaseConnection.knex.raw("DROP TABLE IF EXISTS color");
    await this.databaseConnection.knex.raw(
      `
      CREATE TABLE color(
          id INT PRIMARY KEY,
          color VARCHAR(10) NOT NULL
      );
      `,
    );
    await this.databaseConnection
      .knex("color")
      .insert({ id: 1, color: "primary" });
  }
}

export default new MainWindowDatabaseManager();
