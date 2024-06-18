import { Box, Flex, Input, IconButton } from "@chakra-ui/react";
import { FaPaperPlane } from "react-icons/fa";

const ChatInput = ({ value, onChange, onSend }) => {
  return (
    <Box>
      <Flex p={4} align="center" bg="white" boxShadow="md">
        <Input
          placeholder="Type your message..."
          value={value}
          onChange={onChange}
          mr={2}
        />
        <IconButton
          icon={<FaPaperPlane />}
          colorScheme="teal"
          onClick={onSend}
          aria-label="Send message"
        />
      </Flex>
    </Box>
  );
};

export default ChatInput;
