import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryFailedError, Repository } from 'typeorm';
import * as argon from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

import { User } from './user.entity';
import { ChangePassword, CreateUser, EditUser, SignInUser } from './dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  async signUp(dto: CreateUser) {
    const hashPassword = await argon.hash(dto.password);

    try {
      const user = await this.usersRepository.save({
        email: dto.email,
        hashPassword,
        firstName: dto.firstName,
        lastName: dto.lastName,
      });

      delete user.hashPassword;

      return this.signToken(user.id, user.email);
    } catch (error) {
      if (
        error instanceof QueryFailedError &&
        error.message.includes('Duplicate entry')
      ) {
        throw new ConflictException('Email already exists');
      }
      console.log('[CREATE_USER] ' + error);
    }
  }

  async signIn(dto: SignInUser) {
    const user = await this.usersRepository.findOne({
      where: {
        email: dto.email,
      },
    });

    if (!user) throw new ForbiddenException('Credentials incorrect');

    const pwMatches = await argon.verify(user.hashPassword, dto.password);

    if (!pwMatches) throw new ForbiddenException('Credentials incorrect');

    return this.signToken(user.id, user.email);
  }

  async signToken(
    userId: number,
    email: string,
  ): Promise<{ id: number; email: string; access_token: string }> {
    const payload = {
      sub: userId,
      email,
    };

    const secret = this.config.get('JWT_SECRET');

    const token = await this.jwt.signAsync(payload, {
      expiresIn: '15m',
      secret: secret,
    });

    return {
      id: userId,
      email: email,
      access_token: token,
    };
  }

  async findAllUsers(): Promise<User[]> {
    // try {
    const users = await this.usersRepository.find();

    if (!users) throw new NotFoundException('Users not found');

    for (const user of users) {
      delete user.hashPassword;
    }

    return users;
    // } catch (error) {
    //   console.log('FIND_ALL' + error);
    // }
  }

  async findUserById(id: number): Promise<User | null> {
    // try {
    const user = await this.usersRepository.findOneBy({ id });

    if (!user) throw new NotFoundException('Users not found');

    delete user.hashPassword;

    return user;
    // } catch (error) {
    //   console.log('[FIND_USER]' + error);
    // }
  }

  async editUser(id: number, dto: EditUser): Promise<User | null> {
    // try {
    const user = await this.usersRepository.findOneBy({ id });

    if (!user) throw new NotFoundException('Users not found');

    Object.assign(user, dto);

    const updatedUser = await this.usersRepository.save(user);

    delete updatedUser.hashPassword;

    return updatedUser;
    // } catch (error) {
    //   console.log('FIND_ONE' + error);
    // }
  }

  async changePassword(
    id: number,
    dto: ChangePassword,
  ): Promise<{ message: string }> {
    // try {
    const user = await this.usersRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException('Users not found');
    }

    const pwMatches = await argon.verify(user.hashPassword, dto.oldPassword);

    if (!pwMatches) throw new ForbiddenException('Password does not match');

    const hashPassword = await argon.hash(dto.newPassword);

    user.hashPassword = hashPassword;

    await this.usersRepository.save(user);

    return { message: 'Password Changed!' };
    // } catch (error) {
    //   console.log('[CHANGE_PASSWORD]:' + error);
    // }
  }

  async deleteUserById(id: number): Promise<{ message: string }> {
    // try {
    const user = await this.usersRepository.findOneBy({ id });

    if (!user) throw new NotFoundException('Users not found');

    await this.usersRepository.delete(id);

    return { message: 'User deleted' };
    //   } catch (error) {
    //     console.log(['DELETE_USER' + error]);
    //   }
  }

  async deleteAllUsers(): Promise<{ message: string }> {
    // try {
    const users = await this.usersRepository.find({});

    if (!users || users.length === 0 || users.length < 0)
      throw new NotFoundException('No data found!!');

    await this.usersRepository.delete({});

    return { message: 'All users deleted' };
    // } catch (error) {
    //   console.log('DELETE_ALL' + error);
    // }
  }
}
