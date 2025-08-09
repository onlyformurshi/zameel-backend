import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { AdminDocument } from '../schemas/admin.schema';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || 'zameel-secret-key',
    });
  }

  async validate(payload: any) {
    try {
      const admin = (await this.authService.findById(payload.sub)) as AdminDocument;
      if (!admin) {
        throw new UnauthorizedException('User not found');
      }

      const adminData = admin.toObject();
      return {
        userId: payload.sub,
        email: payload.email,
        role: payload.role,
        ...adminData,
      };
    } catch (error) {
      throw new UnauthorizedException('Authentication token is invalid or expired');
    }
  }
}
