class RegionalInfo {
  private readonly regionalMode: RegionalMode;
  private readonly region: string | null;

  constructor(regionalMode: RegionalMode, region: string = null) {
    this.regionalMode = regionalMode;
    this.region = region;
  }

  toCreateTableSql(): string {
    if (this.regionalMode === RegionalMode.Global) {
      return "LOCALITY GLOBAL";
    } else {
      return `LOCALITY REGIONAL BY TABLE IN "${this.region}"`;
    }
  }
}

enum RegionalMode {
  Global = 1,
  Regional,
}

export class DemoTable {
  tableName: string;
  private readonly regionalInfo: RegionalInfo;

  constructor(tableName: string, regionalInfo: RegionalInfo) {
    this.tableName = tableName;
    this.regionalInfo = regionalInfo;
  }

  toCreateTableSql(): string {
    return `
      CREATE TABLE ${this.tableName}(
          id INT PRIMARY KEY,
          color VARCHAR(10) NOT NULL
      ) ${this.regionalInfo.toCreateTableSql()};
      `;
  }

  static ColorGlobal = new DemoTable(
    "color_global",
    new RegionalInfo(RegionalMode.Global),
  );

  static ColorRegionalUsWest1 = new DemoTable(
    "color_regional_us_west1",
    new RegionalInfo(RegionalMode.Regional, "us-west1"),
  );

  static ColorRegionalUsEast1 = new DemoTable(
    "color_regional_us_east1",
    new RegionalInfo(RegionalMode.Regional, "us-east1"),
  );

  static ColorRegionalEuWest1 = new DemoTable(
    "color_regional_eu_west1",
    new RegionalInfo(RegionalMode.Regional, "europe-west1"),
  );
}

export const demoTables = [
  DemoTable.ColorGlobal,
  DemoTable.ColorRegionalUsWest1,
  DemoTable.ColorRegionalUsEast1,
  DemoTable.ColorRegionalEuWest1,
];
