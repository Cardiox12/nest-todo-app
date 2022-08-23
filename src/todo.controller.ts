import { Controller, Post, UseGuards, Request } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { AuthService } from "./auth/auth.service";
import { LocalAuthGuard } from "./auth/local-auth.guard";


@Controller()
export class TodoController {
    constructor(private authService: AuthService) { }

    @UseGuards(LocalAuthGuard)
    @Post("auth/login")
    async login(@Request() req) {
        console.log(req.user);
        return this.authService.login(req.user);
    }
}