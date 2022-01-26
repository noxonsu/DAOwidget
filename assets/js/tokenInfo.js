(() => {
  const loadScript = (src) => new Promise((resolve, reject) => {
    const script = document.createElement('script')

    script.onload = resolve
    script.onerror = reject
    script.src = src

    document.head.appendChild(script)
  })
  loadScript('https://cdnjs.cloudflare.com/ajax/libs/web3/1.3.1/web3.min.js')

  const baseTokenAbi = [
    {
      constant: true,
      inputs: [],
      name: "decimals",
      outputs: [
        {
          name: "",
          type: "uint256"
        }
      ],
      payable: false,
      stateMutability: "view",
      type: "function"
    },
    {
      constant: true,
      inputs: [],
      name: "name",
      outputs: [
        {
          name: "",
          type: "string"
        }
      ],
      payable: false,
      stateMutability: "view",
      type: "function"
    },
    {
      constant: true,
      inputs: [],
      name: "symbol",
      outputs: [
        {
          name: "",
          type: "string"
        }
      ],
      payable: false,
      stateMutability: "view",
      type: "function"
    }
  ]

  const setupWeb3 = (networkInfo) => new Promise((resolve, reject) => {
    const web3 = new window.Web3(window.ethereum || window.Web3.givenProvider || new window.Web3.providers.HttpProvider(networkInfo.rpc))

    if (web3) {
      resolve(web3)
    }
    else {
      reject()
    }
  })

  const fetchTokenInfo = (networkInfo, tokenAddress) => {
    return new Promise((resolve, reject) => {
      setupWeb3(networkInfo).then( async (web3) => {
        const contract = new web3.eth.Contract(
          baseTokenAbi,
          tokenAddress
        )
        const decimals = await contract.methods.decimals().call()
        const name = await contract.methods.name().call()
        const symbol = await contract.methods.symbol().call()
        resolve({
          tokenAddress,
          name,
          decimals,
          symbol,
        })
      }).catch((err) => {
        reject(err)
      })
    })
  }
  window.daoFactory_fetchTokenInfo = fetchTokenInfo
})()