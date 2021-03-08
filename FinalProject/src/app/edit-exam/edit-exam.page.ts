import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { LoadingController, NavController, ToastController } from '@ionic/angular';
import {Exam} from 'src/models/exam.mode';

@Component({
  selector: 'app-edit-exam',
  templateUrl: './edit-exam.page.html',
  styleUrls: ['./edit-exam.page.scss'],
})
export class EditExamPage implements OnInit {

  exam = {} as Exam;
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
    this.getExamsById(this.id);
  }
  async getExamsById(id: string){
    //show loader
    let loader = this.loadingCtrl.create({
    message: "Please wait..."
    });
    (await loader).present();
    this.firestore.doc("exam/" + id)
    .valueChanges()
    .subscribe(data => {
    this.exam.subject = data["subject"];
    this.exam.mark = data["mark"];
    this.exam.description= data["description"];
 });
 //dismiss loader
 (await loader).dismiss();
 }
 async updateExam(post: Exam){
 if(this.formValidation()) {
 //show loader
 let loader = this.loadingCtrl.create({
 message: "Please wait..."
 });
 (await loader).present();

 try{

 await this.firestore.doc("exam/" + this.id).update(post);
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
 if(!this.exam.subject){
 this.showToast("Enter subject");
 return false;
 }
 if(!this.exam.mark){
 this.showToast("Enter mark");
 return false;
 }
 if(!this.exam.description){
 this.showToast("Enter the description");
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
 









