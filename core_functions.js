const con = require('./test_connection.js');

stub = false;



function getVessels(){

        if(this.stub){
            return Promise.resolve([])
        }
        return new Promise((resolve, reject) => {
            con.query(
                "SELECT * FROM VESSEL",
                (err, result) => {
                    return err ? reject(err) : resolve(result);
                }
            );
        });


}

module.exports = {
    getVessels:getVessels(),
    stub:this.stub
}




