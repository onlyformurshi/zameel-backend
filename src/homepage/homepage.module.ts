import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { HomepageService } from './homepage.service';
import { HomepageController } from './homepage.controller';
import { HeroSection, HeroSectionSchema } from './schemas/hero-section.schema';
import { WhyChooseUs, WhyChooseUsSchema } from './schemas/why-choose-us.schema';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: HeroSection.name, schema: HeroSectionSchema },
      { name: WhyChooseUs.name, schema: WhyChooseUsSchema },
    ]),
    AuthModule,
  ],
  controllers: [HomepageController],
  providers: [HomepageService],
  exports: [HomepageService],
})
export class HomepageModule {}
