
pragma solidity ^0.4.24;

import "openzeppelin-solidity/contracts/math/SafeMath.sol";
import "openzeppelin-solidity/contracts/token/ERC20/StandardToken.sol";
import "openzeppelin-solidity/contracts/ownership/Ownable.sol";

contract RedeemableToken is StandardToken, Ownable {
    using SafeMath for uint256;

    mapping(uint128 => bool) redeemed;

    event Mint(address indexed to, uint128 value);

    constructor() public Ownable() {
        totalSupply_ = 0;
    }

    function recover(bytes _code) public view returns (address) {
        (bytes32 message, bytes32 r, bytes32 s, uint8 v) = unpackCode(_code);

        return ecrecover(keccak256(abi.encodePacked("\x19Ethereum Signed Message:\n32", message)), v, r, s);
    }

    function redeem(bytes _code) public {
        (bytes32 message, bytes32 r, bytes32 s, uint8 v) = unpackCode(_code);

        require(ecrecover(keccak256(abi.encodePacked("\x19Ethereum Signed Message:\n32", message)), v, r, s) == owner);

        (uint128 nonce, uint128 amount) = unpackMessage(message);

        require(! redeemed[nonce]);

        totalSupply_ = totalSupply_.add(amount);
        balances[msg.sender] = balances[msg.sender].add(amount);
        redeemed[nonce] = true;

        emit Mint(msg.sender, amount);
    }

    function unpackCode(bytes _data) public view returns (bytes32 message, bytes32 r, bytes32 s, uint8 v) {
        /* solium-disable-next-line security/no-inline-assembly */
        assembly {
            message := mload(add(_data, 32))
            r := mload(add(_data, 64))
            s := mload(add(_data, 96))
            v := byte(0, mload(add(_data, 128)))
        }
    }

    function unpackMessage(bytes32 _data) public view returns (uint128 nonce, uint128 amount) {
        nonce = uint128(_data >> 128);
        amount = uint128(_data & 0x00000000000000000000000000000000ffffffffffffffffffffffffffffffff);
    }
}
