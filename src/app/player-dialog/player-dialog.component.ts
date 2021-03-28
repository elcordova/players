import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
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
  @Output() closeDialog: EventEmitter<boolean> = new EventEmitter();
  @Input() player!: Player;
  public countries = Object.keys(Country).map((key)=>({label: key, key: (<any>Country)[key]}));
  public squadNumber = Object.keys(SquadNumber).slice(Object.keys(SquadNumber).length/2)
  .map(key=>({
    label: key,
    key: (<any>SquadNumber)[key]
  }));
  constructor(private playerService: PlayerService, private teamService: TeamService) { }

  ngOnInit(): void {
    this.teamService
    .getTeams()
    .pipe(take(1), filter(teams=>!!teams.length))
    .subscribe(teams => {
      this.team = teams[0];
    })
  }


  onSubmit(playerForm: NgForm) {
    if (playerForm.valid) {
      const playerFormValue = {...playerForm.value, 
        leftFooter: playerForm.value.leftFooter === '' ? false:playerForm.value.leftFooter
      };
      if (this.player.key) {
        this.editPlayer(playerFormValue);
      } else {
        this.newPlayer(playerFormValue);
      }
      this.onClose();
    } else {
      alert('not valid form');
    }
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

  private editPlayer(playerFormValue: any) {
    const key = this.player.key;
    const playerFormValueKey = {
      ...playerFormValue, key
    }
    this.playerService.editPlayer(playerFormValueKey);
    
    const formattedTeam = {
      ...this.team,
      players: [...this.team.players.map(player => player.key === key?playerFormValueKey:player)]
    }
    this.teamService.editTeam(formattedTeam);

  }

  onClose() {
    this.closeDialog.emit(true);
  }

}
