import { Request, Response } from "express";
import { AuthService } from "../services/auth.service.js";

export class AuthController {
  private authService = new AuthService();
  async register(req: Request, res: Response) {
    try {
      const user = await this.authService.register(req.body);
      return res.status(201).json(user);
    } catch (err) {
      return res.status(400).json({ message: (err as Error).message });
    }
  }

  async login(req: Request, res: Response) {
    try {
      const result = await this.authService.login(req.body);
      return res.json({ authenticated: true, ...result });
    } catch (err) {
      return res.status(401).json({ message: (err as Error).message });
    }
  }
}
