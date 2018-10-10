# Redeemable Token

## Pros

* Allows to issue tokens (for example loyality points) to users without contacting blockchain or forcing users to have a wallet
* Redeemed code assigns desired amount of tokens to redeem() caller
* Analogue of a scratchcard that users can trade for money without contacting blockchain (if code is not redeemed)
* Minted tokens can be bought back thus users receive cash back (in case of loyalty points) or exchanged for goods (offline or online business)

## Cons

* Someone (miners) can listen for redeem() transactions, replay and steal tokens. This is a proof of concept after all

## Requirements

* ganache
* php
* composer
* node
* truffle

## Installation

```
$ npm install
$ truffle compile
$ cd php; composer install; php -S localhost:8000 & ; cd ..
```

## Demo

* Run `node abi.js`, save ABI somewhere, we will use it later
* Run `truffle develop`:
  * First private key is the contract's owner private key, save it somewhere
  * Second private key has some free ether balance to play with, save it too. Save corresponding 2nd address as well, this is Your address.
* Enter "deploy", in the output find "Deployed RedeemableToken.address:" string, save deployed contract address somewhere
* Open browser http://localhost:8000
* Paste the contract's owner private key (first one), enter nonce (any number in order, for example 1), enter amount of tokens for redeem (example 10)
* Click "Generate", get "Redeemable code" string, save it somewhere
* Go to https://www.myetherwallet.com/
  * Choose "Add Custom Network / Node" from a dropbox in the corner, enter "http://127.0.0.1", port 8545 or 9545 (find exact URL in "truffle develop" output)
  * Click "Contracts" menu item
  * Paste RedeemableToken contract address to Address input, paste ABI in corresponding textarea
  * Choose "balanceOf" from dropbox, enter Your address, see balance (it's zero :)
  * Choose "redeem", enter Redeemable code to input, Metamask will ask you to access your wallet, choose Private key, paste the second private key, click "Unlock" then click "Write"
  * Choose "balanceOf" from dropbox again, enter Your address, see balance (it should be equal to desired amount of tokens)