# Add plugin to WP admin panel

In WordPress Admin Panel go to Pages, add new, enter title "DAO",
create the shortcode block and put this code in there:

```php
[daofactory_app template="light_template" token_address="0x92648e4537cdfa1ee743a244465a31aa034b1ce8" token_symbol="SWAP" token_decimals="18" network_id="56"]
```

Where:

1) `token-address`, `token-symbol`, `token-decimals`: address and variables of your erc20 contract;

2) `network_id`  is chainID from this list www.chainlist.org;
3) `template` : you can set "dark_template" or use "light_template" by default.
