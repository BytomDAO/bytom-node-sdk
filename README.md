# Bytom Node.js SDK

## Usage

### In your code

```
const bytom = require('bytom-sdk')

const client = new bytom.Client()
```

## Interaction with bytom

### Acount

```javascript
client.account.listAccounts().then(resp => {
  console.log(resp.data)
})
```
