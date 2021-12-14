
var assert = require('chai').assert;
var expect = require('chai').expect;
var chai = require('chai');
var qr = require("../core_functions.js");
const {stub} = require("../core_functions");
var chaiAsPromised = require('chai-as-promised')
chai.use(chaiAsPromised);




it('insertAISMessageBatch', async function() {
    if (qr.stub){
        const insertedMessages = await qr.insertAISMessageBatch( [['1000-01-01 00:00:00', 235762000, 'Class A', null]]);
        assert.isNumber( insertedMessages );
        assert.deepEqual(insertedMessages, 1);
    }
    else {

        //check valid input works
        const validInsertedMessages = await qr.insertAISMessageBatch([['1000-01-01 00:00:00', 235762000, 'Class A', null]]);
        assert.isNumber(validInsertedMessages);
        assert.deepEqual(validInsertedMessages, 1);

        //check that invalid input throws error
        try {
            await  qr.insertAISMessageBatch('hello')
            throw new Error('This will not run')

        } catch (e) {
            expect(e).to.be.instanceOf(Error)
            expect(e.message).to.eql('Invalid input. Batch must be an array of ships')
        }

    }
})


it('getTileImageInTileId', async function() {
    console.log(qr.stub)
    const TileImageInTileId = await qr.getTileImageInTileId(5041);
    assert.isString(TileImageInTileId);
    assert.deepEqual(TileImageInTileId, "43F7.png")
})


it('readRecentPositionsInGivenTile', async function() {
    console.log(qr.stub)
    const shipPositions = await qr.readRecentPositionsInGivenTileId();
    assert.isArray( shipPositions );

})

it('readLastFivePositionsOfMMSI', async function() {
    console.log(qr.stub)
    const shipPositions = await qr.readLastFivePositionsOfMMSI();
    assert.isArray( shipPositions, "Output is array" );
    assert.lengthOf(shipPositions, 5, "Output is of length 5")
})


it('deleteOldAISMessage', async function() {
    console.log(qr.stub)
    const insertedMessages = await qr.deleteOldAISMessage();
    assert.isNumber( insertedMessages );
    assert.deepEqual(insertedMessages, 1)
})

it('readAllPortsMatchingName', async function() {
    console.log(qr.stub)
    const portsMatchingName = await qr.readAllPortsMatchingName('Nyborg');
    assert.isArray( portsMatchingName );
    assert.deepEqual(portsMatchingName, [
        {"id" : 381, "name" : 'Nyborg', 'country' : 'Denmark', 'longitude' : 10.810833, 'latitude' : 55.298889 ,'MapView1_Id' : 1, 'MapView2_Id' : 5331, 'MapView3_Id' : 53312},
        {"id" : 4970, "name" : 'Nyborg', 'country' : 'Denmark', 'longitude' : 10.790833,'latitude' : 55.306944,'MapView1_Id' : 1, 'MapView2_Id' : 5331, 'MapView3_Id' : 53312}
    ])
})

it('readShipMostRecentPositionsWithID', async function() {
    console.log(qr.stub)
    const shipPositions = await qr.readShipMostRecentPositionsWithID();
    assert.isArray( shipPositions );
    assert.deepEqual(shipPositions, [])
})

it('readShipMostRecentPositionsWithPort', async function() {
    console.log(qr.stub)
    const shipPositions = await qr.readShipMostRecentPositionsWithPort();
    assert.isArray( shipPositions );
    assert.deepEqual(shipPositions, [])
})

it('readShipMostRecentPositionByMMSI', async function() {
    console.log(qr.stub)
    const shipPosition = await qr.readShipMostRecentPositionByMMSI(440007100);
    assert.isArray( shipPosition );
    assert.deepEqual(shipPosition, [])
})

it('readPermanentOrTransientVesselInformation', async function() {
    console.log(qr.stub)
    const vesselInformation = await qr.readPermanentOrTransientVesselInformation(440007100, 5275569, 6287207);
    assert.isArray(vesselInformation);
    assert.deepEqual(vesselInformation, [])
})

it('readAllMostRecentShipPositions', async function() {
    console.log(qr.stub)
    const shipPositions = await qr.readAllMostRecentShipPositions();
    assert.isArray( shipPositions );
})

it('findBackgroundMapTilesContained', async function() {
    console.log(qr.stub)
    const backgroundMapTiles = await qr.findBackgroundMapTilesContained(5037);
    assert.isArray(backgroundMapTiles );

})

it('readAllPositionsInTileOfPort', async function() {
    console.log(qr.stub)
    const shipPositions = await qr.readAllPositionsInTileOfPort('Nyborg', 'Denmark');
    assert.isArray(shipPositions);
})

