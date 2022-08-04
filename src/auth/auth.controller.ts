import {
  Controller,
  Request,
  Post,
  Put,
  Body,
  UseGuards,
  UnauthorizedException,
} from '@nestjs/common';
import { LocalAuthGuard } from './local-auth.guard';
import { AuthService } from './auth.service';
import { ApiBearerAuth, ApiTags  } from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';
import { CreateTokenDto } from './dto/create-token.dto';

@Controller('authentication')
@ApiTags('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Body() loginDto: LoginDto, @Request() req) {
    return this.authService.login(req.user);
  }

  @Post('create-token')
  async createToken(@Body() createToken: CreateTokenDto, @Request() req) {
    return this.authService.createLogin(createToken);
  }

  @ApiBearerAuth()
  @Put('users')
  updateUser(@Request() req, @Body() body: LoginDto) {
    const username = body.username;
    const password = body.password;
    if (req.user.username !== username && req.user.role !== 'admin') {
      throw new UnauthorizedException();
    }
    return this.authService.setPassword(username, password);
  }
}
