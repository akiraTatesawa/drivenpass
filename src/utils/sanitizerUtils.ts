import { stripHtml } from "string-strip-html";

export interface SanitizerDataInterface {
  sanitize: (data: string) => string;
}

export class SanitizerData implements SanitizerDataInterface {
  sanitize(data: string) {
    return stripHtml(data).result.trim();
  }
}
