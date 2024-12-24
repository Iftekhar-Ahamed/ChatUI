import { ErrorResponseDto } from "../error/error-rsp.model";

export interface ApiResponseDto<T> {
  data: T | null;
  message: string;
  success: boolean;
  showMessage: boolean;
  values: { [key: string]: string; } | null;
  error: ErrorResponseDto | null;
}
