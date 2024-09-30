import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OpenAi } from './open-ai.entity';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { CreateOpenAiDto } from './dto/create-open-ai.dto';

@Injectable()
export class OpenAiService {
  constructor(
    @InjectRepository(OpenAi)
    private readonly openAiRepository: Repository<OpenAi>,
    private readonly configService: ConfigService,
  ) {}

  async create(createOpenAiDto: CreateOpenAiDto, userId: number) {
    let { destination, duration, who, season } = createOpenAiDto;

    const createdAt = new Date().toLocaleString('en-US', {
      timeZone: 'Asia/Seoul',
    });

    const travelPlan = await this.fetchOpenApi(
      destination,
      duration,
      who,
      season,
    );

    const newTravelPlan = this.openAiRepository.create({
      destination,
      duration,
      who,
      season,
      createdAt,
      user: { id: userId },
    });

    await this.openAiRepository.save(newTravelPlan);

    return travelPlan;
  }

  async fetchOpenApi(
    destination: string,
    duration: string,
    who: string,
    season: string,
  ) {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST', // HTTP 메서드 설정
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.configService.get('OPENAI_API_KEY')}`,
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'user',
            content: `나는 ${destination}에 ${duration} 동안 여행할 계획이야. 구성원은 ${who}끼리야. 현재 계절은 ${season}이야. ${destination}의 인기 있는 관광지와 ${who}와 맞고 ${season}을 판단하고 여행 일정을 짜줘 
            그리고 간단하게 가게: 가게명, 관광지: 관광지명, 맛집: 맛집명 이런 식으로 작성하고, 이유를 알려줘`,
          },
        ],
      }),
    });

    // 응답 처리
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.choices[0].message.content; // OpenAI의 응답 내용을 반환
  }
}
