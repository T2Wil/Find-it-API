[![Build Status](https://travis-ci.org/T2Wil/Find-it-API.svg?branch=develop)](https://travis-ci.org/T2Wil/Find-it-API)

# Find-it-API
REST API endpoint that provides auto-complete suggestions for large cities.

## ENDPOINTS
* GET /suggestions/:q/:latitude?/:longitude?

### Backend language
```
*Javascript*
```
### Backend server and framework
```
 *NodeJS*  *Express*
 ```
``
### Testing framework and assertion library
```
 *Mocha*  *chai*
 ```
``
### Deployed on
```
Heroku
```
## Requirements
```
 [Node Package Installer - NPM] 
```

## Installing
After cloning the repo, cd to the base directory then type the command
```
> npm install
```
## Run application
cd to the base directory then type the command
```
> npm run start:server
```
open your favorite browser (Recommended: Google chrome)
make a search by only city name
```
> http://localhost:3000/suggestions/cityName
```
make a search by city name , latitude and longitude
```
> http://localhost:3000/suggestions/cityName/latitude/longitude
```
## Test application
cd to the base directory then type the command
```
> npm run start:test
```
## Current version

**Version 1.0.0**

