import React from "react";
import { Box, IconButton, Flex } from "@chakra-ui/react";
import { FaHome, FaCommentDots } from "react-icons/fa";

const FooterNav = () => {
  return (
    <Box bg="gray.100" p={4} position="relative" bottom="0" width="100%">
      <Flex justifyContent="space-around">
        <IconButton icon={<FaHome />} variant="ghost" aria-label="Home" />
        <IconButton
          icon={<FaCommentDots />}
          variant="ghost"
          aria-label="Messages"
        />
      </Flex>
    </Box>
  );
};

export default FooterNav;
