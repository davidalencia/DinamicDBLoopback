const DataSource = require('loopback-datasource-juggler').DataSource;
const connector = require('loopback-connector-mssql');



class RemoteDB {
  constructor(settings) {
    this.settings = settings;
    if(this.settings.connector===undefined || this.settings.connector===null)
      this.settings.connector = connector;
  }

  save(model, data){
    const settings = this.settings
    return new Promise(function(resolve, reject) {
      const ds = new DataSource(settings);
      ds.on('error', (err)=>{
        reject(err);
      });
      ds.on('connected', ()=>{
          model.attachTo(ds);
          resolve(model.create(data));
      });
    });
  }
}

module.exports = RemoteDB;
