function FollowButton() {

//   const follow = async (space) => {
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
//   }

  return (
    <button
      style={{
        border: "1px solid white",
        padding: "0.5rem",
      }}
      onClick={() => {}}
    >
      Join
    </button>
  );
}

export default FollowButton;
