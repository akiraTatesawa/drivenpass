import { stripHtml } from "string-strip-html";

export interface SanitizerDataInterface {
  sanitize: (data: string) => string;
}

export class SanitizerUtils implements SanitizerDataInterface {
  sanitize(data: string) {
    return stripHtml(data).result.trim();
  }
}
