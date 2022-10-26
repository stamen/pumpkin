#!/usr/bin/env node
const { Geometry } = require("wkx");
const readline = require('readline');


const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

const allParts = [];

rl.on('line', (line) => {
  let features = JSON.parse(line);
  if (!("features" in features)) {
    features = [features];
  } else {
    features = features.features
  }
  features.forEach(feature => {
    allParts.push(feature.geometry.coordinates.map((part) => {
      return part.map((c) => {
        return c.map((i) => {
          return Math.round(i * 1000) / 1000;
        });
      });
    }));
  });
});

rl.once('close', () => {
    const single =  {
      type: "MultiPolygon",
      coordinates: allParts
    };
    console.log(encodeURIComponent(Geometry.parseGeoJSON(single)
      .toTwkb()
      .toString("base64")))
});

