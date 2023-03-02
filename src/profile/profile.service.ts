import { UserEntity } from '@app/user/user.entity';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FollowEntity } from './follow.entity';
import { ProfileType } from './types/profile.type';
import { ProfileResponse } from './types/profileResponse.interface';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(FollowEntity)
    private readonly followRepository: Repository<FollowEntity>,
  ) {}
  async getProfile(
    userId: number,
    profileUsername: string,
  ): Promise<ProfileType> {
    const user = await this.userRepository.findOne({
      where: { username: profileUsername },
    });

    if (!user) {
      throw new HttpException('Profile does not exist', HttpStatus.NOT_FOUND);
    }

    const follow = await this.followRepository.findOne({
      where: {
        followerId: userId,
        followingId: user.id,
      },
    });

    return { ...user, following: Boolean(follow) };
  }

  async followProfile(
    userId: number,
    profileUsername: string,
  ): Promise<ProfileType> {
    const user = await this.userRepository.findOne({
      where: { username: profileUsername },
    });

    if (!user) {
      throw new HttpException('Profile does not exist', HttpStatus.NOT_FOUND);
    }

    if (userId === user.id) {
      throw new HttpException(
        "Follower and following can't be equal",
        HttpStatus.BAD_REQUEST,
      );
    }

    const follow = await this.followRepository.findOne({
      where: {
        followerId: userId,
        followingId: user.id,
      },
    });

    if (!follow) {
      const newFollow = new FollowEntity();
      newFollow.followerId = userId;
      newFollow.followingId = user.id;
      await this.followRepository.save(newFollow);
    }

    return { ...user, following: true };
  }

  async unfollowProfile(
    userId: number,
    profileUsername: string,
  ): Promise<ProfileType> {
    const user = await this.userRepository.findOne({
      where: { username: profileUsername },
    });

    if (!user) {
      throw new HttpException('Profile does not exist', HttpStatus.NOT_FOUND);
    }

    if (userId === user.id) {
      throw new HttpException(
        "Follower and following can't be equal",
        HttpStatus.BAD_REQUEST,
      );
    }

    await this.followRepository.delete({
      followerId: userId,
      followingId: user.id,
    });

    return { ...user, following: false };
  }

  buildProfileResponse(profile: ProfileType): ProfileResponse {
    delete profile.email;
    return { profile };
  }
}
