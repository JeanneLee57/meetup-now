import { createClient } from '@supabase/supabase-js';
import { EventData } from '@/types/interface';

const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabaseServer = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});

export class EventService {
  static async createEvent(eventData: EventData) {
    const { error } = await supabaseServer.from('events').insert([eventData]);
    if (error) throw error;
    return { success: true };
  }
}
