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
  constructor(private teamService: TeamService) { }

  ngOnInit(): void {
    this.teamService.getTeams().pipe(take(1), defaultIfEmpty([{
      name: 'My amazing team',
      country: Country.Ecuador,
      players: null!
    }] as Team[])).subscribe(data=>{
      console.log(data);
    });

    this.teams$ = this.teamService.getTeams()
    .pipe(
      take(1),
      tap(teams=>{
        if (teams.length < 1) {
          this.teamService.addTeam({
            name: 'My amazing team',
            country: Country.Ecuador,
            players: null!
          });
        }
      })
    );
  }

}
