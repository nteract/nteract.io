# nteract.io

Welcome! This is the main site for nteract!

We serve an express app that does [server rendered react using next](https://zeit.co/blog/next) and proxy `https://nteract.github.io` for all other routes. 😁

## Development

```
git clone https://github.com/nteract/nteract.io
cd nteract.io
npm install
npm run dev
```

## Deployment

We run [nteract.io](https://nteract.io/) on [now.sh](https://zeit.co/now). You'll need `now` to deploy:

```
npm install -g now
```

To do a test deployment run:

```
now
```

It should look like this:

```
$ now
> Deploying ~/code/src/github.com/nteract/nteract.io
> Using Node.js 7.6.0 (default)
> Ready! https://nteractio-tzdjehuhzz.now.sh (copied to clipboard) [928ms]
> Upload [====================] 100% 0.0s
> Sync complete (952B) [1s]
> Initializing…
> Building
> ▲ npm install
> ⧗ Installing:
>  ‣ express@^4.15.0
>  ‣ http-proxy@^1.15.1
>  ‣ next@^2.0.0-beta
>  ‣ react@^15.4.2
>  ‣ react-dom@^15.4.2
> ▲ npm install
> ⧗ Installing:
>  ‣ http-proxy@^1.15.1
>  ‣ express@^4.15.0
>  ‣ next@^2.0.0-beta
>  ‣ react@^15.4.2
>  ‣ react-dom@^15.4.2
> ✓ Installed 544 modules [9s]
> ▲ npm run build
> > nteract.io@1.0.0 build /home/nowuser/src
> > next build
> (node:94) DeprecationWarning: loaderUtils.parseQuery() received a non-string value which can be problematic, see https://github.com/webpack/loader-utils/issues/56
> parseQuery() will be replaced with getOptions() in the next major version of loader-utils.
> ▲ npm start
> > nteract.io@1.0.0 start /home/nowuser/src
> > NODE_ENV=production node index.js
> Deployment complete!
```

If you have the access/ability, you'll want to verify the site is working then run:

```
now alias <addressFromAbove> https://nteract.io
```
