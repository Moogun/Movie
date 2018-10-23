# Movie-Rental-REST-API

## Test 

## error log
1. UncaughtException Error

log/exceptions.log
```
2018-10-23 15:44:20 [31merror[39m: uncaughtException: an error thrown for a test
Error: an error thrown for a test
    at Timeout.setTimeout [as _onTimeout] (/Users/moogunjung/Downloads/movie/index.js:18:11)
    at ontimeout (timers.js:498:11)
    at tryOnTimeout (timers.js:323:5)
    at Timer.listOnTimeout (timers.js:290:5)
```

startup/logging.js
```
exceptionHandlers: [
    new transports.File({
        filename: exceptions.log,
    })
  ]
```

2. Promise Rejection Error

log/results.log
```
2018-10-23 15:44:20 [31merror[39m:  Promise rejection error thrown for a test
```

startup/logging.js
```
...
format: format.combine(format.colorize(),
    format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss'
    }),
    format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`)
    // format.json()
),
```

3. Async Error in the API Request Pipeline

routes/genres.js
```
router.get('/', async (req, res, next) => {
    // throw new Error('genres / error thrown')
    const genres = await Genre.find({})
    res.send(genres)
})

```

middlewares/error.sj
```
module.exports = function (err, req, res, next) {
    winston.error(err.message, err)
    res.status(500).send('something failed')
    next()
}
```
