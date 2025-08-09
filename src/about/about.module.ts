import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AboutService } from './about.service';
import { AboutController } from './about.controller';
import { TeamMember, TeamMemberSchema } from './schemas/team-member.schema';
import { About, AboutSchema } from './schemas/about.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: TeamMember.name, schema: TeamMemberSchema },
      { name: About.name, schema: AboutSchema },
    ]),
  ],
  controllers: [AboutController],
  providers: [AboutService],
  exports: [AboutService],
})
export class AboutModule {}
