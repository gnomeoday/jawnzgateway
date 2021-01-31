import { Moment } from 'moment';
import { IProduct } from 'app/shared/model/jawnzapp/product.model';
import { ITag } from 'app/shared/model/jawnzapp/tag.model';

export interface IComment {
  id?: string;
  text?: string;
  created?: Moment;
  product?: IProduct;
  parent?: IComment;
  tags?: ITag[];
}

export class Comment implements IComment {
  constructor(
    public id?: string,
    public text?: string,
    public created?: Moment,
    public product?: IProduct,
    public parent?: IComment,
    public tags?: ITag[]
  ) {}
}
