"use strict";

const { MarkovMachine } = require("./markov")
let machine;
let machineWithBranches;

beforeAll(function(){
  const text = "The cat in the hat.";
  machine = new MarkovMachine(text);

  const textWithBranches = "the cat in the hat";
  //the hat
  //the hat the
  machineWithBranches = new MarkovMachine(textWithBranches);

})

describe("getChains", function(){

  test("test with no branches, one possible next word", function(){
    let chain = machine.getChains();
    expect(chain).toEqual({
        "The": ["cat"],
        "cat": ["in"],
        "in": ["the"],
        "the": ["hat."],
        "hat.": [null],
    })
  });

  test("test with branches, more than one possible next word", function(){
    let chain = machineWithBranches.getChains();
    expect(chain).toEqual({
        "the": ["cat", "hat"],
        "cat": ["in"],
        "in": ["the"],
        "hat": [null],
    })
  });
})


//test for text with no branches, output always the same
//output is string
//check that next word is valid

describe("getText", function(){

  test("test with no branches, output always the same", function(){
    let randomText = machine.getText();
    expect(randomText).toEqual("The cat in the hat.");
  })

  test("test with branches, check validity", function(){
    let randomText = machineWithBranches.getText();
    let chain = machineWithBranches.chains;
    let randomTextArray = randomText.split(" ");

    for(let i = 0; i < randomTextArray.length-1; i++){
      // expect(randomTextArray[i+1] in chain[randomTextArray[i]])
      expect(chain[randomTextArray[i]]).toContain(randomTextArray[i+1]);
    }

    // expect(randomText).toContain("the");
  })
})
