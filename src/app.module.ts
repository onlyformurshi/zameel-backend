import { Module, NestModule, MiddlewareConsumer, Logger } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { APP_GUARD } from '@nestjs/core';
import { AuthModule } from './auth';
import { CommonModule } from './common';
import { CourseModule } from './courses/course.module';
import { EventModule } from './events/event.module';
import { ContactModule } from './contact/contact.module';
import { GalleryModule } from './gallery/gallery.module';
import { ServiceModule } from './services/service.module';
import { FAQModule } from './faq/faq.module';
import { AboutModule } from './about/about.module';
import { FooterModule } from './footer/footer.module';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { HomepageModule } from './homepage/homepage.module';
import { FacultyModule } from './faculty/faculty.module';
import { Request, Response, NextFunction } from 'express';
import { DashboardModule } from './dashboard/dashboard.module';
import { PublicHomeModule } from './public/public-home.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGODB_URI || 'mongodb://localhost:27017/zameel'),
    AuthModule,
    CommonModule,
    CourseModule,
    EventModule,
    ContactModule,
    GalleryModule,
    ServiceModule,
    FAQModule,
    AboutModule,
    FooterModule,
    HomepageModule,
    FacultyModule,
    DashboardModule,
    PublicHomeModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule implements NestModule {
  private readonly logger = new Logger('HTTP');

  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply((req: Request, res: Response, next: NextFunction) => {
        this.logger.log(`${req.method} ${req.originalUrl} - ${req.ip}`);
        next();
      })
      .forRoutes('*');
  }
}
