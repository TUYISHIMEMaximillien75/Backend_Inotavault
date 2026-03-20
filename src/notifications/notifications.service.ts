import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Notification } from './entities/notification.entity';

@Injectable()
export class NotificationsService {
  constructor(
    @InjectRepository(Notification)
    private readonly notificationRepository: Repository<Notification>,
  ) {}

  async createNotification(
    user_id: string,
    action_by: string,
    song_name: string,
    type: 'LIKE' | 'COMMENT' | 'SHARE',
    message: string,
  ) {
    // Don't notify the user about their own actions
    if (user_id === action_by) return;

    const notification = this.notificationRepository.create({
      user_id,
      action_by,
      song_name,
      type,
      message,
    });
    return this.notificationRepository.save(notification);
  }

  async getNotificationsForUser(user_id: string) {
    return this.notificationRepository.find({
      where: { user_id },
      order: { createdAt: 'DESC' },
    });
  }

  async markAsRead(id: string, user_id: string) {
    const notification = await this.notificationRepository.findOne({
      where: { id, user_id },
    });
    if (notification) {
      notification.is_read = true;
      await this.notificationRepository.save(notification);
    }
    return true;
  }
}
