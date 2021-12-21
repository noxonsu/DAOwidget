## Add this HTML widget to your site to enable trended feature for your ERC20 token - Governance and proposals 

See the video:  https://drive.google.com/file/d/1R1ddQRevR7-gbe-87BMr0hKjbwf3zny-/view


With a given value of tokens, anyone can create proposals. Another stakeholders can vote for proposals without spend money on gas. Put the HTML code on your website. Upload files to FTP server to the folder with html page where you want to put the widget. Then open your HTML file and add this HTML: 

```
<div
      id="daofactory_app"
      data-network="137"
      data-token-address="0xd9b064e78199598e9435f9158be1f28b4db422a3"
      data-token-symbol="XDCK"
      data-token-decimals="18"
      data-color-template="dark_template"
    ></div>

<script src='./build/static/js/main.js'></script> 
<link href="./build/static/css/main.css" rel="stylesheet" /> 
```

Where 
`data-network` is chainID from this list https://chainlist.org/ 

`data-token-address`, `data-token-symbol`, `data-token-decimals`: address and variables of your erc20 contract

`data-color-template`: dark_template or light_template

## Features
- Metamask supported
- "Create proposal" form  
- "Vote for proposal" 
- "List of votes" 
- Your tokenholders can create proposals and vote for free (without paying for gas)
- All proposals have Voting Period (specified and adjusted by creator or tokenHolders) it could be specified by creator or by token holders through proposal.
- We use snapshot.org API
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

