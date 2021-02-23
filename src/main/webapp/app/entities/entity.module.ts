import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'tag',
        loadChildren: () => import('./jawnzapp/tag/tag.module').then(m => m.JawnzappTagModule),
      },
      {
        path: 'comment',
        loadChildren: () => import('./jawnzapp/comment/comment.module').then(m => m.JawnzappCommentModule),
      },
      {
        path: 'product',
        loadChildren: () => import('./jawnzapp/product/product.module').then(m => m.JawnzappProductModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class JawnzgatewayEntityModule {}
