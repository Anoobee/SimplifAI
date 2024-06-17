import React from 'react';
import { Box, Button, Flex } from '@chakra-ui/react';

const ActionButtons = () => {
  return (
    <Box p={4} pb={4}>
      <Flex justifyContent="space-around">
        <Button colorScheme="teal" variant="solid">
          Upload File
        </Button>
        <Button colorScheme="teal" variant="solid">
          Capture
        </Button>
      </Flex>
    </Box>
  );
};

export default ActionButtons;
