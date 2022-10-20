import LeaderBoardInterface from '../Interfaces/LeaderBoard.interfaces';
import Matches from '../database/models/matches';
import Team from '../database/models/Team';
import Data from './Data';

class LeaderBoardS {
  private _team: Team[];
  private _matches: Matches[];
  private _leaderBoardI: LeaderBoardInterface[];

  constructor(private teamsModel = Team, private matchesModel = Matches) { }

  private sort() {
    this._leaderBoardI = this._leaderBoardI.sort((a, b) => a.goalsOwn - b.goalsOwn);
    this._leaderBoardI = this._leaderBoardI.sort((a, b) => b.goalsFavor - a.goalsFavor);
    this._leaderBoardI = this._leaderBoardI.sort((a, b) => b.goalsBalance - a.goalsBalance);
    this._leaderBoardI = this._leaderBoardI.sort((a, b) => b.totalPoints - a.totalPoints);
  }

  private async getAll() {
    this._team = await this.teamsModel.findAll();
    this._matches = await this.matchesModel.findAll({ where: { inProgress: false } });
  }

  private Home() {
    this._leaderBoardI = this._team.map((team) => {
      const { teamName } = team;
      const teamMatchResults = this._matches.filter((match) => (
        match.homeTeam === team.id || match.awayTeam === team.id
      ));
      const data = new Data(teamMatchResults, team.id);
      const matchesData = data.homeData();
      const result = {
        ...matchesData,
        name: teamName,
      };
      return result;
    });
    this.sort();
  }

  private Away() {
    this._leaderBoardI = this._team.map((team) => {
      const { teamName } = team;
      const teamMatchResults = this._matches.filter((match) => (
        match.homeTeam === team.id || match.awayTeam === team.id
      ));
      const data = new Data(teamMatchResults, team.id);
      const matchesData = data.awayData();
      const result = {
        ...matchesData,
        name: teamName,
      };
      return result;
    });
    this.sort();
  }

  private Total() {
    this._leaderBoardI = this._team.map((team) => {
      const { teamName } = team;
      const teamMatchResults = this._matches.filter((match) => (
        match.homeTeam === team.id || match.awayTeam === team.id
      ));
      const data = new Data(teamMatchResults, team.id);
      const matchesData = data.totalData();
      const result = {
        ...matchesData,
        name: teamName,
      };
      return result;
    });
    this.sort();
  }

  async home() {
    await this.getAll();
    this.Home();
    return this._leaderBoardI;
  }

  async away() {
    await this.getAll();
    this.Away();
    return this._leaderBoardI;
  }

  async total() {
    await this.getAll();
    this.Total();
    return this._leaderBoardI;
  }
}

export default LeaderBoardS;
