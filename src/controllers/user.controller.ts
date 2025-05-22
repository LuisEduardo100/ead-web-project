import { Response } from "express";
import { UpdatePasswordDTO } from "src/dtos/user.dto.js";
import { RequestWithUser } from "src/middlewares/auth.middleware.js";
import { UserService } from "src/services/user.service.js";

const userService = new UserService();

export class UserController {
  async getKeepWatchingList(req: RequestWithUser, res: Response) {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(400).json({ message: "Usuário não autenticado" });
    }

    try {
      const list = await userService.getKeepWatchingList(userId);
      return res.json(list);
    } catch (error: any) {
      return res.status(404).json({ message: error.message });
    }
  }
  async show(req: RequestWithUser, res: Response) {
    const userId = req.user?.id;
    if (!userId)
      return res.status(400).json({ message: "Usuário não autenticado" });

    try {
      const user = await userService.getUserById(userId);
      return res.json(user);
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  }

  async update(req: RequestWithUser, res: Response) {
    const userId = req.user?.id;
    if (!userId)
      return res.status(400).json({ message: "Usuário não autenticado" });

    try {
      const updated = await userService.updateUser(userId, req.body);
      return res.json(updated);
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  }

  async updatePassword(req: RequestWithUser, res: Response) {
    const user = req.user;
    const { currentPassword, newPassword }: UpdatePasswordDTO = req.body;

    if (!user || !currentPassword || !newPassword) {
      return res
        .status(400)
        .json({ message: "Dados inválidos ou usuário não autenticado" });
    }

    try {
      const updated = await userService.updateUserPassword(user.id, {
        currentPassword,
        newPassword,
      });

      if (!updated) {
        return res.status(400).json({ message: "Senha atual incorreta" });
      }

      return res.status(204).send();
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  }
}
