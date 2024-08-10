## Getting Started

## Require

Before run the serve, take a look at the following resources:

- [Python v3.12.4 +](https://www.python.org/downloads/) - Python.
- [Node v21.6.1 +](https://nodejs.org/en) - Node.

library Server:

- [Flask]
- [FlaskCors]
- [dotEnv]

library Scrapping:

- [Request]
- [BeautifulSoup4]

Configure FrontEnd:

```bash
cd FrontEnd
cp .env.example .env
yarn install
```

Then configure environment for the frontend

```bash
# run server
flask run

# run FE
yarn dev
```

## DEMO

<div className="grid gap-5 px-5">
  <span className="flex flex-col gap-1">
    <h1>Home:</h1>
    <img
      src="./neko_stream_demo/neko_stream_home.png"
      alt="HOME"
    />
  </span>

  <span className="flex flex-col gap-1">
    <h1>Ongoing All:</h1>
    <img
      src="./neko_stream_demo/neko_stream_ongoing_all.png"
      alt="HOME"
    />
  </span>

  <span className="flex flex-col gap-1">
    <h1>Details:</h1>
    <img
      src="./neko_stream_demo/neko_stream_details.png"
      alt="HOME"
    />
  </span>

  <span className="flex flex-col gap-1">
    <h1>Stream:</h1>
    <img
      src="./neko_stream_demo/neko_stream_stream.png"
      alt="HOME"
    />
  </span>

  <span className="flex flex-col gap-1">
    <h1>Dowloads:</h1>
    <img
      src="./neko_stream_demo/neko_stream_downloads.png"
      alt="HOME"
    />
  </span>
</div>;

## NOTE

<strong>I made this website just for fun and has no specific purpose.</strong><br/>Before running the BE or FE server, make user all library and your .env or venv have done to setup first. enjoy it ^-^.
