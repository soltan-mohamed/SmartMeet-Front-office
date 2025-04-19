export interface Profile {
  id?: number;
  username: string;
  position: string;
  interests: string;
  description: string;
  profilePictureUrl?: string;
  coverPictureUrl?: string;
  // Removed userId field
}