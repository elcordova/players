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
        return changes.map(c => ({$key: c.payload.key, ...c.payload.val()} as Player))
      })
    );
  }

  addPlayer(player: Player) {
    return this.playersDb.push(player);
  }

  deletePlayer(id: string) {
    this.db.list('/players').remove(id);
  }

  editPlayer(newPlayer: Player) {
    const $key = newPlayer.$key as string;
    delete(newPlayer.$key);
    this.db.list<Player>('/players').update($key, newPlayer);
  }

}
