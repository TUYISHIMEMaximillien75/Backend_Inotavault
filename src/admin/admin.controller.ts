import { Body, Controller, Delete, Get, Param, Patch, Put, UseGuards } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminGuard } from './guards/admin.guard';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Public } from '../auth/decorators/public.decorator';
import { ApiSecurity } from '@nestjs/swagger';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  // ── Public endpoint: Home.tsx reads this without auth ──────────────────────
  @Public()
  @Get('home-content')
  getHomeContent() {
    return this.adminService.getHomeContent();
  }

  // ── Everything below requires a valid JWT + ADMIN role ─────────────────────
  @ApiSecurity('JWT-auth')
  @UseGuards(JwtAuthGuard, AdminGuard)
  @Put('home-content')
  updateHomeContent(@Body() body: { artists?: any[]; stats?: any[]; slideshowImages?: string[] }) {
    return this.adminService.updateHomeContent(body);
  }

  @ApiSecurity('JWT-auth')
  @UseGuards(JwtAuthGuard, AdminGuard)
  @Get('users')
  getAllUsers() {
    return this.adminService.getAllUsers();
  }

  @ApiSecurity('JWT-auth')
  @UseGuards(JwtAuthGuard, AdminGuard)
  @Get('stats')
  getPlatformStats() {
    return this.adminService.getPlatformStats();
  }

  @ApiSecurity('JWT-auth')
  @UseGuards(JwtAuthGuard, AdminGuard)
  @Get('users/:id/songs')
  getUserSongs(@Param('id') id: string) {
    return this.adminService.getUserSongs(id);
  }

  @ApiSecurity('JWT-auth')
  @UseGuards(JwtAuthGuard, AdminGuard)
  @Delete('songs/:id')
  deleteSong(@Param('id') id: string) {
    return this.adminService.deleteSong(id);
  }

  @ApiSecurity('JWT-auth')
  @UseGuards(JwtAuthGuard, AdminGuard)
  @Patch('users/:id/role')
  updateUserRole(@Param('id') id: string, @Body('role') role: string) {
    return this.adminService.updateUserRole(id, role);
  }
}
