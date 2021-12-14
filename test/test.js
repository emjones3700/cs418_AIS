
var assert = require('chai').assert;
var expect = require('chai').expect;
var chai = require('chai');
var cf = require("../core_functions.js");
var chaiAsPromised = require('chai-as-promised')
var should = require('chai').should();
chai.use(chaiAsPromised);

//To run more in stub mode, leave this set to true. To run other tests, change to false;
cf.stub = true;


describe('insertAISMessageBatch', async function() {
    if (cf.stub){
        it('insertAISMessageBatchStub', async function(){
            const insertedMessages = await cf.insertAISMessageBatch( [['1000-01-01 00:00:00', 235762000, 'Class A', null]]);
            assert.isNumber( insertedMessages );
            assert.deepEqual(insertedMessages, 1);
        });
    }
    else {
        it('insertAISMessageBatchIntegration', async function() {

            //check valid input works
            const validInsertedMessages = await cf.insertAISMessageBatch([['1000-01-01 00:00:00', 235762000, 'Class A', null]]);
            assert.isNumber(validInsertedMessages);
            assert.deepEqual(validInsertedMessages, 1);

            //check that invalid input throws error
            try {
                await cf.insertAISMessageBatch('hello')
                throw new Error('This will not run')

            } catch (e) {
                expect(e).to.be.instanceOf(Error)
                expect(e.message).to.eql('Invalid input. Batch must be an array of data')
            }
        });
    }
})



describe('getTileImageInTileId', async function() {

    if (cf.stub){
        it('getTileImageInTileIdStub', async function(){
            const TileImageInTileId = await cf.getTileImageInTileId(1);
            assert.isString( TileImageInTileId );
            assert.deepEqual(TileImageInTileId, "SampleImageName.png")
        });
    }

    else{

        it('getTileImageInTileIdIntegration', async function(){

            //check with valid input
            const TileImageInTileId = await cf.getTileImageInTileId(5138);
            assert.isString( TileImageInTileId );
            assert.deepEqual(TileImageInTileId, "42F8.png")

            //check with invalid input
            try {
                await cf.getTileImageInTileId("hi");
                throw new Error('This will not run')

            } catch (e) {
                expect(e).to.be.instanceOf(Error)
                expect(e.message).to.eql("Input is not a number")
            }

        });
    }

})


describe('readRecentPositionsInGivenTile', async function() {
    if (cf.stub){
        it('readRecentPositionsInGivenTileStub', async function(){
            const recentPositionsInTile = await cf.readRecentPositionsInGivenTileId(1);
            assert.isArray( recentPositionsInTile );
            assert.deepEqual(recentPositionsInTile, [])
        });
    }
    else{
        //check valid input
        it('readRecentPositionsInGivenTileIntegration', async function() {
            const recentPositionsInTile = await cf.readRecentPositionsInGivenTileId(5041);
            assert.isArray(recentPositionsInTile)
            recentPositionsInTile[0].should.include.keys(['max', 'Id', 'Timestamp', 'MMSI',
                'Class', 'Vessel_IMO', 'Latitude', 'Longitude', 'AISMessage_Id']);

            //check invalid input

            try {
                await cf.readRecentPositionsInGivenTileId([{'id': 'not ID'}]);
                throw new Error('This will not run')

            } catch (e) {
                expect(e).to.be.instanceOf(Error)
                expect(e.message).to.eql("Input is not a number")
            }
        });
    }

  });



describe('readLastFivePositionsOfMMSI', async function() {


    if (cf.stub){
        it('readLastFivePositionsOfMMSIStub', async function(){
            const shipPositions = await cf.readLastFivePositionsOfMMSI(265177000);
            assert.isArray( shipPositions, "Output is array" );
            assert.lengthOf(shipPositions, 5, "Output is of length 5")
        });
    }
    else {

        it('readLastFivePositionsOfMMSIStubIntegration', async function () {
            //check valid input
            const shipPositions = await cf.readLastFivePositionsOfMMSI(265177000);
            assert.isArray(shipPositions)
            assert.lengthOf(shipPositions, 5, "Output is of length 5")
            shipPositions[0].should.include.keys(['Id', 'Timestamp', 'MMSI', 'Class',
                'Vessel_IMO', 'AISMessage_Id', 'NavigationalStatus', 'Longitude', 'Latitude', 'RoT', 'SoG', 'CoG', 'Heading', 'LastStaticData_Id', 'MapView1_Id', 'MapView2_Id', 'MapView3_Id']);

            //check invalid input
            try {
                await cf.readLastFivePositionsOfMMSI([{'id': 'not ID'}]);
                throw new Error('This will not run')

            } catch (e) {
                expect(e).to.be.instanceOf(Error)
                expect(e.message).to.eql("Input is not a number")
            }
        });
    }
})


it('deleteOldAISMessage', async function() {
    const insertedMessages = await cf.deleteOldAISMessage();
    assert.isNumber( insertedMessages );
    assert.deepEqual(insertedMessages, 1)
})

it('readAllPortsMatchingName', async function() {
    const portsMatchingName = await cf.readAllPortsMatchingName('Nyborg');
    assert.isArray( portsMatchingName );
    assert.deepEqual(portsMatchingName, [
        {"id" : 381, "name" : 'Nyborg', 'country' : 'Denmark', 'longitude' : 10.810833, 'latitude' : 55.298889 ,'MapView1_Id' : 1, 'MapView2_Id' : 5331, 'MapView3_Id' : 53312},
        {"id" : 4970, "name" : 'Nyborg', 'country' : 'Denmark', 'longitude' : 10.790833,'latitude' : 55.306944,'MapView1_Id' : 1, 'MapView2_Id' : 5331, 'MapView3_Id' : 53312}
    ])
})

it('readShipMostRecentPositionsWithID', async function() {
    const shipPositions = await cf.readShipMostRecentPositionsWithID();
    assert.isArray( shipPositions );
    assert.deepEqual(shipPositions, [])
})

it('readShipMostRecentPositionsWithPort', async function() {
    const shipPositions = await cf.readShipMostRecentPositionsWithPort();
    assert.isArray( shipPositions );
    assert.deepEqual(shipPositions, [])
})

it('readShipMostRecentPositionByMMSI', async function() {
    const shipPosition = await cf.readShipMostRecentPositionByMMSI(219854000);
    assert.isArray( shipPosition )
})

it('readPermanentOrTransientVesselInformation', async function() {
    const vesselInformation = await cf.readPermanentOrTransientVesselInformation(440007100, 5275569, 6287207);
    assert.isArray(vesselInformation);
})

it('readAllMostRecentShipPositions', async function() {
    const shipPositions = await cf.readAllMostRecentShipPositions();
    assert.isArray( shipPositions );
})

it('findBackgroundMapTilesContained', async function() {
    const backgroundMapTiles = await cf.findBackgroundMapTilesContained(5037);
    assert.isArray(backgroundMapTiles );

})

it('readAllPositionsInTileOfPort', async function() {
    const shipPositions = await cf.readAllPositionsInTileOfPort('Nyborg', 'Denmark');
    assert.isArray(shipPositions);
})

