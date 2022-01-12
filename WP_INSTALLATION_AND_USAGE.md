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

## Usage

Once you have added the shortcode to the page any user who connected with Metamask wallet or via walletconnect provider can use follow actions:

1) Create proposal:
    a) Click on "New proposal" link in header;
    b) Fill the title (require) and the body (optional);
    c) Set vote duration and click on "Publish" button;
    d) Sign the publication request in selected wallet;
2) Voting in proposal:
    a) Enter in selected proposal;
    b) If proposal is active cast your vote;
    c) Click on "Vote" button and check your vote option;
    d) If all is okay and you have voting power click on "Vote" button in modal window.
