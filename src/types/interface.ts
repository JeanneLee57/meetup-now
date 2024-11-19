export interface EventData {
  title: string;
  datetime: string;
  location: string;
  organizer: string;
  description: string;
  is_public: boolean;
  image_url?: string;
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
