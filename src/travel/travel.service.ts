import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Travel } from './travel.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTravelDto } from './dto/create-travel.dto';
import { ConfigService } from '@nestjs/config';
import fetch from 'node-fetch';

@Injectable()
export class TravelService {
  constructor(
    @InjectRepository(Travel)
    private readonly travelRepository: Repository<Travel>,
    private readonly configService: ConfigService,
  ) {}

  async create(createTravelDto: CreateTravelDto, userId: number) {
    let { keyword } = createTravelDto;

    const createdAt = new Date().toLocaleString('en-US', {
      timeZone: 'Asia/Seoul',
    });

    const places = await this.fetchKakaoApi(keyword);

    const newTravel = this.travelRepository.create({
      keyword,
      createdAt,
      user: { id: userId }, // user 객체로 설정
    });

    await this.travelRepository.save(newTravel);

    return places;
  }

  async fetchKakaoApi(keyword: string) {
    const response = await fetch(
      `https://dapi.kakao.com/v2/local/search/keyword.json?query=${encodeURIComponent(keyword)}`,
      {
        method: 'GET',
        headers: {
          Authorization: `KakaoAK ${this.configService.get('KAKAO_RESTAPI_KEY')}`, // 'this'를 붙임 // 환경 변수에서 API 키 가져오기
        },
      },
    );

    const data = await response.json();
    if (!data.documents || data.documents.length === 0) {
      throw new Error('해당 지역에 대한 정보를 찾을 수 없습니다.');
    }

    const arr = [];

    for (let documents of data.documents) {
      if (documents.place_name !== undefined) {
        arr.push(documents.place_name);
      }
    }

    return arr;
  }
}
