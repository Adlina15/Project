import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { LoadingController, NavController, ToastController } from '@ionic/angular';
import {Todolist} from 'src/models/todolist.mode';

@Component({
  selector: 'app-edit-todolist',
  templateUrl: './edit-todolist.page.html',
  styleUrls: ['./edit-todolist.page.scss'],
})
export class EditTodolistPage implements OnInit {

  todolist = {} as Todolist;
  id: any;

  constructor(
    private actRoute: ActivatedRoute,
 private loadingCtrl: LoadingController,
 private firestore: AngularFirestore,
 private toastCtrl: ToastController,
 private navCtrl: NavController
  ) {
    this.id = this.actRoute.snapshot.paramMap.get("id");
   }

  ngOnInit() {
    this.getTodolistById(this.id);
  }

  async getTodolistById(id: string){
    //show loader
    let loader = this.loadingCtrl.create({
    message: "Please wait..."
    });
    (await loader).present();
    this.firestore.doc("todolist/" + id)
    .valueChanges()
    .subscribe(data => {
    this.todolist.task = data["task"];
    this.todolist.dueDate = data["dueDate"];
 });
 //dismiss loader
 (await loader).dismiss();
 }
 async updateTodo(post: Todolist){
 if(this.formValidation()) {
 //show loader
 let loader = this.loadingCtrl.create({
 message: "Please wait..."
 });
 (await loader).present();

 try{

 await this.firestore.doc("todolist/" + this.id).update(post);
 } catch(e){
 this.showToast(e);
 }
 //dismiss loader
 (await loader).dismiss();

 //redirect to view post page
 this.navCtrl.navigateRoot("home");
 }
 }
 formValidation(){
 if(!this.todolist.task){
 this.showToast("Enter the task");
 return false;
 }
 if(!this.todolist.dueDate){
 this.showToast("Enter the duedate");
 return false;
 }
  return true;
  }
  showToast (message:string){
  this.toastCtrl.create({
  message: message,
  duration: 3000
  })
  .then(toastData => toastData.present());
  }
 }
 
