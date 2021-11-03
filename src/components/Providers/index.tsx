import React from 'react'
import {
injected,
network,
// walletconnect,
Connectors
} from '../../connectors'

import { useWeb3React } from '@web3-react/core'
import { Web3Provider } from '@ethersproject/providers'

import Spinner from '../Spinner'

type ConnectorNames = 'Injected' | 'Network' // | 'WalletConnect'

enum EConnectorNames {
  Injected = 'Injected',
  Network = 'Network',
  // WalletConnect = 'WalletConnect',
}

const connectorsByName: {[connectorName in EConnectorNames]: Connectors} = {
  [EConnectorNames.Injected]: injected,
  [EConnectorNames.Network]: network,
  // [EConnectorNames.WalletConnect]: walletconnect,
}

type ConnectProvidersProps = {
    activatingConnector: Connectors | undefined
    triedEager: boolean
    setActivatingConnector: React.Dispatch<React.SetStateAction<Connectors | undefined>>
}

function ConnectProviders(props: ConnectProvidersProps) {
  const {
    activatingConnector,
    triedEager,
    setActivatingConnector
  } = props

  const context = useWeb3React<Web3Provider>()
  const { connector, activate, error } = context


  return (
    <>
      {Object.keys(connectorsByName).map(name => {
        const connectorName = name as ConnectorNames
        const currentConnector = connectorsByName[connectorName]
        const activating = currentConnector === activatingConnector
        const connected = currentConnector === connector
        const disabled = !triedEager || !!activatingConnector || connected || !!error

        return (
            <button
            style={{
                height: '3rem',
                borderRadius: '1rem',
                borderColor: activating ? 'orange' : connected ? 'green' : 'unset',
                cursor: disabled ? 'unset' : 'pointer',
                position: 'relative',
                color: disabled ? 'white' : 'black'
            }}
            disabled={disabled}
            key={name}
            onClick={() => {
                setActivatingConnector(currentConnector)
                activate(connectorsByName[connectorName])
            }}
            >
            <div
                style={{
                position: 'absolute',
                top: '0',
                left: '0',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                color: 'white',
                margin: '0 0 0 -2rem'
                }}
            >
                {activating && <Spinner color={'white'} style={{ height: '25%'}} />}
                {connected && (
                <span role="img" aria-label="check">
                    ✅
                </span>
                )}
            </div>
            {name}
          </button>
        )
      })}
    </>
  )
}

export default ConnectProviders
