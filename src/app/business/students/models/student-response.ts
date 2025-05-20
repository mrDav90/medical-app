

export interface Address {
  street: string;
  city: string;
  state: string;
  zip: string;
  country: string;
}

export interface Document {
  cin: string;
  birthCertificate: string;
}

export enum Gender {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
}

export interface StudentResponse {
  id: string;
  firstName: string;
  lastName: string;
  gender: Gender;
  birthDate: string;
  placeOfBirth: string;
  nationality: string;
  emailPerso: string;
  emailPro: string;
  phoneNumber: string;
  registrationNu: string;
  profilePicture: string;
  archive: boolean;
  personToNotifyName?: string;
  personToNotifyPhoneNumber?: string;
  address: Address;
  document: Document;
}
