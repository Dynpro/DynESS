import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  useTheme,
  Container,
  Fade,
  Grow,
  useMediaQuery,
  Zoom,
} from '@mui/material';
import { styled, keyframes } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

// Icons
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import GroupsIcon from '@mui/icons-material/Groups';
import CelebrationIcon from '@mui/icons-material/Celebration';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import HandshakeIcon from '@mui/icons-material/Handshake';

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  borderRadius: '16px',
  overflow: 'hidden',
  position: 'relative',
  background:
    theme.palette.mode === 'dark'
      ? 'linear-gradient(145deg, #1a1a2e 0%, #16213e 100%)'
      : 'linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%)',
  boxShadow: theme.shadows[3],
  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: theme.shadows[8],
    '& .card-content': {
      background: theme.palette.mode === 'dark' ? 'rgba(0, 0, 0, 0.7)' : 'rgba(255, 255, 255, 0.9)',
    },
    '& .card-icon': {
      animation: `${pulse} 1.5s infinite`,
    },
  },
}));

const CardContentStyled = styled(CardContent)(({ theme }) => ({
  flexGrow: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  textAlign: 'center',
  padding: theme.spacing(4, 2),
  position: 'relative',
  zIndex: 1,
  transition: 'all 0.3s ease',
  '&.card-content': {
    background: theme.palette.mode === 'dark' ? 'rgba(0, 0, 0, 0.5)' : 'rgba(255, 255, 255, 0.8)',
    backdropFilter: 'blur(10px)',
  },
}));

const IconWrapper = styled(Box)(({ theme }) => ({
  width: 80,
  height: 80,
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: theme.spacing(3),
  background:
    theme.palette.mode === 'dark'
      ? 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)'
      : 'linear-gradient(45deg, #1976D2 30%, #2196F3 90%)',
  boxShadow: theme.shadows[4],
  '& svg': {
    fontSize: 40,
    color: theme.palette.common.white,
  },
}));

const initiatives = [
  {
    title: 'Employee Recognition',
    description:
      'Celebrate outstanding contributions and achievements of our team members through our monthly awards program.',
    icon: <EmojiEventsIcon />,
    path: '/culture/recognition',
    color: 'linear-gradient(45deg, #FF6B6B 30%, #FF8E53 90%)',
  },
  {
    title: 'Team Building',
    description:
      'Strengthen collaboration and team spirit with our quarterly offsite events and activities.',
    icon: <GroupsIcon />,
    path: '/culture/team-building',
    color: 'linear-gradient(45deg, #4ECDC4 30%, #556270 90%)',
  },
  {
    title: 'Milestone Celebrations',
    description: 'Mark important company and team achievements with memorable celebrations.',
    icon: <CelebrationIcon />,
    path: '/culture/milestones',
    color: 'linear-gradient(45deg, #FF9A9E 30%, #FAD0C4 90%)',
  },
  {
    title: 'Diversity & Inclusion',
    description:
      'Promote a diverse and inclusive workplace through various initiatives and training.',
    icon: <Diversity3Icon />,
    path: '/culture/diversity',
    color: 'linear-gradient(45deg, #A18CD1 30%, #FBC2EB 90%)',
  },
  {
    title: 'Community Engagement',
    description: 'Give back to our community through volunteer programs and charity events.',
    icon: <HandshakeIcon />,
    path: '/culture/community',
    color: 'linear-gradient(45deg, #84FAB0 30%, #8FD3F4 90%)',
  },
];

const CultureInitiatives = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  useEffect(() => {
    setShow(true);
    return () => setShow(false);
  }, []);

  return (
    <Fade in={show} timeout={800}>
      <Box
        sx={{
          minHeight: '100vh',
          py: 8,
          background:
            theme.palette.mode === 'dark'
              ? 'radial-gradient(circle at top right, #1a1a2e 0%, #16213e 100%)'
              : 'linear-gradient(135deg, #f5f7fa 0%, #e4e8f0 100%)',
        }}
      >
        <Container maxWidth="lg">
          <Zoom in={show} style={{ transitionDelay: show ? '200ms' : '0ms' }}>
            <Box>
              <Typography
                variant="h3"
                component="h1"
                align="center"
                gutterBottom
                sx={{
                  fontWeight: 700,
                  mb: 2,
                  background:
                    theme.palette.mode === 'dark'
                      ? 'linear-gradient(45deg, #64B5F6 30%, #42A5F5 90%)'
                      : 'linear-gradient(45deg, #1976D2 30%, #2196F3 90%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  position: 'relative',
                  '&:after': {
                    content: '""',
                    position: 'absolute',
                    bottom: -8,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: 80,
                    height: 4,
                    background: theme.palette.primary.main,
                    borderRadius: 2,
                  },
                }}
              >
                Our Culture & Initiatives
              </Typography>

              <Typography
                variant="h6"
                align="center"
                color="textSecondary"
                paragraph
                sx={{
                  maxWidth: 700,
                  mx: 'auto',
                  mb: 6,
                  lineHeight: 1.7,
                }}
              >
                At DynPro, we believe our strength lies in our people and the culture we build
                together. Explore how we celebrate achievements, foster growth, and create
                meaningful connections.
              </Typography>
            </Box>
          </Zoom>

          <Grid container spacing={4} justifyContent="center">
            {initiatives.map((initiative, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Grow
                  in={show}
                  style={{ transformOrigin: '0 0 0' }}
                  {...(show ? { timeout: 300 + index * 100 } : {})}
                >
                  <Box>
                    <StyledCard
                      onClick={() => navigate(initiative.path)}
                      sx={{
                        cursor: 'pointer',
                        height: '100%',
                        '&:before': {
                          content: '""',
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          right: 0,
                          height: 4,
                          background: initiative.color,
                        },
                      }}
                    >
                      <CardContentStyled className="card-content">
                        <IconWrapper className="card-icon">{initiative.icon}</IconWrapper>
                        <Typography
                          variant="h6"
                          component="h3"
                          gutterBottom
                          sx={{
                            fontWeight: 600,
                            mb: 2,
                            color:
                              theme.palette.mode === 'dark' ? '#fff' : theme.palette.text.primary,
                          }}
                        >
                          {initiative.title}
                        </Typography>
                        <Typography
                          variant="body1"
                          color="textSecondary"
                          sx={{
                            mb: 2,
                            lineHeight: 1.6,
                          }}
                        >
                          {initiative.description}
                        </Typography>
                      </CardContentStyled>
                    </StyledCard>
                  </Box>
                </Grow>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </Fade>
  );
};

export default CultureInitiatives;
