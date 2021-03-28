import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { defaultIfEmpty, take, tap } from 'rxjs/operators';
import { Country } from '../interfaces/player';
import { Team } from '../interfaces/team';
import { TeamService, TeamsTableHeaders } from '../services/team.service';

@Component({
  selector: 'app-team-table',
  templateUrl: './team-table.component.html',
  styleUrls: ['./team-table.component.scss']
})
export class TeamTableComponent implements OnInit {
  teams$!: Observable<Team[]>;
  headers = TeamsTableHeaders
  selectedTeam!: Team;
  defaultValuesTeam!: Team;
  showModal: boolean = false;
  constructor(private teamService: TeamService) { }

  ngOnInit(): void {
    this.teams$ = this.teamService.getTeams()
    .pipe(
      tap(teams => {
        if (this.selectedTeam) {
          const team = <any>teams.find(team=>team.$key == this.selectedTeam.$key)
          if (team) {
            this.selectedTeam.players = team?.players;            
          } else {
            this.selectedTeam = null!;
          }
        }
      })
    );
  }

  
  onSelectTeam(team: Team) {
      this.selectedTeam = {...team};
  }

  deleteTeam(key: any) {
    this.teamService.deleteTeam(key);
  }

  editTeam(team: any) {
    this.defaultValuesTeam = { ...team };
    this.showModal = true;
    setTimeout(() => {
      window.location.replace('#open-modal');
    });
  }

  closeDialog() {
    this.showModal = false;
  }

  newTeam() {
    this.showModal = true;
    this.defaultValuesTeam = this.getDefaullValuesForNewTeam();
    setTimeout(() => {
      window.location.replace('#open-modal');
    });
  }

  getDefaullValuesForNewTeam(): Team {
    return {country: Country.Ecuador, name: null!, players: null!};
  }
}
