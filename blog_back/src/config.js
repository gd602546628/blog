/**
 * Created by gd on 2017/5/27/027.
 */


const prdouct = false;

class Config {

    constructor() {
        if (prdouct) {
            this.host = 'http://172.18.174.208';
            this.port = 8080;
            this.dbName = 'blog';
        } else {
            this.host = '172.31.61.39';
            this.port = 8888;
            this.dbName = 'blog';
        }
    }

}

module.exports = new Config()