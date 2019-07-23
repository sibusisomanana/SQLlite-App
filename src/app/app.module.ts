import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { HttpModule } from '@angular/http';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { DatabaseProvider } from '../providers/database/database';
UpdatePage
import { AddStudentsPage } from '../pages/add-students/add-students';
import { SQLite } from '@ionic-native/sqlite';
import { EditPage } from '../pages/edit/edit';
import { LoginPage } from '../pages/login/login';
import { UpdatePage } from '../pages/update/update';
//import { EditPage } from '../pages/edit/edit';
@NgModule({
  declarations: [
    MyApp,
    HomePage,
    EditPage,
    LoginPage,
    UpdatePage
    
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),

    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    EditPage,
    LoginPage,
    UpdatePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    DatabaseProvider,
    SQLite
  ]
})
export class AppModule {}
