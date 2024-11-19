import { createClient } from '@/utils/supabase/server';
import { EventData } from '@/types/interface';

export class EventService {
  static async createEvent(eventData: EventData) {
    const supabase = await createClient();
    const { error } = await supabase.from('events').insert([eventData]);
    if (error) throw error;
    return { success: true };
  }

  static async getEvent() {
    const supabase = await createClient();
    const { error, data } = await supabase.from('events').select('*');
    if (error) throw error;
    return { data };
  }
}
