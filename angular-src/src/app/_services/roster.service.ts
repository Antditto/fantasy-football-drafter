import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Team } from '../_models';

@Injectable({ providedIn: 'root' })
export class RosterService {
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

    getRoster(id) {
        return this.http.get<any>(`/roster/${id}`);
    }

    save(roster: Team) {
        try {
          return this.http.post(`/roster`, roster);
        } catch (err) {
          console.log(err)
        }
    }

}
