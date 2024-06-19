import { useRef, useState, useEffect } from "react";
import { Box, Button, Flex } from "@chakra-ui/react";
import axios from "axios";

const ActionButtons = () => {
  const [image, setImage] = useState(null);
  const fileInputRef = useRef(null);
  const captureInputRef = useRef(null);

  useEffect(() => {
    if (image) {
      handleAPI();
    }
  }, [image]);

  const handleImage = (e) => {
    const file = e.target.files[0];
    console.log(file);
    if (file) {
      setImage(file);
    }
  };
  const handleUploadClick = () => {
    fileInputRef.current.click();
  };
  const handleCaptureClick = () => {
    captureInputRef.current.click();
  }

  const handleAPI = () => {
    const formData = new FormData();
    formData.append("image", image);
    axios
      .post("http://localhost:5000/uploadReport", formData)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Box p={4} pb={4}>
      <Flex justifyContent="space-around">
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handleImage}
        />
        <input
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          ref={captureInputRef}
          capture="environment"
          onChange={handleImage}
        />
        <Button colorScheme="teal" variant="solid" onClick={handleUploadClick}>
          Upload File
        </Button>
        <Button colorScheme="teal" variant="solid" onClick={handleCaptureClick}>
          Capture
        </Button>
      </Flex>
    </Box>
  );
};

export default ActionButtons;
