import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Player } from '../interfaces/player';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  private playersDb: AngularFireList<Player>;
  constructor(private db: AngularFireDatabase) {
    this.playersDb = this.db.list('/players', ref => ref.orderByChild('name'));
  }

  getPlayers(): Observable<Player[]> {
    return this.playersDb.snapshotChanges()
    .pipe(
      map(changes => {
        return changes.map(c => ({key: c.payload.key, ...c.payload.val()} as Player))
      })
    );
  }

  addPlayer(player: Player): string {
    return <any>this.playersDb.push(player).key;
  }

  deletePlayer(id: string) {
    this.db.list('/players').remove(id);
  }

  editPlayer(newPlayer: Player) {
    const contextPlayer = {... newPlayer};
    const $key = contextPlayer.key as string;
    delete(contextPlayer.key);
    this.db.list<Player>('/players').update($key, contextPlayer);
  }

}
