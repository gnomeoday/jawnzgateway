import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { ITag, Tag } from 'app/shared/model/jawnzapp/tag.model';
import { TagService } from './tag.service';
import { IComment } from 'app/shared/model/jawnzapp/comment.model';
import { CommentService } from 'app/entities/jawnzapp/comment/comment.service';

@Component({
  selector: 'jwn-tag-update',
  templateUrl: './tag-update.component.html',
})
export class TagUpdateComponent implements OnInit {
  isSaving = false;
  comments: IComment[] = [];

  editForm = this.fb.group({
    id: [],
    text: [
      null,
      [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(100),
        Validators.pattern('(^[a-zA-Z0-9 #!£$%?,.%&amp;+\\&#34;&#39;@]*$)'),
      ],
    ],
    comment: [],
  });

  constructor(
    protected tagService: TagService,
    protected commentService: CommentService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ tag }) => {
      this.updateForm(tag);

      this.commentService.query().subscribe((res: HttpResponse<IComment[]>) => (this.comments = res.body || []));
    });
  }

  updateForm(tag: ITag): void {
    this.editForm.patchValue({
      id: tag.id,
      text: tag.text,
      comment: tag.comment,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const tag = this.createFromForm();
    if (tag.id !== undefined) {
      this.subscribeToSaveResponse(this.tagService.update(tag));
    } else {
      this.subscribeToSaveResponse(this.tagService.create(tag));
    }
  }

  private createFromForm(): ITag {
    return {
      ...new Tag(),
      id: this.editForm.get(['id'])!.value,
      text: this.editForm.get(['text'])!.value,
      comment: this.editForm.get(['comment'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITag>>): void {
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

  trackById(index: number, item: IComment): any {
    return item.id;
  }
}
