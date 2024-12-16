'use server';

import { EventService } from '@/services/eventService';
import { EventData } from '@/types/interface';
import { PutObjectCommand } from '@aws-sdk/client-s3';
import { s3Client } from '@/utils/s3';

const getEventlatLng = async (address: string) => {
  const latLng = { latitude: 0, longitude: 0 };
  const geocoder = new window.kakao.maps.services.Geocoder();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  geocoder.addressSearch(address, (result: any, status: any) => {
    if (status === window.kakao.maps.services.Status.OK) {
      latLng.latitude = result[0].y;
      latLng.longitude = result[0].x;
    }
  });
  return latLng;
};

export async function createEvent(formData: FormData) {
  const latLng = await getEventlatLng(formData.get('address') as string);
  const eventData: EventData = {
    title: formData.get('title') as string,
    datetime: formData.get('datetime') as string,
    location: formData.get('location') as string,
    address: formData.get('address') as string,
    organizer: formData.get('organizer') as string,
    description: formData.get('description') as string,
    is_public: formData.get('visibility') === 'public',
    latitude: latLng.latitude,
    longitude: latLng.longitude,
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

export async function getEvent() {
  try {
    const { data } = await EventService.getEvent();
    return data;
  } catch (error) {
    console.error('이벤트 생성 중 오류 발생:', error);
    throw error;
  }
}
