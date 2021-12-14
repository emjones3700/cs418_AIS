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
    const shipPositions = await qr.deleteOldAISMessage();
    assert.isArray( shipPositions );
    assert.deepEqual(shipPositions, [])
})

it('readAllPortsMatchingName', async function() {
    console.log(qr.stub)
    const shipPositions = await qr.readAllPortsMatchingName();
    assert.isArray( shipPositions );
    assert.deepEqual(shipPositions, [])
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

