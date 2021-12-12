var assert = require('chai').assert;
var qr = require("../core_functions.js");
const {stub} = require("../core_functions");


qr.stub=true;




it('insertAISMessage', async function() {
    console.log(qr.stub)
    const insertedMessages = await qr.insertAISMessage();
    assert.isNumber( insertedMessages );
    assert.deepEqual(insertedMessages, 1);
})



it('readRecentPositions', async function() {
    console.log(qr.stub)
    const shipPositions = await qr.readRecentPositions();
    assert.isArray( shipPositions );
    assert.deepEqual(shipPositions, [])
})

it('readRecentPositionsInGivenTile', async function() {
    console.log(qr.stub)
    const shipPositions = await qr.readRecentPositionsInGivenTile();
    assert.isArray( shipPositions );
    assert.deepEqual(shipPositions, [])
})

it('readLastFivePositionsOfMMSI', async function() {
    console.log(qr.stub)
    const shipPositions = await qr.readLastFivePositionsOfMMSI();
    assert.isArray( shipPositions, "Output is array" );
    assert.lengthOf(shipPositions, 5, "Output is of length 5")

})
