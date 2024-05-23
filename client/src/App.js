import React, { useState } from 'react';
import { Container, TextField, Button, Box, Typography } from '@mui/material';
import YouTubeVideoCard from './Components/YouTubeVideoCard';

const App = () => {
  const [videoUrl, setVideoUrl] = useState('');
  const [submittedUrl, setSubmittedUrl] = useState('');

  const handleInputChange = (e) => {
    setVideoUrl(e.target.value);
  };

  const handleSubmit = () => {
    setSubmittedUrl(videoUrl);
  };

  return (
    <Container>
      <Typography variant="h3" align="center" gutterBottom>
        YouTube Video Downloader
      </Typography>
      <Box display="flex" justifyContent="center" mb={4}>
        <TextField
          label="YouTube Video URL"
          variant="outlined"
          value={videoUrl}
          onChange={handleInputChange}
          sx={{ width: '70%' }}
        />
        <Button variant="contained" color="primary" onClick={handleSubmit} sx={{ ml: 2 }}>
          Fetch Video
        </Button>
      </Box>
      {submittedUrl && <YouTubeVideoCard videoUrl={submittedUrl} />}
    </Container>
  );
};

export default App;
