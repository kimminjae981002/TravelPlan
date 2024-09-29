import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Travel } from './travel.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TravelService {
  constructor(
    @InjectRepository(Travel)
    private readonly travelRepository: Repository<Travel>,
  ) {}
}
