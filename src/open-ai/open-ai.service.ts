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
            content: `나는 ${destination}에서 ${duration} 동안 여행할 예정이야. 
            구성원은 ${who}이고, 현재 계절은 ${season}이야.
            여행 일정은 일정한 패턴으로 제공되어야 해. 
            각 날의 일정은 다음과 같은 형식으로 고정되어야 해:

            ${duration}차
            오전: ${destination} 관광지 
            점심: 점심 메뉴 
            오후: ${destination} 관광지 
            저녁: 저녁 메뉴
            
            답변을 할 때마다 이 구성을 엄격하게 따르고, 관광지와 메뉴만 바꿔줘.
            구성을 변하지 않게 답변해줘. 사용자의 입력을 모두 고려해야해
            꼭 해당 지역과, 여행 기간을 모두 생각해 그리고 간단한 이유를 적어줘!!`,
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
