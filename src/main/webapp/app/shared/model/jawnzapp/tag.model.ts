import { IComment } from 'app/shared/model/jawnzapp/comment.model';

export interface ITag {
  id?: string;
  text?: string;
  comment?: IComment;
}

export class Tag implements ITag {
  constructor(public id?: string, public text?: string, public comment?: IComment) {}
}
