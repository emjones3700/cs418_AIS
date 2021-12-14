const con = require('./test_connection.js');

stub = false;





function insertAISMessage(){
    if(this.stub){
        return Promise.resolve(1)
    }
    var sql = "INSERT INTO AIS_MESSAGE (Timestamp, MMSI, Class, Vessel_IMO) VALUES ?";
    var values = [
        ['1000-01-01 00:00:00', 235762000, 'Class A', null],
    ];
    return new Promise((resolve, reject) => {
        con.query(
            sql, [values],
            (err, result) => {

                return err ? reject(err) : resolve(result.affectedRows);
            }
        );
    });


}



function getTileImageInTileId(id){

    // if(this.stub){
    //     return Promise.resolve([])
    // }
    return new Promise((resolve, reject) => {
        con.query(
            "select RasterFile from MAP_VIEW where Id =" + id + ";",
            (err, result) => {
                return err ? reject(err) : resolve(result[0].RasterFile);
            }
        );
    });

}

function readRecentPositionsInGivenTileId(){

    if(this.stub){
        return Promise.resolve([])
    }
    return new Promise((resolve, reject) => {
        con.query(
            "select tb2.max, am.*, pr.Latitude, pr.Longitude, pr.AISMessage_Id from AIS_MESSAGE as am, POSITION_REPORT as pr, (SELECT tb1.IMO as imo, MAX(tb1.AISMessage_Id) as max FROM (select pr.*, vess.IMO, vess.Name, m.LatitudeN,  m.LatitudeS,  m.LongitudeE, m.LongitudeW  from MAP_VIEW as m, POSITION_REPORT as pr, VESSEL as vess WHERE m.Id = 5041 AND pr.Longitude <= m.LongitudeE AND pr.Longitude >= m.LongitudeW AND pr.Latitude <= m.LatitudeN AND pr.Latitude >= m.LatitudeS LIMIT 1000) as tb1 GROUP BY tb1.IMO) as tb2 where am.Id = tb2.max AND am.Id = AISMessage_Id",
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
            "SELECT * FROM AIS_MESSAGE JOIN POSITION_REPORT ON POSITION_REPORT.AISMessage_Id = AIS_MESSAGE.Id WHERE MMSI=265177000 ORDER BY AIS_MESSAGE.Timestamp ASC LIMIT 5;",
            (err, result) => {
                console.log(result);
                return err ? reject(err) : resolve(result);
            }
        );
    });

}

function deleteOldAISMessage(){

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

function readAllPortsMatchingName(){

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

function readShipMostRecentPositionsWithID(){

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

function readShipMostRecentPositionsWithPort(){

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


function readShipMostRecentPositionByMMSI(MMSI){
    if(this.stub){
        return Promise.resolve([])
    }
    return new Promise((resolve, reject) => {
        con.query(
            "SELECT * FROM POSITION_REPORT WHERE AISMessage_Id IN (SELECT * FROM (SELECT ID FROM AIS_MESSAGE WHERE MMSI IN ("+ MMSI.toString() +") ORDER BY Timestamp DESC LIMIT 1) temp_tab)",
            (err, result) => {
                console.log(result)
                return err ? reject(err) : resolve(result);
            }
        );
    });
}

function readPermanentOrTransientVesselInformation(MMSI, IMO, CallSign){
    if(this.stub){
        return Promise.resolve([])
    }
    var sql;
    if(IMO === undefined && CallSign === undefined){
        sql = "SELECT * FROM VESSEL WHERE MMSI IN (" + MMSI.toString() + ")"
    } else if (IMO === undefined){
        sql = "SELECT * FROM VESSEL WHERE MMSI IN (" + MMSI.toString() + ") AND CallSign IN (" + CallSign.toString() + ")"
    } else if (CallSign === undefined){
        sql = "SELECT * FROM VESSEL WHERE MMSI IN (" + MMSI.toString() + ") AND IMO IN (" + IMO.toString() + ")"
    } else {
        sql = "SELECT * FROM VESSEL WHERE MMSI IN (" + MMSI.toString() + ") AND IMO IN (" + IMO.toString() + ") AND CallSign IN (" + CallSign.toString() + ")"
    }
        return new Promise((resolve, reject) => {
        con.query(
            sql,
            (err, result) => {
                console.log(result)
                return err ? reject(err) : resolve(result);
            }
        );
    });
}

function readAllMostRecentShipPositions(){
    if(this.stub){
        return Promise.resolve([])
    }
    return new Promise((resolve, reject) => {
        con.query(
            "SELECT * FROM POSITION_REPORT INNER JOIN AIS_MESSAGE ON AISMessage_Id = Id WHERE AISMessage_Id IN (SELECT Id FROM AIS_MESSAGE WHERE (MMSI, Timestamp) IN (SELECT MMSI, MAX(Timestamp) FROM AIS_MESSAGE GROUP BY MMSI))",
            (err, result) => {
                console.log(result)
                return err ? reject(err) : resolve(result);
            }
        );
    });
}

function findBackgroundMapTilesContained(levelOneMapTileId){
    if(this.stub){
        return Promise.resolve([])
    }
    return new Promise((resolve, reject) => {
        con.query(
            "SELECT * FROM MAP_VIEW WHERE LongitudeW >= (SELECT LongitudeW FROM MAP_VIEW WHERE Id IN ("+levelOneMapTileId.toString()+")) AND LongitudeE <= (SELECT LongitudeE FROM MAP_VIEW WHERE Id IN ("+levelOneMapTileId.toString()+")) AND LatitudeN <= (SELECT LatitudeN FROM MAP_VIEW WHERE Id IN ("+levelOneMapTileId.toString()+")) AND LatitudeS >= (SELECT LatitudeS FROM MAP_VIEW WHERE Id IN ("+levelOneMapTileId.toString()+"))",
            (err, result) => {
                console.log(result)
                return err ? reject(err) : resolve(result);
            }
        );
    });
}


function readAllPositionsInTileOfPort(port, country){
    if(this.stub){
        return Promise.resolve([])
    }
    return new Promise((resolve, reject) => {
        con.query(
            "SELECT * FROM POSITION_REPORT WHERE Longitude <= (SELECT LongitudeE FROM MAP_VIEW WHERE Id IN (SELECT MapView3_ID FROM PORT WHERE Name IN ("+port+") AND Country IN ("+country+"))) AND Longitude >= (SELECT LongitudeW FROM MAP_VIEW WHERE Id IN (SELECT MapView3_ID FROM PORT WHERE Name IN ("+port+") AND Country IN ("+country+"))) AND Latitude >= (SELECT LatitudeS FROM MAP_VIEW WHERE Id IN (SELECT MapView3_ID FROM PORT WHERE Name IN ("+port+") AND Country IN ("+country+"))) AND Latitude <= (SELECT LatitudeN FROM MAP_VIEW WHERE Id IN (SELECT MapView3_ID FROM PORT WHERE Name IN ("+port+") AND Country IN ("+country+")))",
            (err, result) => {
                console.log(result)
                return err ? reject(err) : resolve(result);
            }
        );
    });
}


module.exports = {

    insertAISMessage,
    getTileImageInTileId,
    readRecentPositionsInGivenTileId,
    readLastFivePositionsOfMMSI,
    deleteOldAISMessage,
    readAllPortsMatchingName,
    readShipMostRecentPositionsWithID,
    readShipMostRecentPositionsWithPort,
    readShipMostRecentPositionByMMSI,
    readPermanentOrTransientVesselInformation,
    readAllMostRecentShipPositions,
    findBackgroundMapTilesContained,
    readAllPositionsInTileOfPort,

    stub
}






