import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { TranslateComponent } from './translate/translate.component';

const routes: Routes = [
  { path: 'app', component: AppComponent },
  { path: 'translate', component: TranslateComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
