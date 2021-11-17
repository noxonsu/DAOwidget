import { useEffect, useState } from "react";
import { request } from "graphql-request";
import { useWeb3React } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";

import { FOLLOWS_QUERY } from "src/helpers/queries";
import { OFFCHAIN_HUB_API } from "src/helpers/constants";

import { useAliasAction } from "src/hooks/useAliasAction";
import client from "src/helpers/clientEIP712";

export function useFollowSpace(spaceId: string = "") {
  const [following, setFollowing] = useState<IUniversalObj[]>([]);
  const [isLoadingFollows, setIsLoadingFollows] = useState(false);
  const [isFollowing, setIsFolowing] = useState(false);
  const [isLoadingFollow, setIsLoadingFollow] = useState(false);

  const web3 = useWeb3React<Web3Provider>();
  const account = web3.account || "";

  const { setAlias, aliasWallet, isValidAlias, checkAlias } = useAliasAction();

  async function loadFollows() {
    setIsLoadingFollows(true);
    try {
      Promise.all([
        account && setFollowing(await fetchFollowing([account], [spaceId])),
      ]);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoadingFollows(false);
    }
  }

  useEffect(() => {
    loadFollows();
  }, [account]);

  useEffect(() => {
    setIsFolowing(
      following.some(
        (f: any) => f.space.id === spaceId && f.follower === web3.account
      )
    );
  }, [following]);

  function clickFollow() {
    web3.active && web3.account
      ? follow(spaceId)
      : console.log("Please connect to wallet");
  }

  const follow = async (spaceId: string) => {
    const account = web3.account || "";

    try {
      setIsLoadingFollow(true);

      await checkAlias();
      if (!aliasWallet.current || !isValidAlias.current) {
        await setAlias();
        await follow(spaceId);
      } else {
        if (isFollowing) {
          await client.unfollow(
            aliasWallet.current,
            aliasWallet.current.address,
            {
              from: account,
              space: spaceId,
            }
          );
        } else {
          await client.follow(
            aliasWallet.current,
            aliasWallet.current.address,
            {
              from: account,
              space: spaceId,
            }
          );
        }
        await loadFollows();
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoadingFollow(false);
    }
  };

  return {
    clickFollow,
    loadFollows,
    isLoadingFollows,
    isLoadingFollow,
    isFollowing,
  };
}

export const fetchFollowing = async (
  follower_in: string[],
  space_in: string[]
) => {
  const followingData = await request(OFFCHAIN_HUB_API, FOLLOWS_QUERY, {
    follower_in,
    space_in,
  });
  return followingData.follows;
};
