import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { Player } from '../interfaces/player';
import { Team } from '../interfaces/team';
import { PlayerService } from '../services/player.service';
import { TeamService } from '../services/team.service';

@Component({
  selector: 'app-player-table',
  templateUrl: './player-table.component.html',
  styleUrls: ['./player-table.component.scss']
})
export class PlayerTableComponent {
  @Input() selectedTeam!: Team;
  public selectedPlayer!: Player;
  public showModal!: boolean;
  constructor(private playerService: PlayerService, private teamService: TeamService) { }

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
      const modiffiedPlayers = this.selectedTeam.players.filter(player=>player.key!==key);
      const moddifyTeam = {
        ...this.selectedTeam,
        players: [...modiffiedPlayers]
      }
      this.playerService.deletePlayer(key);
      this.teamService.editTeam(moddifyTeam)
  }

  getDefaullValuesForNewPlayer(): Player {
    return {name: '', height: null!, lastName: null!, leftFooter: false, nationality: null!, position: null!, weight: null! }
  }

}


