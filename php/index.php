<?php

require_once 'vendor/autoload.php';
require_once 'functions.php';

use Elliptic\EC;

// $priv_hex = '61657102d77d01ffd76d8c90061e1f189831b99f6568b54788efdc88a4af224c';

$code = '';
if ('POST' === $_SERVER['REQUEST_METHOD']) {
    $ec = new EC('secp256k1');
    $key = $ec->keyFromPrivate($_POST['key']);
    $code = '0x'.sign($key, $_POST['nonce'], $_POST['amount']);
}

?>
<html>
  <head>
    <link href="https://cdnjs.cloudflare.com/ajax/libs/bulma/0.7.1/css/bulma.min.css" rel="stylesheet" type="text/css" />
  </head>
  <body>
    <section class="section">
      <div class="container">
        <h1 class="title">Generate redeemable code</h1>

        <form action="" method="POST">
          <div class="field">
            <label class="label">Key</label>
            <div class="control">
              <input class="input is-success is-medium" type="text" placeholder="Private key in hex" name="key" value="<?php echo $_POST['key'] ?? ''; ?>">
            </div>
          </div>

          <div class="field">
            <label class="label">Nonce</label>
            <div class="control">
              <input class="input is-success is-medium" type="text" placeholder="A random number" name="nonce" value="<?php echo $_POST['nonce'] ?? ''; ?>">
            </div>
          </div>

          <div class="field">
            <label class="label">Amount</label>
            <div class="control">
              <input class="input is-success is-medium" type="text" placeholder="Number of tokens" name="amount" value="<?php echo $_POST['amount'] ?? ''; ?>">
            </div>
          </div>

          <div class="field">
            <input type="submit" class="button is-primary" value="Generate"/>
          </div>
<?php if ($code): ?>
          <article class="message is-success">
            <h1 class="title">Redeemable code:</h1>
            <div class="message-body"><?= $code; ?></div>
          </article>
<?php endif; ?>
    </form>
  </section>
  </body>
  </body>
</html>
