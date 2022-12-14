
# **Notifica** (Event tracker)

Live deployment: https://notifica-engineering.netlify.app/

[![Netlify Status](https://api.netlify.com/api/v1/badges/c9c96d64-0545-4602-98a7-64ee0828ed53/deploy-status)](https://app.netlify.com/sites/notifica-engineering/deploys)

## Description

_**Notifica**_ is a platform that simulates how an engineering environment might receive and handle quickly-incoming notifications on the go, thus, the app is explicitel made with a mobile-first perspective. The goal is to provide a **visual** feedback to the operator so they can quickly choose where their attention is needed the most. 


![image example](https://user-images.githubusercontent.com/66971876/207643635-41e2bba3-1aec-4a49-92d1-6c75ec32b4a4.gif)

## Tools

This repository holds the full stack that makes the application.

# Front-end

- JavaScript React
- Material Library (Styled components)
- Deployment through Netlify

# Back-end

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


