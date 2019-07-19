import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Player, Team, PlayerMap } from '../_models';

@Injectable({ providedIn: 'root' })
export class TeamBuilderService {
    players: any;
    playerObject: any;
    flexTypes: any[];
    constructor(private http: HttpClient) {
      this.flexTypes = ['WR', 'RB', 'TE'];
      this.playerObject = {
        qb:[],
        rb:[],
        wr:[],
        te:[],
        flex:[],
        k:[],
        def:[],
        bench:[]
      };
    }

    getAllPlayers() {
        return this.http.get<any>('https://www.fantasyfootballnerd.com/service/players/json/test/');
    }

    sortAllPlayers(players: Player[]) {
        players.forEach(player => {
            this.playerObject[player.position.toLowerCase()].push(player);
            this.playerObject.bench.push(player);
            if (this.flexTypes.indexOf(player.position) !== -1) {
                this.playerObject.flex.push(player);
            }
        });
        return this.playerObject;
    }

    draft(playerObject) {
        let tempPlayerObject = { ...playerObject};
        let team = {
          qb: [],
          wr: [],
          rb: [],
          te: [],
          flex: [],
          k: [],
          def: [],
          bench: []
        };
        for (let position in team) {
            if (position === 'wr' || position === 'rb') {
              this.addPlayerToRoster(team[position], tempPlayerObject[position], tempPlayerObject);
              this.addPlayerToRoster(team[position], tempPlayerObject[position], tempPlayerObject);
            } else if (position === 'bench') {
              for (let i = 0; i < 6; i++) {
                this.addPlayerToRoster(team[position], tempPlayerObject[position], tempPlayerObject);
              }
            } else {
              this.addPlayerToRoster(team[position], tempPlayerObject[position], tempPlayerObject);
            }
        };
        return team;
    }

    selectRandomPlayer(array) {
        return array[Math.floor(Math.random() * array.length)];
    }

    addPlayerToRoster(teamArray, playerArray, playerObject) {
        let player = this.selectRandomPlayer(playerArray);
        teamArray.push(player);
        for (let array in playerObject) {
            playerObject[array] = this.removePlayer(playerObject[array], player);
        };
    }

    removePlayer(array, player) {
      return array.filter(value => value.playerId != player.playerId);
    }

    // register(team: Team) {
    //     return this.http.post(`${config.apiUrl}/team`, team);
    // }

}
