const con = require('./test_connection.js');



(async()=>{
    const vessels = await getVessels();
    console.log(vessels);
})();

function getVessels(){
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
    getVessels:getVessels()
}




