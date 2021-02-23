import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IComment, Comment } from 'app/shared/model/jawnzapp/comment.model';
import { CommentService } from './comment.service';
import { IProduct } from 'app/shared/model/jawnzapp/product.model';
import { ProductService } from 'app/entities/jawnzapp/product/product.service';

type SelectableEntity = IProduct | IComment;

@Component({
  selector: 'jwn-comment-update',
  templateUrl: './comment-update.component.html',
})
export class CommentUpdateComponent implements OnInit {
  isSaving = false;
  products: IProduct[] = [];
  parents: IComment[] = [];

  editForm = this.fb.group({
    id: [],
    text: [
      null,
      [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(250),
        Validators.pattern('(^[a-zA-Z0-9 #!£$%?,.%&amp;+&#34;&#39;@]*$)'),
      ],
    ],
    created: [],
    product: [],
    parent: [],
  });

  constructor(
    protected commentService: CommentService,
    protected productService: ProductService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ comment }) => {
      if (!comment.id) {
        const today = moment().startOf('day');
        comment.created = today;
      }

      this.updateForm(comment);

      this.productService.query().subscribe((res: HttpResponse<IProduct[]>) => (this.products = res.body || []));

      this.commentService
        .query({ filter: 'child-is-null' })
        .pipe(
          map((res: HttpResponse<IComment[]>) => {
            return res.body || [];
          })
        )
        .subscribe((resBody: IComment[]) => {
          if (!comment.parent || !comment.parent.id) {
            this.parents = resBody;
          } else {
            this.commentService
              .find(comment.parent.id)
              .pipe(
                map((subRes: HttpResponse<IComment>) => {
                  return subRes.body ? [subRes.body].concat(resBody) : resBody;
                })
              )
              .subscribe((concatRes: IComment[]) => (this.parents = concatRes));
          }
        });
    });
  }

  updateForm(comment: IComment): void {
    this.editForm.patchValue({
      id: comment.id,
      text: comment.text,
      created: comment.created ? comment.created.format(DATE_TIME_FORMAT) : null,
      product: comment.product,
      parent: comment.parent,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const comment = this.createFromForm();
    if (comment.id !== undefined) {
      this.subscribeToSaveResponse(this.commentService.update(comment));
    } else {
      this.subscribeToSaveResponse(this.commentService.create(comment));
    }
  }

  private createFromForm(): IComment {
    return {
      ...new Comment(),
      id: this.editForm.get(['id'])!.value,
      text: this.editForm.get(['text'])!.value,
      created: this.editForm.get(['created'])!.value ? moment(this.editForm.get(['created'])!.value, DATE_TIME_FORMAT) : undefined,
      product: this.editForm.get(['product'])!.value,
      parent: this.editForm.get(['parent'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IComment>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }

  trackById(index: number, item: SelectableEntity): any {
    return item.id;
  }
}
