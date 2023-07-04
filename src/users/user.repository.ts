import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schema/user-schema';
import { FilterQuery, Model, Types } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserRepository {
  constructor(
    @InjectModel(User.name)
    private model: Model<UserDocument>,
  ) {}

  async create(UserDto: CreateUserDto): Promise<UserDocument> {
    return this.model.create(UserDto);
  }

  async findOne(query: FilterQuery<UserDocument>) {
    return this.model.findOne(query).lean();
  }

  async findById(id: string): Promise<UserDocument> {
    return this.model.findById(new Types.ObjectId(id)).lean();
  }

  async findOneDocument(
    query: FilterQuery<UserDocument>,
  ): Promise<UserDocument> {
    return this.model.findOne(query);
  }
}
