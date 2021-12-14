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
| Read last 5 positions of given MMSI | readLastFivePositionsOfMMSI | readLastFivePositionsOfMMSI | MMSI Number |   3   |
