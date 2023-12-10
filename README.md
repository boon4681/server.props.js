# server.props.js

Serialize / Deserialize minecraft server.properties without losing comments in files.
My standard is no test no bug 😊. Everything is fine.

## Serialize

```js
const input = fs.readFileSync('./server.properties').toString()
serialize(input)
/*
Map {
    'key': 'value',
    ...
}
*/
```

## Derialize

```js
const input = fs.readFileSync('./server.properties').toString()
serialize(input).toString()
/*
key=value
...
*/
```