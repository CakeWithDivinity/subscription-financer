# subscription-financer

This project is an online tool for managing periodic payments like subscriptions and insurances.
It accumulates the average amount of money being withdrawn from your bank account, so that
you can ensure enough money is deposited on it. I personally use this to have a seperate
bank account where all of my periodic payments are being withdrawn from. Once per month I deposit
money on that bank account. This helps making insurances cheaper, by paying them in yearly bills
instead of monthly ones.

I originally created this project for a paper, which we had to write in university. This project is
still under active development however and is used by a few friends of mine, my family and some
people that follow the same finance plan like me. So feel free to use this or contribute to the
project by creating an issue or pull request.

## Setup

```bash
# setup a postgres database with the included docker-compose file
# (you can skip this step if you start your database in a different way)
docker compose up -d

# copy the `.env.example` into `.env` and edit it to your needs
cp .env.example .env

# install necessary dependencies
pnpm install

# migrate the database to reflect the prisma schema
pnpm db:migrate

# start the application
pnpm dev
```

## Contributing

Raise an issue if you have feature requests, found a bug or got any other questions.

Create a pull request if you want to contribute code. The github action will validate
it against this projects code standard

It is recommended to use the following tools for development:

- [ESLint](https://eslint.org/)
- [Prettier](https://prettier.io/)
