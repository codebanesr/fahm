import { Body, Controller, Put } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UsersService } from 'src/users/users.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { User } from './schema/user.schema';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @ApiResponse({
    status: 200,
    description: 'The user was upserted successfully',
    type: User,
  })
  @ApiOperation({
    summary: 'Upsert a user',
  })
  @Put()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.upsert(createUserDto);
  }
}
