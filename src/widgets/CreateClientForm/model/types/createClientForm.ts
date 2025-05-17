export interface CreateClientFormSchema {
  data: CreateClientFormData;
  step: number;
}

export interface CreateClientFormData {
  serviceName: string;
  uploadedImage: string;
  scope: string[];
  email: string;
  redirectUri: string;
}
