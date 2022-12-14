
The alert data is generated using the Chance library, and has a schema as follows:

```
{
    key: chance.guid(),
    title: chance.sentence({ words: 5 }),
    severity: chance.integer({ min: 1, max: 5 }),
    type: chance.pickone(["mechanical", "software", "human"]),
    isPrediction: chance.pickone([true, false]),
    predictionConfidence: chance.integer({ min: 70, max: 99 }),
    description: chance.paragraph({ sentences: 2 }),
    time: new Date()
}
```

/
