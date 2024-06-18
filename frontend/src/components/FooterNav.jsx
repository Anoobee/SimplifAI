import { Box, IconButton, Flex } from "@chakra-ui/react";
import { FaHome, FaCommentDots } from "react-icons/fa";
import { Link } from "react-router-dom";

const FooterNav = () => {
  return (
    <Box bg="gray.100" p={4} position="relative" bottom="0" width="100%">
      <Flex justifyContent="space-around">
        <Link to="/home">
        <IconButton icon={<FaHome />} variant="ghost" aria-label="Home" />
        </Link>

        <Link to="/chat">
        <IconButton
          icon={<FaCommentDots />}
          variant="ghost"
          aria-label="Messages"
        />
        </Link>
      </Flex>
    </Box>
  );
};

export default FooterNav;
