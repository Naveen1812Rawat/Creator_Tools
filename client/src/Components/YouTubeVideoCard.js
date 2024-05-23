import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const YouTubeVideoCard = ({ videoUrl }) => {
  const [videoId, setVideoId] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchVideoData = async () => {
      try {
        const response = await axios.post(`https://creator-tools.onrender.com/download/?url=${videoUrl}`);
        const data = response.data;

        // Extract videoId from the videoUrl
        const videoIdMatch = videoUrl.match(/(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|(?:youtu\.be\/))([^&\n?#]+)/);
        const videoId = videoIdMatch ? videoIdMatch[1] : null;

        setVideoId(videoId);
        setTitle(data.title); // Assuming API response contains title
        setDescription(data.description); // Assuming API response contains description
      } catch (err) {
        setError('Failed to fetch video data.');
      } finally {
        setLoading(false);
      }
    };

    fetchVideoData();
  }, [videoUrl]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <Typography variant="h6" color="error">{error}</Typography>
      </Box>
    );
  }

  return (
    <Card sx={{ maxWidth: 345, margin: '20px auto' }}>
      <CardActionArea>
        <CardMedia
          component="iframe"
          height="200"
          src={`https://www.youtube.com/embed/${videoId}`}
          title={title}
          frameBorder="0"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default YouTubeVideoCard;
