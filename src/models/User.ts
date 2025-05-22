import { database } from "../database/index.js";
import { DataTypes, Model, Optional } from "sequelize";
import bcrypt from "bcrypt";
import { EpisodeInstance } from "./Episode.js";

export interface UserAttributes {
  id: number;
  firstName: string;
  lastName: string;
  phone: string;
  birth: Date;
  email: string;
  password: string;
  role: "admin" | "user";
}

export interface UserCreationAttributes
  extends Optional<UserAttributes, "id"> {}

export interface UserInstance
  extends Model<UserAttributes, UserCreationAttributes>,
    UserAttributes {
  episodes?: EpisodeInstance[];
}

export const User = database.define<UserInstance, UserAttributes>(
  "users",
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    firstName: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    lastName: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    phone: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    birth: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    email: {
      allowNull: false,
      unique: true,
      type: DataTypes.STRING,
      validate: {
        isEmail: true,
      },
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    role: {
      allowNull: false,
      type: DataTypes.STRING,
    },
  },
  {
    hooks: {
      beforeSave: async (user) => {
        if (user.isNewRecord || user.changed("password")) {
          user.password = await bcrypt.hash(user.password.toString(), 10);
        }
      },
    },
  }
);

export function checkPassword(
  password: string,
  userPassword: string,
  callbackfn: (err: Error | undefined, isSame: boolean) => void
) {
  bcrypt.compare(password, userPassword, (err, isSame) => {
    if (err) {
      callbackfn(err, false);
    } else {
      callbackfn(err, isSame);
    }
  });
}
