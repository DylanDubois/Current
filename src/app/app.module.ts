import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { MapComponent } from './components/map/map.component';

import { AgmCoreModule } from '@agm/core';
import { EventsListComponent } from './components/events-list/events-list.component';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';

export const firebaseConfig = {
  production: true,
  firebase: {
    apiKey: "AIzaSyCHwqP6_TpyIF4Hrntv1cvpuniNknimaDs",
    authDomain: "current-54dd9.firebaseapp.com",
    databaseURL: "https://current-54dd9.firebaseio.com",
    projectId: "current-54dd9",
    storageBucket: "",
    messagingSenderId: "240416079301"
  }
};


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MapComponent,
    EventsListComponent,
    NavBarComponent
  ],
  imports: [
    BrowserModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCVXbwL7sxBy_7cVNLPIlikinnIUldcvzk'
    }),
    AngularFireModule.initializeApp(firebaseConfig.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
