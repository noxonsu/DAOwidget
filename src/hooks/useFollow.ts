// import { computed, useRef } from "react";
// import { useWeb3React } from "@web3-react/core";
// import { useApolloQuery } from "@/composables/useApolloQuery";
// import { getInstance } from "@snapshot-labs/lock/plugins/vue3";
// import { FOLLOWS_QUERY } from "@/helpers/queries";
// import { useAliasAction } from "@/composables/useAliasAction";
// import client from "@/helpers/clientEIP712";
// import { useSpaceSubscription } from "./useSpaceSubscription";

// export function useFollowSpace(spaceObj: any = {}) {
//   const following = useRef([]);
//   const loadingFollows = useRef(false);

//   const { web3 } = useWeb3React();
//   const { apolloQuery } = useApolloQuery();
//   const { setAlias, aliasWallet, isValidAlias, checkAlias } = useAliasAction();
//   const { toggleSubscription, isSubscribed } = useSpaceSubscription(
//     spaceObj?.id
//   );

//   const loadingFollow = useRef("");
//   const hoverJoin = useRef("");

//   const web3Account = computed(() => web3.value.account);

//   const followingSpaces = computed(() =>
//     following.current.map((f: any) => f.space.id)
//   );

//   const isFollowing = computed(() =>
//     following.current.some(
//       (f: any) =>
//         f.space.id === spaceObj?.id && f.follower === web3Account.value
//     )
//   );

//   async function loadFollows() {
//     const { isAuthenticated } = getInstance();

//     if (!isAuthenticated.value) return;

//     loadingFollows.current = true;
//     try {
//       Promise.all([
//         (following.current = await apolloQuery(
//           {
//             query: FOLLOWS_QUERY,
//             variables: {
//               follower_in: web3Account.value,
//             },
//           },
//           "follows"
//         )),
//       ]);
//       loadingFollows.value = false;
//     } catch (e) {
//       loadingFollows.value = false;
//       console.error(e);
//     }
//   }

//   function clickFollow(space) {
//     !web3.value.authLoading && web3Account.value
//       ? follow(space)
//       : console.log("Please connect to wallet");
//   }

//   async function follow(space) {
//     loadingFollow.value = spaceObj.id;
//     try {
//       await checkAlias();
//       if (!aliasWallet.value || !isValidAlias.value) {
//         await setAlias();
//         follow(space);
//       } else {
//         if (isFollowing.value) {
//           // Also unsubscribe to the notifications if the user leaves the space.
//           if (isSubscribed.value) {
//             await toggleSubscription();
//           }
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
//         await loadFollows();
//         loadingFollow.value = "";
//       }
//     } catch (e) {
//       loadingFollow.value = "";
//       console.error(e);
//     }
//   }

//   // watchEffect(async () => {
//   //   (isFollowing.value = (following.value ?? []).some(
//   //     (f: any) =>
//   //       f.space.id === spaceObj?.id && f.follower === web3Account.value
//   //   )),
//   //     { deep: true };
//   // });

//   return {
//     clickFollow,
//     loadFollows,
//     loadingFollow: computed(() => loadingFollow.value),
//     loadingFollows: computed(() => loadingFollows.value),
//     isFollowing,
//     followingSpaces,
//     hoverJoin,
//   };
// }
export {};
