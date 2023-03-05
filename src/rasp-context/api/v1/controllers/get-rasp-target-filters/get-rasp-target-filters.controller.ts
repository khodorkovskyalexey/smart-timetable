import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { GetRaspTargetFiltersFeature } from 'src/rasp-context/features/get-rasp-target-filters/get-rasp-target-filters.feature';
import { RaspTargetFilterResponseDto } from '../../common/dtos/rasp-target-filter.response.dto';
import { GetRaspTargetFiltersQueryDto } from './dtos/get-rasp-target-filters.query.dto';

@ApiTags('lessons')
@Controller('lessons')
export class GetRaspTargetFiltersController {
  constructor(private readonly getRaspTargetFiltersFeature: GetRaspTargetFiltersFeature) {}

  @Get('target-filters')
  async handle(@Query() query: GetRaspTargetFiltersQueryDto): Promise<RaspTargetFilterResponseDto[]> {
    const targetFilters = await this.getRaspTargetFiltersFeature.handle({
      searchFilter: query.searchFilter,
    });

    return targetFilters.map((lesson) => new RaspTargetFilterResponseDto(lesson));
  }
}
