import { DataTypes, Model } from "sequelize";
import { database } from "../database/index.js";

export interface WatchTime {
  seconds: number;
  userId: number;
  episodeId: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface WatchTimeInstance extends Model<WatchTime>, WatchTime {}

export const WatchTime = database.define<WatchTimeInstance, WatchTime>(
  "watch_times",
  {
    seconds: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    userId: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.INTEGER,
      references: { model: "users", key: "id" },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    episodeId: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.INTEGER,
      references: { model: "episodes", key: "id" },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
  }
);
