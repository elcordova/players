import { Component, OnInit } from '@angular/core';
import { filter, take } from 'rxjs/operators';
import { Country, Player, SquadNumber } from '../interfaces/player';
import { Team } from '../interfaces/team';
import { PlayerService } from '../services/player.service';
import { TeamService } from '../services/team.service';

@Component({
  selector: 'app-player-dialog',
  templateUrl: './player-dialog.component.html',
  styleUrls: ['./player-dialog.component.scss']
})
export class PlayerDialogComponent implements OnInit {
  private team!: Team;
  public countries = Object.keys(Country).map((key)=>({label: key, key: (<any>Country)[key]}));
  public squadNumber = Object.keys(SquadNumber);
  constructor(private playerService: PlayerService, private teamService: TeamService) { }

  ngOnInit(): void {
    this.teamService
    .getTeams()
    .pipe(take(1), filter(teams=>!!teams.length))
    .subscribe(teams => {
      this.team = teams[0];
    })
  }

  private newPlayer(playerFormValue: Player) {
    const key = this.playerService.addPlayer(playerFormValue); 
    const playerFormValueKey = {
      ...playerFormValue, key
    }
    const formattedTeam = {
      ...this.team,
      players: [...this.team.players||[], playerFormValueKey]
    }
    this.teamService.editTeam(formattedTeam);
  }

}
