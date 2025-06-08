export interface ContactForm {
  name: string;
  email: string;
  subject?: string;
  message: string;
  type?: string;
  files?: File[];
}
