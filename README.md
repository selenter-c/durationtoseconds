# Duration To Seconds
This simple library adds one new function that will help you easily convert the specified time as a String into seconds.
The functions that this library adds:

```js
// Function for converting string to number
// @str - String which will be converting to seconds
// Function returns:
//    1: Integer; (Your time in seconds)
IsoDurationToSeconds(str)
```

Here are some examples of how these functions work:
```js
let data = IsoDurationToSeconds("10h4min2sec")

console.log(data)
/*
    OUTPUT:
      36242
*/
```
