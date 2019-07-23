import { Component } from '@angular/core';
import { NavController, ModalController, ToastController, ViewController, AlertController } from 'ionic-angular';
import { DatabaseProvider } from '../../providers/database/database';
import { EditPage } from '../edit/edit';
import { UpdatePage } from '../update/update';



@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  students = [];
  isHidden:Boolean = true;
 

  pictures = [  
        {path:"../../assets/imgs/boy.png"},
        {path: "../../assets/imgs/gal1.png"},
        {path: "../../assets/imgs/gal.png"},
        {path: "../../assets/imgs/icons (1).png"},
        {path: "../../assets/imgs/icons (2).png"},
        {path: "../../assets/imgs/icons (3).png"},
        {path: "../../assets/imgs/icons (4).png"},
        {path: "../../assets/imgs/icons (5).png"},
        {path: "../../assets/imgs/icons (6).png"},
        {path: "../../assets/imgs/icons (7).png"},
        {path: "../../assets/imgs/pic6.jpg"}
  
  ];
 
  constructor(public navCtrl: NavController, private databaseProvider: DatabaseProvider, 
    private modelCtrl: ModalController, private toastCtrl: ToastController, private viewCtrl: ViewController,public alertCtrl: AlertController) {

  }

  ionViewDidEnter() {
    this.databaseProvider.getDatabaseState().subscribe(rdy => {
      if (rdy) {
        this.loadStudents();
      }
    })
  }

  loadStudents() {
    this.databaseProvider.getStudents().then((res) => {
      this.students = res;
    })
  }

  addStudents() {
    
  
    let modal = this.modelCtrl.create("AddStudentsPage")
    modal.onDidDismiss((data) => {
      if(data && data.reload) {
        const toast = this.toastCtrl.create({
          message: 'New Student Added!',
          duration: 2000
        })
        this.loadStudents();
      }
    });
    modal.present();
  }
  showFilter(){
    this.isHidden = !this.isHidden;
  }

  delete(id){
    this.databaseProvider.delete_byID(id).then(res=>{
      let alert = this.alertCtrl.create({
        title: "Success",
        subTitle: "Employee successfully deleted",
        buttons: ["OK"]
      });
      alert.present();
     this.loadStudents();
    }).catch(err=>{
      let alert = this.alertCtrl.create({
        title: "Warning",
        subTitle: "there is an error"+JSON.stringify(err),
        buttons: ["OK"]
      });
      alert.present();
    
    });
  }
  editStudent(id){

    this.navCtrl.push(EditPage, id);
    console.log('The is = ', id);
 
  }
  showAbout(){
    this.navCtrl.push(UpdatePage);
  }

}
