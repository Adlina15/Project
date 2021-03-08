import { Component, OnInit } from '@angular/core';
import { AngularFirestore} from '@angular/fire/firestore';
import { LoadingController, NavController, ToastController } from '@ionic/angular';
import {Exam} from 'src/models/exam.mode';

@Component({
  selector: 'app-exam',
  templateUrl: './exam.page.html',
  styleUrls: ['./exam.page.scss'],
})
export class ExamPage implements OnInit {
exam = {} as Exam;

  constructor(
    private toastCtrl: ToastController,
 private loadingCtrl: LoadingController,
 private navCtrl: NavController,
 private firestore: AngularFirestore
  ) { }

  ngOnInit() {}
  async createExam(post: Exam){
    if(this.formValidation()) {
    //show loader
    let loader = this.loadingCtrl.create({
    message: "Please wait..."
    });
    (await loader).present();
    try{
      await this.firestore.collection("exam").add(post);
 } catch(e){
 this.showToast(e);
 }
 //dismiss loader
 (await loader).dismiss();
 //redirect to home page
 this.navCtrl.navigateRoot("view-exam");
 }
 }

 formValidation(){
 if(!this.exam.subject){
 this.showToast("Choose the day");
 return false;
 }
 if(!this.exam.mark){
 this.showToast("Enter the subject");
 return false;
 }
 if(!this.exam.description){
 this.showToast("Insert the start time");
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
 }}





