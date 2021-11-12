import { useWeb3React } from "@web3-react/core";
import { Space } from 'src/hooks/useSpaces'
import client from "src/helpers/clientEIP712";
import { Web3Provider } from "@ethersproject/providers"

interface FollowButtonProps {
  spaceObj: Space;
}

function FollowButton(props: FollowButtonProps) {
  const { spaceObj } = props;

  const web3 = useWeb3React<Web3Provider>();

  console.log('spaceObj', spaceObj)

  const follow = async (space: string) => {
    console.log('space', space)

    console.log('web3', web3)
    const account = web3.account || ''

    // await client.unfollow(aliasWallet.value, aliasWallet.value.address, {
    //   from: account,
    //   space,
    // });
//     const isFollowing = false;
//     try {
//       await checkAlias();
//       if (!aliasWallet.value || !isValidAlias.value) {
//         await setAlias();
//         follow(space);
//       } else {
//         if (isFollowing) {
//           await client.unfollow(aliasWallet.value, aliasWallet.value.address, {
//             from: web3Account.value,
//             space,
//           });
//         } else {
//           await client.follow(aliasWallet.value, aliasWallet.value.address, {
//             from: web3Account.value,
//             space,
//           });
//         }
//       }
//     } catch (e) {
//       console.error(e);
//     }
  }

  return (
    <button
      style={{
        border: "1px solid white",
        padding: "0.5rem",
      }}
      onClick={() => follow(spaceObj.id)}
    >
      Join
    </button>
  );
}

export default FollowButton;
