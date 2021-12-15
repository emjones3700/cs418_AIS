# AIS Project: Monitoring Ships at Sea (milestone 4 - option A)

## Set Up Instructions

**Install the database schema and sample data**

*Note: You will need MySQL and Node.js installed on your local machine before hand

To install the database needed for this program, you will first need to download the file below. Due to the large file size, we were not able to include it in our repository.

https://drive.google.com/file/d/1B6LB07cX7zcIcMtrga7l6rFiL1MXCsvT/view?usp=sharing

After the file is downloaded, run the following shell command

    $ mysql -u <insert-your-username> -p < AIS_gen.mysql

**Install Dependencies**

Navigate to the root of the project directory and run `npm install`

**Edit Database Connection Configuration**
In order to successfully connect to the AIS sample database,  you will need to add in your own MySQL credentials.

The connection to the database is located in [db_config.js](db_config.js)


    var mysql = require('mysql');  
      
    var con = mysql.createConnection({  
      host: "localhost",  
      user: "your_user_here",  
      password: "your_password_here",  
      database: "AISTestData"  
    });


## Run Tests

The **core functions** for this project are located in [core_functions.js](core_functions.js). Each function is tested inside of [test/test.js](test/test.js). To run these tests, use the `npm test` command.

### Toggle stub mode


To test the basic interface of the functions, inside of [test/test.js](test/test.js) leave the core functions stub property to equal `true`
<br>
<br>
To run the more thourough integration tests, change the core functions stub variable to equal to `false` or comment out 

`//cf.stub = true;`

## Core Functions

| Description                                                           |     Function Name     | Test Name             |         Parameters        | Priority |
|-----------------------------------------------------------------------|:---------------------:|-----------------------|:-------------------------:|----------|
| Insert a batch of AIS messages  (Static Data and/or Position Reports) | insertAISMessageBatch | insertAISMessageBatch | Array of AIS Message data |     1    ||-----------------------------------------------------------------------|:---------------------:|-----------------------|:-------------------------:|----------|
| Insert an AIS Message (Static Data and/or Position Reports) | insertAISMessage | insertAISMessage| AIS Message data |     2    ||-----------------------------------------------------------------------|:---------------------:|-----------------------|:-------------------------:|----------|
| Given a tile Id, get the actual tile (a PNG file)| getTileImageInTileId | getTileImageInTileId | Map_View ID |     4    ||-----------------------------------------------------------------------|:---------------------:|-----------------------|:-------------------------:|----------|
| Read all most recent ship positions in the given tile | readRecentPositionsInGivenTileId | readRecentPositionsInGivenTileId | Map_View ID |   2     ||-----------------------------------------------------------------------|:---------------------:|-----------------------|:-------------------------:|----------|
| Read last 5 positions of given MMSI | readLastFivePositionsOfMMSI | readLastFivePositionsOfMMSI | MMSI Number |   3   ||-----------------------------------------------------------------------|:---------------------:|-----------------------|:-------------------------:|----------|
| Delete all AIS messages whose timestamp is more than 5 minutes older than current time | deleteOldAISMessage | deleteOldAISMessage | Current time, Timestamp |   1   ||-----------------------------------------------------------------------|:---------------------:|-----------------------|:-------------------------:|----------|
| Read most recents positions of ships headed to port with given Id | readMostRecentPositionsWithId | readMostRecentPositionsWithId | Port Id |   4   ||-----------------------------------------------------------------------|:---------------------:|-----------------------|:-------------------------:|----------|
| Read all ports matching the given name and (optional) country | readAllPortsMatchingName | readAllPortsMatchingName | Port Name, Country(Optional)  |   2   ||-----------------------------------------------------------------------|:---------------------:|-----------------------|:-------------------------:|----------|
| Read most recent positions of ships headed to given port (as read from static data, or user input) | readShipMostRecentPositionWithPort | readShipMostRecentPositionWithPort | Port Name, Country(Optional)  |   4  ||-----------------------------------------------------------------------|:---------------------:|-----------------------|:-------------------------:|----------|
| Read most recent positions for all ships in the database | readAllMostRecentShipPositions | readAllMostRecentShipPositions | none | 1 |
| Read vessel information given certain parameters | readPermanentOrTransientVesselInformation | readPermanentOrTransientVesselInformation | MMSI, IMO, Name | 1 |
| Read the most recent position of a ship given its MMSI | readShipMostRecentPositionByMMSI | readShipMostRecentPositionByMMSI | MMSI | 1 |
| Read all ship positions in the scale 3 tile of a given port | readAllPositionsInTileOfPort | readAllPositionsInTileOfPort | Port name, Country | 2 |
| Get all zoom level 2 map tiles contained in a zoom 1 level map tile | findBackgroundMapTilesContained | findBackgroundMapTilesContained | Map Tile Id | 4 |