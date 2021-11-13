import { useWeb3React } from "@web3-react/core";
import { Space } from 'src/hooks/useSpaces'
import client from "src/helpers/clientEIP712";
import { Web3Provider } from "@ethersproject/providers"
import { useAliasAction } from "src/hooks/useAliasAction";

interface FollowButtonProps {
  spaceObj: Space;
}

function FollowButton(props: FollowButtonProps) {
  const { spaceObj } = props;

  const web3 = useWeb3React<Web3Provider>();

  const { setAlias, aliasWallet, isValidAlias, checkAlias } = useAliasAction();

  console.log('spaceObj', spaceObj)

  const follow = async (space: string) => {
    console.log('space', space)

    console.log('web3', web3)
    const account = web3.account || ''

    const isFollowing = false;
    try {
      await checkAlias();
      if (!aliasWallet || !isValidAlias.current) {
        await setAlias();
        follow(space);
      } else {
        if (isFollowing) {
          await client.unfollow(aliasWallet, aliasWallet.address, {
            from: account,
            space,
          });
        } else {
          await client.follow(aliasWallet, aliasWallet.address, {
            from: account,
            space,
          });
        }
      }
    } catch (e) {
      console.error(e);
    }
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
