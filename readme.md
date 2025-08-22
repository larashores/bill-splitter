# bill-splitter

- https://larashores.github.io/bill-splitter



This React app is used for splitting a bill (e.g. a restaurant bill) between multiple people. The
bill, including various fees (e.g. tax and tip) will be split proporitionally based on how much
each person ordered. For example, one can purchase an expensive wine at dinner and the app will
split the bill such that that person can pay exactly their share, no more, no less.

## Query Parameters

The following query parameters can be used to prefill the app with data. Each query parameter
represents a cell in a table. A parameter can be listed multiple times to represent multiple rows.

###  People Table:
  - `people.name` - Name of each person (can be used multiple times)

### Items Table:
  - `items.name` - Name of the item
  - `items.amount` - Cost of the item
  - `items.people` - Comma-separated list of people sharing this item

### Fees Table:
  - `fees.name` - Name of the fee
  - `fees.amount` - Amount of the fee
  - `fees.type` - Type of fee (`percent` or `flat`)

#### Example

The following example query string will prefil the app with multiple rows of example data.

- https://larashores.github.io/bill-splitter?people.name=Lara&people.name=Bon&items.name=Burger&items.amount=10&items.people=Lara&items.name=Fries&items.amount=5&items.people=Lara,Bon&fees.name=Tax&fees.amount=1.24&fees.type=flat&fees.name=Tip&fees.amount=20&fees.type=percent

## Installation

This package uses Typescript and Node. To install the package locally for development, follow
the following instructions.

###  Windows

1. Install NVM for Windows
    - https://github.com/coreybutler/nvm-windows
2. Install Node/NPM
    - `nvm install lts`
    - `nvm use [VERSION]`
3. Install Package Dependencies
    - `npm.cmd install`
