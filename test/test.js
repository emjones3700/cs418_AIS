var assert = require('chai').assert;
var qr = require("../core_functions.js");
const {stub} = require("../core_functions");



it('insertAISMessage', async function() {
    console.log(qr.stub)
    const insertedMessages = await qr.insertAISMessage();
    assert.isNumber( insertedMessages );
    assert.deepEqual(insertedMessages, 1);
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

