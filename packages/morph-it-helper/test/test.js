var MorphItHelper = require('../dist/index.js').MorphItHelper;
var assert = require('assert');

const mih = new MorphItHelper();

const testCasesNouns = [
  ['cameriera', 'cameriera'],
  ['camerieri', 'cameriere'],
  ['uomini', 'uomo'],
  ['caffè', 'caffè'],
  ['totoxxx', null],
];
const testCasesAdj = [
  ['azzurro', 'azzurro'],
  ['azzurre', 'azzurro'],
  ["bell'", 'bello'],
  ['antiche', 'antico'],
  ['totoxxx', null],
  // past participle
  ['istruite', 'istruito'],
  ['istruita', 'istruito'],
  ['educato', 'educato'],
  ['educati', 'educato'],
  // present participle
  ['esigente', 'esigente'],
  ['esigenti', 'esigente'],
];

describe('morph-helper', function() {
  describe('#getNoun()', function() {
    for (var i = 0; i < testCasesNouns.length; i++) {
      const testCase = testCasesNouns[i];
      it(`${testCase[0]} => ${testCase[1]}`, function() {
        assert.equal(mih.getNoun(testCase[0]), testCase[1]);
      });
    }
  });

  describe('#getAdj()', function() {
    for (var i = 0; i < testCasesAdj.length; i++) {
      const testCase = testCasesAdj[i];
      it(`${testCase[0]} => ${testCase[1]}`, function() {
        assert.equal(mih.getAdj(testCase[0]), testCase[1]);
      });
    }
  });

  describe('#isAdj()', function() {
    it(`azzurre`, function() {
      assert(mih.isAdj('azzurre'));
    });
    it(`adj not found`, function() {
      assert(!mih.isAdj('azzurreyyy'));
    });
  });

  describe('#isNoun()', function() {
    it(`camerieri`, function() {
      assert(mih.isNoun('camerieri'));
    });
  });
});