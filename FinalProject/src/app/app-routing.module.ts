import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'class',
    loadChildren: () => import('./class/class.module').then( m => m.ClassPageModule)
  },
  {
    path: 'exam',
    loadChildren: () => import('./exam/exam.module').then( m => m.ExamPageModule)
  },
  {
    path: 'todolist',
    loadChildren: () => import('./todolist/todolist.module').then( m => m.TodolistPageModule)
  },
  {
    path: 'view-class',
    loadChildren: () => import('./view-class/view-class.module').then( m => m.ViewClassPageModule)
  },
  {
    path: 'edit-class/:id',
    loadChildren: () => import('./edit-class/edit-class.module').then( m => m.EditClassPageModule)
  },
  {
    path: 'view-exam',
    loadChildren: () => import('./view-exam/view-exam.module').then( m => m.ViewExamPageModule)
  },
  {
    path: 'edit-exam/:id',
    loadChildren: () => import('./edit-exam/edit-exam.module').then( m => m.EditExamPageModule)
  },
  {
    path: 'view-todolist',
    loadChildren: () => import('./view-todolist/view-todolist.module').then( m => m.ViewTodolistPageModule)
  },
  {
    path: 'edit-todolist/:id',
    loadChildren: () => import('./edit-todolist/edit-todolist.module').then( m => m.EditTodolistPageModule)
  },
  {
    path: 'faq',
    loadChildren: () => import('./faq/faq.module').then( m => m.FAQPageModule)
  },
  {
    path: 'view-all',
    loadChildren: () => import('./view-all/view-all.module').then( m => m.ViewAllPageModule)
  },
  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
