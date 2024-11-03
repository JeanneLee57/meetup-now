'use server';

import { EventService } from '@/services/eventService';
import { EventData } from '@/types/interface';

export async function createEvent(formData: FormData) {
  const eventData: EventData = {
    title: formData.get('title') as string,
    datetime: formData.get('datetime') as string,
    location: formData.get('location') as string,
    organizer: formData.get('organizer') as string,
    description: formData.get('description') as string,
    is_public: formData.get('visibility') === 'public',
  };

  try {
    await EventService.createEvent(eventData);
  } catch (error) {
    console.error('이벤트 생성 중 오류 발생:', error);
    throw error;
  }
}
