import { Conference } from './conference.model';

export interface Session {
  idSession?: number;
  titleSession: string;
  categorySession: string;
  startTimeSession: string;  
  endTimeSession: string;    
  detailsSession: string;
  maxParticipants: number;

  conference?: { 
    idConference: number;
    nameConference: string; 
  };
}