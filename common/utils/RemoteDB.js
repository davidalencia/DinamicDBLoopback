const DataSource = require('loopback-datasource-juggler').DataSource;
const connector = require('loopback-connector-mssql');


/**
 * @class RemoteDB
 * Clase para poder crear conecciones datasource de loopback y guardar
 * un modelo
 */
class RemoteDB {

  {
      host: 'localhost',
      port: 1433,
      database: 'tierra',
      username: 'SA',
      password: 'mmx2019.',


  /**
   * Da valor a inicial a los atributos necesarios.
   * @param {Object} settings es el mismo objeto que recive DataSource.
   * @property {String} host direccion de la datasource.
   * @property {Number} port puerto de coneccion.
   * @property {String} database nombre de la base de datos.
   * @property {String} username usuario de la base de datos.
   * @property {String} password contraseña para ingresar a la base de datos
   *                             con el usuario ingrsado.
   * @property {loopback-connector|String} [connector=require('loopback-connector-mssql')]
   *                                       cadena con el nombre del connector
   *                                       de loopback o el constructor del
   *                                       conector.
   */
  constructor(settings) {
    this.settings = settings;
    if(this.settings.connector===undefined || this.settings.connector===null)
      this.settings.connector = connector;
  }

  /**
   * Abre una coneccion con la datasource y guarda la información en la tabla
   * del mismo tipo del modelo
   * @param  {Loopback Model} model El modelo de loopback donde se guardara la
   *                                información. Debe existir una tabla del
   *                                mismo tipo que el modelo para que el metodo
   *                                no falle.
   * @param  {Object} data Objeto con la información del registro que se creara
   *                       en la DataSource.
   * @return {Promise} Promesa que es resuelta si el registro es guardado con
   *                   exito y si ocurre algun error falla y lo regresa.
   */
  save(model, data){
    const settings = this.settings
    return new Promise(function(resolve, reject) {
      const ds = new DataSource(settings);
      ds.on('error', reject);
      ds.on('connected', ()=>{
          model.attachTo(ds);
          resolve(model.create(data));
      });
    });
  }
}

module.exports = RemoteDB;
