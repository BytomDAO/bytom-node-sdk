# Bytom Node.js SDK

## Usage

### In your code

```
const bytom = require('bytom-sdk')
const url = 'http://localhost:9888'

const client = new bytom.Client(url)
```

## Interaction with bytom

### Acount

```javascript
client.account.listAccounts().then(resp => {
  console.log(resp.data)
})
```
