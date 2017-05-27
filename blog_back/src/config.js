/**
 * Created by gd on 2017/5/27/027.
 */


class Config {

    constructor() {
        this.host = "localhost";
        this.port = 8888;
        this.dbName='blog';
    }

}

module.exports = new Config()