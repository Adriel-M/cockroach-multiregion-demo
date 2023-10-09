import { ColorRow } from "../Types";
import { Knex } from "knex";
import { DemoTable } from "./DemoTable";

const followerReadStatement = "AS OF SYSTEM TIME follower_read_timestamp()";

class Queries {
  getColorRow = async (
    knex: Knex,
    demoTable: DemoTable,
    withFollowerReads: boolean = false,
  ): Promise<ColorRow | null> => {
    let query = knex(demoTable.tableName).toQuery();
    if (withFollowerReads) {
      query = `${query} ${followerReadStatement}`;
    }
    const results: { rows: ColorRow[] } = await knex.raw(query);
    return results.rows[0] ?? null;
  };

  updateColor = async (
    knex: Knex,
    demoTable: DemoTable,
    color: string,
  ): Promise<void> => {
    await knex(demoTable.tableName).update({ color });
  };
}

export default new Queries();
