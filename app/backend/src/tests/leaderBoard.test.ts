import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import { Response } from 'superagent';
import Teams from '../database/models/Team';
import Matches from '../database/models/matches';

chai.use(chaiHttp);

const { expect } = chai;

const teams = [
  {
    id: 1,
    teamName: 'Sport',
  },
  {
    id: 2,
    teamName: 'Santa Cruz',
  },
];

const matches = [
  {
    id: 1,
    homeTeam: 1,
    homeTeamGoals: 1,
    awayTeam: 2,
    awayTeamGoals: 1,
    inProgress: false,
  },
  {
    id: 2,
    homeTeam: 2,
    homeTeamGoals: 2,
    awayTeam: 1,
    awayTeamGoals: 0,
    inProgress: false,
  }
];

describe('Testing /leaderboard/home', () => {
  let chaiHttpResponse: Response;

  before(async () => {
    sinon
      .stub(Teams, "findAll")
      .resolves(teams as Teams[]);
    sinon
      .stub(Matches, "findAll")
      .resolves(matches as Matches[]);
  });

  after(()=>{
    (Teams.findAll as sinon.SinonStub).restore();
    (Matches.findAll as sinon.SinonStub).restore();
  });

  it('Return array', async () => {
    chaiHttpResponse = await chai.request(app).get('/leaderboard/home');

    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.be.an('array');
  });
});

describe('Testing /leaderboard/away', () => {
  let chaiHttpResponse: Response;

  before(async () => {
    sinon
      .stub(Teams, "findAll")
      .resolves(teams as Teams[]);
    sinon
      .stub(Matches, "findAll")
      .resolves(matches as Matches[]);
  });

  after(()=>{
    (Teams.findAll as sinon.SinonStub).restore();
    (Matches.findAll as sinon.SinonStub).restore();
  });

  it('Return array', async () => {
    chaiHttpResponse = await chai.request(app).get('/leaderboard/away');

    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.be.an('array');
  });
});

describe('Testing /leaderboard', () => {
  let chaiHttpResponse: Response;

  before(async () => {
    sinon
      .stub(Teams, "findAll")
      .resolves(teams as Teams[]);
    sinon
      .stub(Matches, "findAll")
      .resolves(matches as Matches[]);
  });

  after(()=>{
    (Teams.findAll as sinon.SinonStub).restore();
    (Matches.findAll as sinon.SinonStub).restore();
  });

  it('Return array', async () => {
    chaiHttpResponse = await chai.request(app).get('/leaderboard');

    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.be.an('array');
  });
});