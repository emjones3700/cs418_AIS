const con = require('./test_connection.js');

stub = false;





function insertAISMessage(){
    var sql = "INSERT INTO AIS_MESSAGE (timestamp, MMSI, Class, Vessel_IMO) VALUES ?";
    var values = [
        ['1000-01-01 00:05:01', 235762000, 'Class A', null],
    ];
    return new Promise((resolve, reject) => {
        con.query(
            sql, [values],
            (err, result) => {
                console.log("Number of records inserted: " + result);
                return err ? reject(err) : resolve(result);
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

function deleteOldAISMessage(){
    var delSQL= "DELETE FROM AIS_MESSAGE WHERE timestamp < ADDDATE(NOW(), INTERVAL - 5 MINUTE) ?"
    return new Promise((resolve, reject) => {
        con.query(
            delSQL,
            (err, result) => {
                console.log("Number of records inserted: " + result.affectedRows);
                return err ? reject(err) : resolve(result.affectedRows);
            }
        );
    });
}

function readAllPortsMatchingName(portName){
    var sql = 'SELECT id, name, country, longitude, latitude, MapView1_Id, MapView2_Id, MapView3_Id FROM PORT WHERE name = \'' + portName + '\'';
    return new Promise((resolve, reject) => {
        con.query(
            sql,
            (err, result) => {
                console.log(result);
                return err ? reject(err) : resolve(result);
            }
        );
    });
}

function readShipMostRecentPositionsWithID(portId){

    var sql = 'SELECT VESSEL.MMSI AS MMSI, POSITION_REPORT.latitude AS lat, POSITION_REPORT.longitude as longitude, VESSEL.IMO AS IMO FROM PORT JOIN STATIC_DATA ON PORT.Name = STATIC_DATA.AISDestination JOIN POSITION_REPORT ON POSITION_REPORT.LastStaticData_Id = STATIC_DATA.AISMessage_Id JOIN AIS_MESSAGE ON AIS_MESSAGE.Id = STATIC_DATA.AISMessage_Id JOIN VESSEL ON VESSEL.IMO = AIS_MESSAGE.Vessel_IMO WHERE PORT.Id = \'' + portId + '\'';
    return new Promise((resolve, reject) => {
        con.query(
            sql,
            (err, result) => {
                return err ? reject(err) : resolve(result);
            }
        );
    });
}

function readShipMostRecentPositionsWithPort(port, country){
 var sql = "";
    return new Promise((resolve, reject) => {
        con.query(
            sql,
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
    deleteOldAISMessage,
    readAllPortsMatchingName,
    readShipMostRecentPositionsWithID,
    readShipMostRecentPositionsWithPort,

    stub
}




