import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags, ApiOperation, ApiBody, ApiResponse } from '@nestjs/swagger';

@Controller('auth')
@ApiTags('auth') // Grouping under 'auth' in Swagger
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @ApiOperation({ summary: 'User login' })
  @ApiBody({
    schema: {
      properties: {
        username: { type: 'string', example: 'user123' },
        password: { type: 'string', example: 'password123' },
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'Successful login, returns a JWT token.',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized, invalid credentials.',
  })
  async login(@Body() body: { username: string; password: string }) {
    return this.authService.login(body);
  }

  @Post('signup')
  @ApiOperation({ summary: 'User signup' })
  @ApiBody({
    schema: {
      properties: {
        username: { type: 'string', example: 'user123' },
        password: { type: 'string', example: 'password123' },
        email: { type: 'string', example: 'user@example.com' },
      },
    },
  })
  @ApiResponse({ status: 201, description: 'User successfully registered.' })
  @ApiResponse({
    status: 400,
    description: 'Bad request, user already exists or invalid data.',
  })
  async signUp(
    @Body() body: { username: string; password: string; email?: string },
  ) {
    return this.authService.signUp(body.username, body.password, body.email);
  }
}
