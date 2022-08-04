import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { User } from './entity/user.entity';

import * as config from 'config';
const isAdminActive = config.get('isAdminActive');
const isUserActive = config.get('isUserActive');

let adminUser: User, demoUser: User;
if (isAdminActive) {
  createAdmin();
}

if (isUserActive) {
  createDemouser();
}

async function createAdmin() {
  const admin: string = isAdminActive ? config.get('admin') : undefined;
  const adminPass: string = isAdminActive ? config.get('adminPass') : undefined;
  adminUser = new User();
  adminUser.id = '0';
  adminUser.username = admin;
  adminUser.isActive = true;
  const hashedPassword = await bcrypt.hash(adminPass, 10);
  adminUser.password = hashedPassword;
  adminUser.role = 'admin';
}

async function createDemouser() {
  const user: string = config.get('user');
  const userPass: string = config.get('userPass');
  demoUser = new User();
  demoUser.id = '1';
  demoUser.username = user;
  demoUser.isActive = true;
  const hashedPassword = await bcrypt.hash(userPass, 10);
  demoUser.password = hashedPassword;
  demoUser.role = 'user';
}

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findForValidate(username: string) {
    if (adminUser && username === adminUser.username) {
      return Promise.resolve(adminUser);
    }
    if (demoUser && username === demoUser.username) {
      return Promise.resolve(demoUser);
    }

    return this.usersRepository
      .createQueryBuilder()
      .select('user')
      .from(User, 'user')
      .addSelect('user.password')
      .where('user.username = :username', { username })
      .getOne(); //findOne({ username }, {addSelect: "password"});
  }

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOne(username: string): Promise<User> {
    return this.usersRepository.findOneBy({ username });
  }

  update(user: User) {
    this.usersRepository.save(user);
  }

  async insertAll(users: Array<any>) {
    await this.usersRepository.insert(users);
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }

  async removeAll(): Promise<void> {
    await this.usersRepository.clear();
  }
}
