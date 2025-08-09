import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateFooterDto {
  @ApiProperty({
    description: 'Company description shown in footer',
    example: 'Zameel Academy is a leading educational institution...',
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    description: 'Company description in Arabic',
    example: 'أكاديمية زميل هي مؤسسة تعليمية رائدة...',
    required: false,
  })
  @IsString()
  arabicDescription?: string;
}
