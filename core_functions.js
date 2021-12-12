const con = require('./test_connection.js');

stub = false;






function insertAISMessage(){
    if(this.stub){
        return Promise.resolve(1)
    }
    var sql = "INSERT INTO AIS_MESSAGE (timestamp, MMSI, Class, Vessel_IMO) VALUES ?";
    var values = [
        ['1000-01-01 00:00:00', 235762000, 'Class A', null],
    ];
    return new Promise((resolve, reject) => {
        con.query(
            sql, [values],
            (err, result) => {
                console.log("Number of records inserted: " + result.affectedRows);
                return err ? reject(err) : resolve(result.affectedRows);
            }
        );
    });


}



function readRecentPositions(){

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

function readRecentPositionsInGivenTile(){

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

function readLastFivePositionsOfMMSI(){

    if(this.stub){
        return Promise.resolve(["position1", "position2", "position3", "position4", "position5"])
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

    insertAISMessage,
    readRecentPositions,
    readRecentPositionsInGivenTile,
    readLastFivePositionsOfMMSI,

    stub
}




