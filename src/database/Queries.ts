import { ColorRow } from "../Types";
import { Knex } from "knex";

const followerReadStatement = "AS OF SYSTEM TIME follower_read_timestamp()";

class Queries {
  getColorRow = async (
    knex: Knex,
    withFollowerReads: boolean = false,
  ): Promise<ColorRow | null> => {
    let query = knex("color").toQuery();
    if (withFollowerReads) {
      query = `${query} ${followerReadStatement}`;
    }
    const results: { rows: ColorRow[] } = await knex.raw(query);
    return results.rows[0] ?? null;
  };
}

export default new Queries();
