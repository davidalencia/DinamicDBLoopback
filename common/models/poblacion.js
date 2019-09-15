'use strict';

const RemoteDB = require('../utils/RemoteDB');

module.exports = function(Poblacion) {
  Poblacion.remoteMethod("agregaEnte", {
    accepts: [
      {
        arg: "data",
        type: "object",
        required: true,
        http: {
          source: "body"
        }
      }
    ],
    http: {
      path: "/agrega"
    },
    returns: {
      type: "object",
      root: true
    }
  });

  Poblacion.agregaEnte = (data, cb) => {
    const db = new RemoteDB({
        host: 'localhost',
        port: 1433,
        database: 'tierra',
        username: 'SA',
        password: 'mmx2019.',
    });
    return db.save(Poblacion, data)
    .then(res=>{
      return res;
    }).catch(err=>{
      cb({
        statusCode: 505,
        message: "no pudo conectarse a db"
      });
    });
  }

};
