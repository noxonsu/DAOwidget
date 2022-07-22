# Add plugin to the WP app

You have 2 way to add plugin on your WP app:

1) In WordPress Admin Panel go to Pages, add new, enter title "DAO", create the **shortcode** block and put this code in there:

    ```php
    [daofactory_app template="light_template" token_address="0x92648e4537cdfa1ee743a244465a31aa034b1ce8" token_symbol="SWAP" token_decimals="18" network_id="56"]
    ```

    Where:

    - `token_address`, `token_symbol`, `token_decimals`: address and variables of your erc20 contract, you can find this data in explorer (Ethereum - etherscan.io, BSC - bscscan.com);
    - `network_id`  is chainID from this list www.chainlist.org (Ethereum - "1", BSC - "56");
    - `template` : you can set "dark_template" or use "light_template" by default.

    Additional properties:

    - `ens_space` is ENS domain name. By default we use own, but it doesn't matter.
    - `hide_service_link` - setting "true" if you want hide service link.
    - `required_amount_to_publish` is required tokens amount to publish proposal, by default 5.
    - `required_amount_to_vote` - required tokens amount to vote for proposal, by default 1.

2) Simple way - with **Dao Factory option** in WP admin sidebar:

    1) Click on "Add New";
    2) Fill Title;
    3) Choose Blockchain;
    4) Fill token address and click on "Fetch" to get token info;
    5) Set another optional settings and click "Publich" button.

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
3) Delete proposal:
    a) Enter in selected proposal;
    b) Click on "delete" button (only ENS admins or proposal creator you can delete the proposal).
