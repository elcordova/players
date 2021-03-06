import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { environment } from 'src/environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { PlayerService } from './services/player.service';
import { TeamTableComponent } from './team-table/team-table.component';
import { PlayerTableComponent } from './player-table/player-table.component';
import { PlayerDialogComponent } from './player-dialog/player-dialog.component';
import { FormsModule } from '@angular/forms';
import { TeamDialogComponent } from './team-dialog/team-dialog.component';
@NgModule({
  declarations: [
    AppComponent,
    TeamTableComponent,
    PlayerTableComponent,
    PlayerDialogComponent,
    TeamDialogComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,

  ],
  providers: [PlayerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
