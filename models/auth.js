'user strict';

const md5 = require('md5');
const moment = require('moment');
const jwt = require('jsonwebtoken');
const { MySQL } = require('../db');
const { UnauthorisedError } = require('../exceptions');
require('dotenv').load();

const { tokenSecret, dbHost, dbUser, dbPassword, dbName } = process.env;
const db = new MySQL(dbHost, dbUser, dbPassword, dbName);

function OAuth2Request(dbConn) {
  if (dbConn !== undefined) {
    this.db = dbConn;
  }
}

function OAuth2Response(id, accessToken, refreshToken) {
  this.userId = id;
  this.accessToken = accessToken;
  this.refreshToken = refreshToken;
}

OAuth2Request.prototype.authByPassword = function (username, pwd) {
  return new Promise((resolve, reject) => {
    (this.db || db).query(
      `select code, password, salt, token, urt.status as tokenStatus, store_id as storeId
       from user
       left join user_refresh_token as urt on user.code = urt.user_id
       where email='${username}' and user.status=1`,
      (error, results) => {
        // Check if account is valid and active
        if (error || results.length == 0) {
          reject(new UnauthorisedError('Not authorised.'));
        } else {
          const {
            code,
            password,
            salt,
            token,
            tokenStatus,
            storeId,
          } = results[0];

          if (password === md5(`${pwd + salt}`)) {
            // If password matched then generating new access token
            const accessToken = jwt.sign(
              {
                data: {
                  accountId: code,
                  storeId,
                  expiry: moment.utc().format('YYYY-MM-DD HH:mm:ss'),
                },
              },
              tokenSecret
            );

            (this.db || db).query(
              `insert into user_access_token(token, user_id, expired_on) values('${accessToken}', '${code}', '${moment
                .utc()
                .add(1, 'hour')
                .format('YYYY-MM-DD HH:mm:ss')}')`,
              error => {
                if (error) {

                  reject(new UnauthorisedError('Not authorised.'));
                } else if (!token) {
                  const refreshToken = md5(
                    `${code +
                    salt +
                    moment.utc().format('YYYY-MM-DD HH:mm:ss')}`
                  );
                  (this.db || db).query(
                    `insert into user_refresh_token(token, user_id) values('${refreshToken}', '${code}')`,
                    error => {

                      if (error) {
                        reject(new UnauthorisedError('Not authorised.'));
                      } else {
                        resolve(
                          new OAuth2Response(code, accessToken, refreshToken)
                        );
                      }
                    }
                  );
                } else {

                  resolve(new OAuth2Response(code, accessToken, token));
                }
              }
            );
          } else {

            reject(new UnauthorisedError('No account found.'));
          }
        }
      }
    );
  });
};

OAuth2Request.prototype.validateToken = function (token) {
  return new Promise((resolve, reject) => {
    (this.db || db).query(
      `select * from user_access_token where token='${token}' and expired_on > '${moment
        .utc()
        .format('YYYY-MM-DD HH:mm:ss')}' order by id desc limit 1`,
      (error, results) => {
        if (error || results.length == 0) {
          reject(new UnauthorisedError('Unauthorised request.'));
        } else {
          resolve({ valid: true, message: 'Token validated.' });
        }
      }
    );
  });
};

OAuth2Request.prototype.refreshToken = function (token) {
  return new Promise((resolve, reject) => {
    (this.db || db).query(
      `select user_id as userId from user_refresh_token where token='${token}' and status=1 order by id desc limit 1`,
      (error, results) => {
        if (error) {
          reject(new UnauthorisedError('Unauthorised request.'));
        } else if (results.length > 0) {
          const userId = results[0].userId;
          (this.db || db).query(
            `select code, salt from user where code='${userId}' and status=1`,
            (error, results) => {
              if (error || results.length == 0) {
                reject(new UnauthorisedError('Unauthorised request.'));
              } else {
                const { code } = results[0];
                const accessToken = jwt.sign(
                  {
                    data: {
                      id: userId,
                      code,
                      expiry: moment.utc().format('YYYY-MM-DD HH:mm:ss'),
                    },
                  },
                  tokenSecret
                );
                (this.db || db).query(
                  `insert into user_access_token(token, user_id, expired_on) values('${accessToken}', '${userId}', '${moment
                    .utc()
                    .add(1, 'hour')
                    .format('YYYY-MM-DD HH:mm:ss')}')`,
                  error => {
                    if (error) {
                      reject(new UnauthorisedError('Unauthorised request.'));
                    } else {
                      resolve(new OAuth2Response(code, accessToken, token));
                    }
                  }
                );
              }
            }
          );
        } else {
          reject(new UnauthorisedError('Refresh token expired.'));
        }
      }
    );
  });
};

module.exports = {
  OAuth2Request,
  OAuth2Response,
};
