import { DataSource, EntityTarget, ObjectLiteral, Repository } from "typeorm";
import config from "./config/ormconfig";

export class ConnectionManager {
  public static connection: DataSource;

  public async fetchDbConnection(): Promise<DataSource> {
    try {
      if (!ConnectionManager.connection) {
        const appDataSource = new DataSource(config);
        ConnectionManager.connection = await appDataSource.initialize();
      }
      return ConnectionManager.connection;
    } catch (error) {
      console.error("Database connection failed:", error);
      throw error;
    }
  }

  public getRepository<T extends ObjectLiteral>(
    target: EntityTarget<T>
  ): Repository<T> {
    return ConnectionManager.connection.getRepository(target);
  }
}

export const connectionManager = new ConnectionManager();
