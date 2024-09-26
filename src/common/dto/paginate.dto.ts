import { IsIn, IsNumber, IsOptional } from 'class-validator';

export class PaginateBoardDto {
  @IsNumber()
  @IsOptional()
  page?: number = 1;

  @IsIn(['ASC', 'DESC'])
  @IsOptional()
  order__createdAt: 'ASC' | 'DESC' = 'DESC';

  @IsNumber()
  @IsOptional()
  take?: number = 10;
}
