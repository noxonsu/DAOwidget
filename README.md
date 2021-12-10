## Enable trended feature for your ERC20 token - Governance and proposals 
With a given value of tokens, anyone can create proposals. Another stakeholders can vote for proposals without spend money on gas. 

## Elements
- Metamask supported
- "Create proposal" form  
- "Vote for proposal" (нужен скрин)
- "List of votes" https://screenshots.wpmix.net/chrome_xKrom1ZT5ZxQdhRuReoDlya4G2E8P5mY.png 
- Your tokenholders can create proposals and vote for free (without paying for gas)
- All proposals have Voting Period (specified and adjusted by creator or tokenHolders) it could be specified by creator or by token holders through proposal.
- We use snapshot.org API
- you required ENS domain (100-200$ costs). but you can use shared domain by default (don't worry, only your proposals will showed in the list).  
- MetaMask supported
- ERC20, BEP20, and other EVM blochains are supported

## For whom: 
- Community Collectives
- Developer Collectives
- Worker Collectives
- Art Collectives
- Social Media
- Metaverses / Virtual Worlds
- Asset Management
- Venture Capital
- Insurance
- Trust Funds
- Company / Project Fundraising
- Fan Ownership
- Freeholder / Co-Living / Nomad Communities
- Media / Entertainment
- Politics

# Installation

Put the code on your website 
```<div
      id="daofactory_app"
      data-ens="onout.eth"
      data-network="137"
      data-token-address="0xd9b064e78199598e9435f9158be1f28b4db422a3"
      data-token-symbol="XDCK"
      data-token-decimals="18"
      data-color-template="light_template"
    ></div>

<script src='https://noxonsu.github.io/daofactory/build/static/js/main.js'></script>
<link href="https://noxonsu.github.io/daofactory/build/static/css/main.css" rel="stylesheet" />```
```
Or use shortcode ```[daofactory_app ens_space="ens.eth" template="light_template"]```

if you have registered ens domain (https://ens.domains/), use this shortcode (firstly create your space at https://snapshot.org/#/setup)
```
[daofactory_app ens_space="yourdomain.eth"]
```

for dark theme use ```[daofactory_app ens_space="ens.eth" template="light_template"]```
