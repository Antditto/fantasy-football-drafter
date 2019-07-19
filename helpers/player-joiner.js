const db = require("../models");
const request = require('request-promise');

module.exports = function joinPlayers(roster) {
  let rosterObject = {};
  roster = JSON.parse(roster);
  roster = roster[0];
  return request('https://www.fantasyfootballnerd.com/service/players/json/test/', {
      json: true
    })
    .then(body => {
      for (let position in roster) {
        if (roster[position].length < 5) {
          let positionName = (position.indexOf('_') == -1) ? position : position.split(/_(.+)/)[0];
          if (!Array.isArray(rosterObject[positionName])) {
            rosterObject[positionName] = [];
          }
          let item = body.Players.find((item) => item.playerId === roster[position]);
          rosterObject[positionName].push(item);
        }
      }
      rosterObject.id = roster.id;
      return rosterObject;
    })
}
