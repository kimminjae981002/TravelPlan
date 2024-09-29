import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Travel } from './travel.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTravelDto } from './dto/create-travel.dto';

@Injectable()
export class TravelService {
  constructor(
    @InjectRepository(Travel)
    private readonly travelRepository: Repository<Travel>,
  ) {}

  async create(createTravelDto: CreateTravelDto, userId?: number) {
    let { location, day } = createTravelDto;

    day = +day;

    const createdAt = new Date().toLocaleString('en-US', {
      timeZone: 'Asia/Seoul',
    });

    const newTravel = this.travelRepository.create({
      location,
      day,
      createdAt,
      user: { id: userId },
    });

    await this.travelRepository.save(newTravel);
  }
}
