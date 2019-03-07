# pl61-data-generator-and-seeder
Generates fake data for seeding into MongoDB or MySQL instances, 10 million primary records with ~95 million secondary records.

MongoDB
  - data generation and insertion time (2 workers): ~80 min
  - query time (1 record from 10 million primary): ~30 ms

MySQL
  - data generation and insertion time (4 workers): ~25 min
  - query time (7-12 records from 95 million secondary): ~50 ms

## Related Projects

  - https://github.com/hrr36-sdc-t2/pl61-thomas-hsu-slideshow-module

## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)

## Usage

```sh
seed-mongo <items per worker (2 workers)> <batch insert size>
seed-mysql <items per worker (4 workers)> <batch insert size>

query-mongo <column> <value>
query-mysql <column> <value>
```
Seed scripts accept optional arguments. Default settings insert a total of 10 million primary records and ~95 million secondary records in batch sizes of 1000.

Query script accept optional arguments. Default uses a predetermined query. For MongoDB, query is on primary records. For MySQL, query is on secondary records.

Respective databases are created if do not exist when seed scripts are run.

## Requirements

  - Node 11.6.0
  - MongoDB 4.0
  - MySQL 8.0

## Development

All data inserted directly from memory in batches without writing to file. Fake strings generated by faker.lorem.sentence.

### Installing Dependencies

From within the root directory:

```sh
npm install
```
