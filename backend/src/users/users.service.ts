import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from 'src/user/dtos/create-user.dto';
import { User } from 'src/user/schema/user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async checkEmailExists(email: string): Promise<boolean> {
    const user = await this.userModel.findOne({ email }).exec();
    return !!user;
  }

  async upsert(createUserDto: CreateUserDto): Promise<User> {
    const user = await this.userModel.findOneAndUpdate(
      { email: createUserDto.email },
      createUserDto,
      { new: true, upsert: true },
    );

    return user;
  }
}
