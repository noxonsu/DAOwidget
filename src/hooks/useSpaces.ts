import { useState, useEffect } from "react";
import { request } from "graphql-request";

import { OFFCHAIN_HUB_API } from "src/helpers/constants";
import { SPACES_QUERY } from "src/helpers/queries";

export type Space = {
  about: string;
  avatar: string;
  domain: string;
  id: string;
  name: string;
  network: string;
  skin: string;
  symbol: string;
  terms: string;
  github: string;
  twitter: string;
  private: boolean;
  admins: string[];
  members: string[];
  strategies: {
    name: string;
    params: any;
  }[];
  voting: {
    delay: number;
    period: number;
    type: string;
    quorum: number;
  };
  filter: {
    minScore: number;
    onlyMembers: boolean;
  };
  plugins: any;
};

export const useSpaceList = (id_in: string[]) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<false | Error>(false);
  const [spacesData, setSpacesData] = useState<Space[]>([]);

  useEffect(() => {
    const _fetchData = async () => {
      try {
        setIsLoading(true);

        const spaces = (await fetchSpaces(id_in)) as Space[];
        setSpacesData(spaces);
      } catch (err) {
        setError(new Error("Error: can't fetch space list"));
      } finally {
        setIsLoading(false);
      }
    };
    _fetchData();
  }, []);

  return {
    spacesData,
    isLoading,
    error,
  };
};

export const fetchSpaces = async (id_in: string[]) => {
  const spacesData = await request(OFFCHAIN_HUB_API, SPACES_QUERY, {
    id_in,
  });
  return spacesData.spaces;
};
