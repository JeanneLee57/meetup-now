'use server';

import { EventService } from '@/services/eventService';
import { EventData } from '@/types/interface';
import { PutObjectCommand } from '@aws-sdk/client-s3';
import { s3Client } from '@/utils/s3';

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
    const file = formData.get('image') as File;
    let image_url = '';
    if (file.size > 0) {
      const timestamp = Date.now();
      const fileName = `events/${timestamp}-${file.name}`;

      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const command = new PutObjectCommand({
        Bucket: process.env.AWS_S3_BUCKET_NAME!,
        Key: fileName,
        Body: buffer,
        ContentType: file.type,
      });

      await s3Client.send(command);

      image_url = `${process.env.CLOUDFRONT_DOMAIN}/${fileName}`;
    }

    await EventService.createEvent({ ...eventData, image_url });
  } catch (error) {
    console.error('이벤트 생성 중 오류 발생:', error);
    throw error;
  }
}
