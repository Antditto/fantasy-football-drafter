import { Component, OnInit } from '@angular/core';
import { pluck, first } from 'rxjs/operators';

import { Player, User } from '../_models';
import { TeamBuilderService, RosterService, AuthenticationService } from '../_services';

@Component({ templateUrl: 'home.component.html' })
export class HomeComponent implements OnInit {
    currentUser: User;
    players: {};
    roster: any;
    saved: any;
    savedRoster: boolean = false;

    constructor(
        private authenticationService: AuthenticationService,
        private teamBuilderService: TeamBuilderService,
        private rosterService: RosterService
    ) {
        this.currentUser = this.authenticationService.currentUserValue;
    }

    ngOnInit() {
        this.loadRoster();
        this.loadPlayers();
    }

    private loadRoster() {
        this.rosterService.getRoster(this.currentUser.id)
          .pipe(first())
          .subscribe(roster => {
            if (!roster.id) {
              return;
            }
            this.savedRoster = true;
            return this.roster = roster
          })
    }

    private loadPlayers() {
        this.teamBuilderService.getAllPlayers()
            .pipe(pluck('Players'))
            .subscribe(players => {
              this.players = this.teamBuilderService.sortAllPlayers(players);
            });
    }

    draft() {
        this.savedRoster = false;
        this.roster = this.teamBuilderService.draft(this.players);
    }

    save() {
        if (!this.roster) {
          return;
        }
        this.roster.userId = this.currentUser.id;
        this.rosterService.save(this.roster)
          .pipe(first())
          .subscribe(data => {
            console.log(data)
            this.saved = data;
          });
    }

}
