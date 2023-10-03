import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './models/user.model';
import { CreateUserInput } from './inputs/user.input';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => [User])
  async getAllUsers() {
    return this.usersService.getAllUsers();
  }

  @Mutation(() => User)
  async createUser(@Args('input') userData: CreateUserInput) {
    return this.usersService.createUser(userData);
  }
}
