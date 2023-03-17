# Overview 

For Complete documentation and Quick Start guide visit [API Development Documentation](https://precision-sustainable-ag.atlassian.net/wiki/spaces/DST/pages/196476929/API+Development)

# Run Locally 

## Docker & Hot Refresh

copy .env.example to .env

```
npm run docker
```

## No-Docker & Hot Refresh

**You will need to install PostgreSQL and have it running locally, or connect to remove server**

- copy .env.example to .env
- configure database credentials

```
npm run dev
```
