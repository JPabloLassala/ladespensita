import { IMAGE_FORMAT, IMAGE_TYPE } from "@/Common";

export class ImageEntity {
  id: number;
  url: string;
  type: IMAGE_TYPE;
  format: IMAGE_FORMAT;
  productoId: number;
  isMain: boolean;
  createdAt: Date;
}
