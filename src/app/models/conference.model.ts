import { Status } from '../enum/status.enum';
import { Session } from '../models/session.model';

export interface Conference {
  idConference?: number;
  nameConference: string;
  descriptionConference: string;
  locationConference: string;
  startDateConference: Date | string;
  endDateConference: Date | string;
  organizerName: string;
  theme: string;
  capacityConference: number;
  statusConference: Status;
  imageUrl?: string;
  sessionList?: Session[]; 
}