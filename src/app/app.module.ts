import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/Storage';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { FileChooser } from '@ionic-native/file-chooser/ngx'
import { FilePath } from '@ionic-native/file-path/ngx'
import { File } from '@ionic-native/file/ngx'

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { ReceitasProvider } from '../providers/receitas/receita';
import { LoginProvider } from '../providers/login/login';
import { DatePipe } from '@angular/common';
import { FormPage } from '../pages/form/form';
import { EditPage } from '../pages/edit/edit';
import { ViewPage } from '../pages/view/view';
import { Camera } from '@ionic-native/camera/ngx';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    FormPage,
    EditPage,
    ViewPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    HttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    FormPage,
    EditPage,
    ViewPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    DatePipe,
    ReceitasProvider,
    LoginProvider,
    Camera,
    FileChooser,
    FilePath,
    File
  ]
})
export class AppModule {}
