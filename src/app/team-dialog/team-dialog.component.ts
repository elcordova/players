import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Country } from '../interfaces/player';
import { Team } from '../interfaces/team';
import { TeamService } from '../services/team.service';

@Component({
  selector: 'app-team-dialog',
  templateUrl: './team-dialog.component.html',
  styleUrls: ['./team-dialog.component.scss']
})
export class TeamDialogComponent implements OnInit {

  @Input() team!: Team;
  @Output() closeDialog: EventEmitter<boolean> = new EventEmitter();
  public countries = Object.keys(Country).map((key)=>({label: key, key: (<any>Country)[key]}));
  constructor(private teamService: TeamService) { }

  ngOnInit(): void {
  }

  onSubmit(teamForm: NgForm) {
    if (teamForm.valid) {
      if (this.team.$key) {
        this.editTeam({...teamForm.value, $key: this.team.$key});
      } else {
        this.newTeam(teamForm.value);
      }
      this.onClose();
    } else {
      alert('not valid form');
    }
  }

  private newTeam(playerFormValue: Team) {
    const formattedTeam: Team = {
      ...playerFormValue,
      players: null!
    }
    this.teamService.addTeam(formattedTeam);
  }

  private editTeam(playerFormValue: any) {
    const formattedTeam = {
      ...playerFormValue,
      players: [...this.team?.players||[]]
    }
    this.teamService.editTeam(formattedTeam);

  }

  onClose() {
    this.closeDialog.emit(true);
  }

}
