import { ColorRow } from "../Types";
import { Knex } from "knex";
import { DemoTable } from "./DemoTable";

const followerReadStatement = "AS OF SYSTEM TIME follower_read_timestamp()";

class Queries {
  getColorRow = async (
    knex: Knex,
    demoTable: DemoTable,
    withFollowerReads: boolean = false,
  ): Promise<QueryResult<ColorRow> | null> => {
    let queryString = knex(demoTable.tableName).toQuery();
    if (withFollowerReads) {
      queryString = `${queryString} ${followerReadStatement}`;
    }
    const results: { rows: ColorRow[] } = await knex.raw(queryString);
    if (!results.rows[0]) {
      return null;
    }

    return new QueryResult(results.rows[0], queryString);
  };

  updateColor = async (
    knex: Knex,
    demoTable: DemoTable,
    color: string,
  ): Promise<QueryResult<void>> => {
    const query = knex(demoTable.tableName).update({ color });
    const queryString = query.toQuery();
    await query;
    return new QueryResult(undefined, queryString);
  };
}

class QueryResult<T> {
  results: T;
  queryString: string;

  constructor(result: T, queryString: string) {
    this.results = result;
    this.queryString = queryString;
  }
}

export default new Queries();
