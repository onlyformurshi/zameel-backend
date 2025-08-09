import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { DashboardService } from './dashboard.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../users/enums/role.enum';

export class DashboardStatsResponse {
  overview: {
    facultyCount: number;
    activeCourses: number;
    upcomingEvents: number;
    galleryCount: number;
  };
}

@ApiTags('Dashboard')
@Controller('dashboard')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.ADMIN)
@ApiBearerAuth('JWT-auth')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get()
  @ApiOperation({ summary: 'Get dashboard statistics' })
  @ApiResponse({
    status: 200,
    description: 'Returns dashboard statistics',
    type: DashboardStatsResponse,
  })
  async getAllStats(): Promise<DashboardStatsResponse> {
    const stats = await this.dashboardService.getAllStats();
    return {
      overview: {
        facultyCount: stats.facultyCount,
        activeCourses: stats.activeCourses,
        upcomingEvents: stats.upcomingEvents,
        galleryCount: stats.galleryCount,
      },
    };
  }

  @Get('activity')
  @ApiOperation({ summary: 'Get recent activity' })
  async getRecentActivity(@Query('limit') limit?: number) {
    return this.dashboardService.getRecentActivity(limit);
  }
}
