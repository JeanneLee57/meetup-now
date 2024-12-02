export interface EventData {
  id?: string;
  title: string;
  datetime: string;
  location: string;
  address: string;
  organizer: string;
  description: string;
  is_public: boolean;
  image_url?: string;
  latitude: number;
  longitude: number;
}
export interface SignUpData {
  email: string;
  password: string;
  name?: string;
}

export interface SignInData {
  email: string;
  password: string;
}
