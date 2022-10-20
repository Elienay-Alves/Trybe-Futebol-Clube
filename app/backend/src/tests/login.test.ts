import * as sinon from "sinon";
import * as chai from "chai";
import { app } from "../app";
import Auhorization from "../Middleware/Authorization";

// @ts-ignore
import chaiHttp = require("chai-http");

import { Response } from "superagent";

chai.use(chaiHttp);

const { expect } = chai;

describe("Login", () => {
  describe("Testing postLogin", () => {
    it("Shold return 400", async () => {
      const loginPost: Response = await chai.request(app).post("/login").send();

      expect(loginPost.status).to.be.equal(400);
    });

    it("Should return 401", async () => {
      const loginPost = await chai
        .request(app)
        .post("/login")
        .send({ email: "admin@admi.com", password: "secret_admin" });

      expect(loginPost.status).to.be.equal(401);
    });

    it("Should return 200", async () => {
      const loginPost = await chai
        .request(app)
        .post("/login")
        .send({ email: "admin@admin.com", password: "secret_admin" });

      expect(loginPost.status).to.be.equal(200);
    });
  });

  describe("Tensting loginGet", () => {
    it("Should return 401", async () => {
      const getLogin = await chai
        .request(app)
        .get("/login/validate")
        .set("authorization", "");

      expect(getLogin.status).to.be.equal(401);
    });

    it("Should return 401", async () => {
      const getLogin = await chai
        .request(app)
        .get("/login/validate")
        .set(
          "authorization",
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
        );

      expect(getLogin.status).to.be.equal(401);
    });

    it("Should return 200", async () => {
      const authorization = new Auhorization();

      const loginPost = await chai
        .request(app)
        .post("/login")
        .send({ email: "admin@admin.com", password: "secret_admin" });

      const getLogin = await chai
        .request(app)
        .get("/login/validate")
        .set("Authorization", loginPost.body.token);
        
      expect(getLogin.status).to.be.equal(200);
      expect(getLogin.body).to.be.deep.equal({ role: "admin" });
    });
  });
});

