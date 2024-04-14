export const shortenAddress = (address) => {
    if (!address) return "";
    return `${address.slice(0, 9)}...${address.slice(address.length - 4)}`;
  };
  
