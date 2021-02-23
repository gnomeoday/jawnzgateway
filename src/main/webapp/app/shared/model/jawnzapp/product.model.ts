import { IComment } from 'app/shared/model/jawnzapp/comment.model';

export interface IProduct {
  id?: string;
  description?: string;
  name?: string;
  imageContentType?: string;
  image?: any;
  comments?: IComment[];
}

export class Product implements IProduct {
  constructor(
    public id?: string,
    public description?: string,
    public name?: string,
    public imageContentType?: string,
    public image?: any,
    public comments?: IComment[]
  ) {}
}
