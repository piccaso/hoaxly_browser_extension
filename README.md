# Hoaxly Browser Extension

## Prerequisites

* [node + npm](https://nodejs.org/)

tested with node v10 using docker
```sh
docker run --rm -it -v "${PWD}:/src" -w /src node:10 bash
```

## Project Structure

* src: source files (typescript, vue)
* dist: Chrome Extension directory
* dist/js: Generated JavaScript files

## Setup

```
npm install
```

## Development

```
npm run watch
```

## Build

```
npm run build
```

## Load extension to chrome

Load `dist` directory

