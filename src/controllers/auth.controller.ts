import { Request, Response } from "express";
import { AuthService } from "../services/auth.service.js";

const authService = new AuthService();

export class AuthController {
  async register(req: Request, res: Response) {
    try {
      const user = await authService.register(req.body);
      return res.status(201).json(user);
    } catch (err) {
      return res.status(400).json({ message: (err as Error).message });
    }
  }

  async login(req: Request, res: Response) {
    try {
      const result = await authService.login(req.body);
      return res.json({ authenticated: true, ...result });
    } catch (err) {
      return res.status(401).json({ message: (err as Error).message });
    }
  }
}
