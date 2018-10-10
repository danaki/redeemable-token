<?php

use BN\BN;
use Elliptic\EC\KeyPair;
use kornrunner\Keccak;

function pad($x)
{
    return str_pad($x, 64, '0', STR_PAD_LEFT);
}

function tohex($arr)
{
    return implode(array_map(
        function ($v) {
            return str_pad(dechex($v), 2, '0', STR_PAD_LEFT);
        },
        $arr
    ));
}

function sign(KeyPair $key, int $nonce, int $amount)
{
    $nonce = new BN($nonce);
    $amount = new BN($amount);

    $nonce_arr = $nonce->toArray('be', 16);
    $amount_arr = $amount->toArray('be', 16);

    $message = ''
        .call_user_func_array('pack', array_merge(['C*'], $nonce_arr))
        .call_user_func_array('pack', array_merge(['C*'], $amount_arr));

    $hash = Keccak::hash("\x19Ethereum Signed Message:\n".strlen($message).$message, 256);

    $s = $key->sign($hash);

    return ''
        .tohex($nonce_arr)
        .tohex($amount_arr)
        .pad($s->r->toString('hex'))
        .pad($s->s->toString('hex'))
        .dechex($s->recoveryParam + 27);
}
