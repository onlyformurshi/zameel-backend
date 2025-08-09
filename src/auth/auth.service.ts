import { Injectable, UnauthorizedException, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { Admin, AdminDocument } from './schemas/admin.schema';
import { CreateAdminDto } from './dto/create-admin.dto';
import { LoginDto } from './dto/login.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Admin.name) private adminModel: Model<AdminDocument>,
    private jwtService: JwtService,
  ) {}

  async validateAdmin(email: string, password: string): Promise<any> {
    const admin = await this.adminModel.findOne({ email });
    if (!admin) {
      return null;
    }

    const isPasswordValid = await bcrypt.compare(password, admin.password);
    if (!isPasswordValid) {
      return null;
    }

    const { password: _, ...result } = admin.toObject();
    return result;
  }

  async login(loginDto: LoginDto) {
    const admin = await this.validateAdmin(loginDto.email, loginDto.password);
    if (!admin) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = {
      sub: admin._id.toString(),
      email: admin.email,
      role: 'admin',
    };

    const token = this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET || 'zameel-secret-key',
      expiresIn: '24h',
    });

    return {
      access_token: token,
      admin: {
        id: admin._id,
        email: admin.email,
        role: 'admin',
      },
    };
  }

  async register(createAdminDto: CreateAdminDto) {
    const { password, ...rest } = createAdminDto;
    const hashedPassword = await bcrypt.hash(password, 10);

    const newAdmin = new this.adminModel({
      ...rest,
      password: hashedPassword,
    });

    const savedAdmin = await newAdmin.save();
    const { password: _, ...result } = savedAdmin.toObject();
    return result;
  }

  async logout(userId: string) {
    // Since we're using JWT, we don't need to do anything server-side
    // The client will remove the token
    return { message: 'Logged out successfully' };
  }

  async getCurrentUser(userId: string) {
    const admin = await this.adminModel.findById(userId).select('-password');
    if (!admin) {
      throw new NotFoundException('User not found');
    }
    return admin;
  }

  async updateProfile(userId: string, updateProfileDto: UpdateProfileDto) {
    const admin = await this.adminModel
      .findByIdAndUpdate(userId, { $set: updateProfileDto }, { new: true })
      .select('-password');

    if (!admin) {
      throw new NotFoundException('User not found');
    }

    return admin;
  }

  async changePassword(userId: string, changePasswordDto: ChangePasswordDto) {
    const admin = await this.adminModel.findById(userId);
    if (!admin) {
      throw new NotFoundException('User not found');
    }

    const isCurrentPasswordValid = await bcrypt.compare(
      changePasswordDto.currentPassword,
      admin.password,
    );

    if (!isCurrentPasswordValid) {
      throw new UnauthorizedException('Current password is incorrect');
    }

    const hashedNewPassword = await bcrypt.hash(changePasswordDto.newPassword, 10);
    admin.password = hashedNewPassword;
    await admin.save();

    return { message: 'Password changed successfully' };
  }

  async findById(id: string): Promise<Admin | null> {
    try {
      const admin = await this.adminModel.findById(id).select('-password').exec();
      if (!admin) {
        return null;
      }
      return admin;
    } catch (error) {
      return null;
    }
  }
}
