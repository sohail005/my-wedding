import useDB from "@/hooks/useDB";
import { Box, Stack } from "@mui/material";
import React from "react";
import ProfileCouple from "./ProfileCouple";

/**
 * Komponent mempelai
 *
 * @returns React.ReactElement
 */
const Couple = () => {
  const { bride, groom } = useDB((db) => db.wedding.couple);
  return (
    <Box>
      <ProfileCouple couple={groom} />
      <ProfileCouple couple={bride} />
    </Box>
  );
};

export default Couple;
