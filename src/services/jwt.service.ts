import jwt, { SignOptions } from "jsonwebtoken";
import { JWT_KEY } from "../config/environment.js";

export const jwtService = {
  signPayload: (
    payload: string | object | Buffer,
    expiration: SignOptions["expiresIn"]
  ) => {
    return jwt.sign(payload, JWT_KEY, { expiresIn: expiration });
  },

  verifyToken: (token: string, callbackfn: jwt.VerifyCallback) => {
    jwt.verify(token, JWT_KEY, callbackfn);
  },

  verifyTokenAsync(token: string): Promise<jwt.JwtPayload | string> {
    return new Promise((resolve, reject) => {
      jwt.verify(token, JWT_KEY, (err, decoded) => {
        if (err || !decoded) {
          return reject(err);
        }
        resolve(decoded);
      });
    });
  },
};
