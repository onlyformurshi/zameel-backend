import { IsString, IsOptional, IsEnum, IsArray } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateContactSubmissionDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsEnum(['pending', 'read', 'replied', 'archived'])
  status?: 'pending' | 'read' | 'replied' | 'archived';

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  responseMessage?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];

  @ApiProperty({ required: false })
  @IsOptional()
  @IsEnum(['low', 'medium', 'high', 'urgent'])
  priority?: 'low' | 'medium' | 'high' | 'urgent';

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  assignedTo?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  internalNote?: string;
}
