import { Controller, Get, Param } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { AuthService } from './auth/auth.service';

@Controller()
export class AppController {
  constructor(private dataSource: DataSource, private authService: AuthService) { }

  
  @Get()
  getHello(): string {
    return "Hello World!";
  }
  @Get("health")
  async health() {
    try {
      await this.dataSource.query("SELECT 1");
      console.log("Database connected");
      return { status: "ok", database: "connected" };
    } catch (err) {
      console.log("Database disconnected");
      return { status: "error", database: "disconnected", error: err.message };
    }
  }




}
