export interface ClientFormSchema {
  data: ClientFormData;
  step: number;
}

export interface ClientFormData {
  serviceName: string;
  uploadedImage: string;
  scope: string[];
  email: string;
  redirectUri: string;
}
