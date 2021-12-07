var assert = require('chai').assert;
var qr = require("../core_functions.js");


describe('Get all vessels', function(){
    it('', async function() {
        const vessels = await qr.getVessels;
        assert.isArray( vessels );
        assert.deepEqual(vessels, [
            { "flag" : "Angola", "vessel_count" : 207, "avg_tonnage" : 1269 },
            { "flag" : "Japan", "vessel_count" : 11944, "avg_tonnage" : 3320 },
            { "flag" : "Samoa", "vessel_count" : 17, "avg_tonnage" : 900 }
        ])
    })
});
