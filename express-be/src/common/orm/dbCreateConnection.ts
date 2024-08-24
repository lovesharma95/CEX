import { DataSource } from "typeorm";
import config from "./config/ormconfig";

const AppDataSource = new DataSource(config);

export const dbCreateConnection = async (): Promise<DataSource | null> => {
  try {
    const dataSource = await AppDataSource.initialize();
    console.log(
      `Database connection success. Connection name: '${dataSource.name}' Database: '${dataSource.options.database}'`
    );
    return dataSource;
  } catch (err) {
    if (AppDataSource.isInitialized) {
      console.log("Database connection already initialized.");
      return AppDataSource;
    }
    console.error("Error during Data Source initialization:", err);
  }
  return null;
};
