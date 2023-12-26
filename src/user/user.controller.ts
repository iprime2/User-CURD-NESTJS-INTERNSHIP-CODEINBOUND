import { ChangePassword, CreateUser, EditUser, SignInUser } from './dto';
import { JwtGuard } from './guard';
import { UserService } from './user.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';

@Controller('users')
export class UserController {
  constructor(private UserService: UserService) {}
  @Get()
  findAll() {
    return this.UserService.findAllUsers();
  }

  @Post('signup')
  create(@Body() dto: CreateUser) {
    return this.UserService.signUp(dto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('signin')
  signIn(@Body() dto: SignInUser) {
    return this.UserService.signIn(dto);
  }

  @UseGuards(JwtGuard)
  @Patch(':id')
  edit(@Param('id', ParseIntPipe) id: number, @Body() dto: EditUser) {
    return this.UserService.editUser(id, dto);
  }

  @UseGuards(JwtGuard)
  @Patch('changepassword/:id')
  changePassword(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: ChangePassword,
  ) {
    return this.UserService.changePassword(id, dto);
  }

  @UseGuards(JwtGuard)
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.UserService.findUserById(id);
  }

  @UseGuards(JwtGuard)
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.UserService.deleteUserById(id);
  }

  @UseGuards(JwtGuard)
  @Delete()
  removeAll() {
    return this.UserService.deleteAllUsers();
  }
}
