import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  testUsers(): string {
    return 'Users service is running';
  }
}
