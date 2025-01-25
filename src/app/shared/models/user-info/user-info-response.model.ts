export interface UserInformationDto {
  userId: number;
  name: NameElementDto;
  dob: Date | null;
  email: string;
  contactNumberCountryCode: string | null;
  contactNumber: string | null;
}

export interface NameElementDto {
  title: string;
  firstName: string;
  middleName: string | null;
  lastName: string;
}
