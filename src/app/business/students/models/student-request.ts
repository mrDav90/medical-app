import { Address, Gender, Document } from './student-response';

export interface StudentRequest {
  firstName: string;
  lastName: string;
  gender: Gender;
  birthDate: string;
  placeOfBirth: string;
  nationality: string;
  emailPerso: string;
  phoneNumber: string;
  profilePicture: string;
  personToNotifyName?: string;
  personToNotifyPhoneNumber?: string;
  address: Address;
  document: Document;
}
