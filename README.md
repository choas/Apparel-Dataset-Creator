# Apparel Dataset Creator

Download the dataset from [Apparel classification with Style](https://data.vision.ee.ethz.ch/cvl/lbossard/accv12/).

Extract it into the project folder:

```sh
tar xf fashion-data.tar.bz2
```

... and run:

```sh
node create_trainingsset.js
```

This creates a fashion_data folder with the following structure and copies the Apparel classification with Style images into the training and test folder.

```text
fashion_data
├── test
│   ├── blouses
│   ├── cloak
│   ├── coat
│   ├── jacket
│   ├── jersey__t-shirt__tee_shirt
│   ├── long_dress
│   ├── polo_shirt__sport_shirt
│   ├── robe
│   ├── shirt
│   ├── short_dress
│   ├── suit__suit_of_clothes
│   ├── sweater
│   ├── undergarment__upper_body
│   ├── uniform
│   └── vest__waistcoat
├── training
│   ├── blouses
│   ├── cloak
│   ├── coat
│   ├── jacket
│   ├── jersey__t-shirt__tee_shirt
│   ├── long_dress
│   ├── polo_shirt__sport_shirt
│   ├── robe
│   ├── shirt
│   ├── short_dress
│   ├── suit__suit_of_clothes
│   ├── sweater
│   ├── undergarment__upper_body
│   ├── uniform
│   └── vest__waistcoat
└── validation
    ├── blouses
    ├── cloak
    ├── coat
    ├── jacket
    ├── jersey__t-shirt__tee_shirt
    ├── long_dress
    ├── polo_shirt__sport_shirt
    ├── robe
    ├── shirt
    ├── short_dress
    ├── suit__suit_of_clothes
    ├── sweater
    ├── undergarment__upper_body
    ├── uniform
    └── vest__waistcoat
```