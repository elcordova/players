import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { Player } from '../interfaces/player';
import { PlayerService } from '../services/player.service';
import { TeamService } from '../services/team.service';

@Component({
  selector: 'app-player-table',
  templateUrl: './player-table.component.html',
  styleUrls: ['./player-table.component.scss']
})
export class PlayerTableComponent implements OnInit {
  players$!: Observable<Player[]>;
  public selectedPlayer!: Player;
  public showModal!: boolean;
  constructor(private playerService: PlayerService, private teamService: TeamService) { }

  ngOnInit(): void {
    this.players$ = this.playerService.getPlayers();
  }

  newPlayer() {
    this.showModal = true;
    this.selectedPlayer = this. getDefaullValuesForNewPlayer();
    setTimeout(() => {
      window.location.replace('#open-modal');
    });
  }

  closeDialog() {
    this.showModal = false;
  }

  editPlayer(player: Player) {
    this.selectedPlayer = { ...player };
    this.showModal = true;
    setTimeout(() => {
      window.location.replace('#open-modal');
    });
  }
  
  deletePlayer(key: any) {
    this.teamService.getTeams().pipe(
      take(1),
    ).subscribe(teams => {
      const modiffiedPlayers = teams[0].players.filter(player=>player.key!==key);
      const moddifyTeam = {
        ...teams[0],
        players: [...modiffiedPlayers]
      }
      this.playerService.deletePlayer(key);
      this.teamService.editTeam(moddifyTeam)
    });
  }

  getDefaullValuesForNewPlayer(): Player {
    return {name: '', height: null!, lastName: null!, leftFooter: false, nationality: null!, position: null!, weight: null! }
  }

}


