export interface UserInformationDto {
  userId: number;
  name: NameElementDto;
  dob: Date;
  email: string;
  contactNumberCountryCode: string;
  contactNumber: string;
}

export interface NameElementDto {
  title: string;
  firstName: string;
  middleName: string | null;
  lastName: string;
}
