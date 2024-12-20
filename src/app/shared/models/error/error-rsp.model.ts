
export interface ErrorResponseDto {
  title : string;
  errorDetails: ErrorDescriptionDto[] | null;
}

export interface ErrorDescriptionDto {
  key: string;
  value: string;
}
