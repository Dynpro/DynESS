import { Card, CardContent, Grid, Typography, Chip, Box, Paper, useTheme } from '@mui/material';
import { styled } from '@mui/system';
import { Breadcrumb } from 'app/components';
import React from 'react';
import useSettings from 'app/hooks/useSettings';
import { themeShadows } from 'app/components/MatxTheme/themeColors';

const Container = styled('div')(({ theme }) => ({
  margin: '24px',
  [theme.breakpoints.down('sm')]: {
    margin: '16px',
  },
  '& .breadcrumb': {
    marginBottom: '24px',
    [theme.breakpoints.down('sm')]: {
      marginBottom: '16px',
    },
    '& a, & .MuiTypography-body1': {
      color: theme.palette.text.primary,
    },
  },
  backgroundColor: theme.palette.background.default,
  minHeight: 'calc(100vh - 75px)',
  padding: '24px',
  [theme.breakpoints.down('sm')]: {
    padding: '16px',
  },
}));

const HeaderSection = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(4),
  paddingBottom: theme.spacing(3),
  borderBottom: `1px solid ${theme.palette.divider}`,
  '& h4': {
    color: theme.palette.text.primary,
    fontWeight: 600,
    marginBottom: theme.spacing(2),
  },
  '& p': {
    color: theme.palette.text.secondary,
    fontSize: '1rem',
    lineHeight: 1.6,
  },
}));

const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  border: `1px solid ${theme.palette.divider}`,
  backgroundColor: theme.palette.background.paper,
  transition: 'all 0.3s ease',
  boxShadow: theme.shadows[0],
  '&:hover': {
    boxShadow: themeShadows[3],
    transform: 'translateY(-4px)',
  },
  '& .MuiCardContent-root': {
    padding: '24px',
    '& h6': {
      color: theme.palette.text.primary,
      fontWeight: 600,
      marginBottom: '8px',
    },
    '& p': {
      color: theme.palette.text.secondary,
      fontSize: '0.875rem',
      lineHeight: 1.6,
    },
  },
}));

const IconBox = styled(Box)(({ theme }) => ({
  width: '48px',
  height: '48px',
  borderRadius: '8px',
  backgroundColor:
    theme.palette.mode === 'dark' ? theme.palette.primary.dark : theme.palette.primary.light,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: theme.spacing(2),
  transition: 'all 0.3s ease',
  '& .material-icons': {
    fontSize: '24px',
    color: theme.palette.getContrastText(
      theme.palette.mode === 'dark' ? theme.palette.primary.dark : theme.palette.primary.light
    ),
  },
  '&:hover': {
    backgroundColor: theme.palette.primary.main,
    '& .material-icons': {
      color: theme.palette.primary.contrastText,
    },
  },
}));

const StatCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3, 2),
  textAlign: 'center',
  border: `1px solid ${theme.palette.divider}`,
  backgroundColor: theme.palette.background.paper,
  borderRadius: '8px',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: themeShadows[3],
  },
  '& h5': {
    color: theme.palette.primary.main,
    fontWeight: 700,
    fontSize: '2rem',
    marginBottom: theme.spacing(1),
    lineHeight: 1.2,
  },
  '& p': {
    color: theme.palette.text.secondary,
    fontWeight: 500,
    fontSize: '0.875rem',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  },
}));

const CultureInitiativesPage = () => {
  const theme = useTheme();
  const { settings } = useSettings();
  const isDark = settings.themes[settings.activeTheme].palette.mode === 'dark';

  const initiatives = [
    {
      title: 'Accountability & Excellence',
      description:
        'Delivering quality results for clients, consultants, and employees through committed performance, clear ownership, and measurable outcomes that reflect DynPro’s promise.',
      icon: 'verified',
      tag: 'Core Value',
    },
    {
      title: 'Innovation & Technology Leadership',
      description:
        'Leveraging cloud, data, AI, RPA, and modern application platforms to drive process transformation and keep clients ahead in their markets.',
      icon: 'lightbulb',
      tag: 'Innovation',
    },
    {
      title: 'Professional Growth & Learning',
      description:
        'Creating challenging assignments, upskilling opportunities, and global project exposure so practitioners can build careers while delivering value to customers.',
      icon: 'trending_up',
      tag: 'Career Development',
    },
    {
      title: 'Community Engagement & Citizenship',
      description:
        'Encouraging employees to contribute as individuals and teams to local communities where DynPro operates across NA, EMEAS, and Asia.',
      icon: 'public',
      tag: 'Social Impact',
    },
    {
      title: 'Team Spirit & Collaboration',
      description:
        'Strengthening camaraderie through initiatives such as DynPro Sports Fest and cross-location collaboration that connects delivery centers and corporate offices.',
      icon: 'groups',
      tag: 'Team Building',
    },
    {
      title: 'Client Partnership & Trust',
      description:
        'Acting as trusted advisors to global enterprises, including Fortune 500 organizations, by aligning solutions with business outcomes and long-term relationships.',
      icon: 'handshake',
      tag: 'Client Success',
    },
  ];

  const stats = [
    { label: 'Global Practitioners', value: '1200+' },
    { label: 'Years of Excellence', value: '29+' },
    { label: 'Countries Served', value: '15+' },
    { label: 'Enterprise Clients', value: '100+ Fortune 500' },
  ];

  return (
    <Container>
      <Box className="breadcrumb">
        <Breadcrumb
          routeSegments={[{ name: 'Culture', path: '/culture' }, { name: 'Initiatives' }]}
        />
      </Box>

      <HeaderSection>
        <Typography variant="h4" component="h1">
          Culture Initiatives
        </Typography>
        <Typography variant="body1">
          DynPro is a global leader in IT Solutions & Services with a workforce of more than 1200
          practitioners across North America, EMEAS, and Asia. Our Culture Initiatives promote
          alignment with our mission, celebrate achievements, and reinforce DynPro’s identity as a
          trusted advisor to clients, consultants, and employees.
        </Typography>
      </HeaderSection>

      {/* Quick Stats */}
      <Grid container spacing={3} sx={{ mb: 6 }}>
        {stats.map((stat, index) => (
          <Grid item xs={6} sm={6} md={3} key={index}>
            <StatCard elevation={0}>
              <Typography variant="h5" component="div">
                {stat.value}
              </Typography>
              <Typography variant="body2" component="p">
                {stat.label}
              </Typography>
            </StatCard>
          </Grid>
        ))}
      </Grid>

      {/* Section Title */}
      <Typography
        variant="h6"
        sx={{
          fontWeight: 600,
          mb: 4,
          color: 'text.primary',
          position: 'relative',
          paddingBottom: '8px',
          '&:after': {
            content: '""',
            position: 'absolute',
            left: 0,
            bottom: 0,
            width: '40px',
            height: '3px',
            backgroundColor: 'primary.main',
            borderRadius: '2px',
          },
        }}
      >
        Our Culture Pillars
      </Typography>

      {/* Initiatives Grid */}
      <Grid container spacing={3}>
        {initiatives.map((initiative, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <StyledCard elevation={0}>
              <CardContent sx={{ p: 3 }}>
                <IconBox>
                  <span className="material-icons" style={{ fontSize: '1.5rem' }}>
                    {initiative.icon}
                  </span>
                </IconBox>

                <Chip
                  label={initiative.tag}
                  size="small"
                  sx={{
                    mb: 2,
                    height: '24px',
                    fontSize: '0.75rem',
                    fontWeight: 500,
                  }}
                />

                <Typography variant="h6" sx={{ mb: 1.5, fontWeight: 600 }}>
                  {initiative.title}
                </Typography>

                <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7 }}>
                  {initiative.description}
                </Typography>
              </CardContent>
            </StyledCard>
          </Grid>
        ))}
      </Grid>

      {/* Vision Section */}
      <Paper
        elevation={0}
        sx={{
          mt: 6,
          p: { xs: 2, sm: 3, md: 4 },
          border: `1px solid ${theme.palette.divider}`,
          backgroundColor: 'background.paper',
          borderRadius: '8px',
          transition: 'all 0.3s ease',
          '&:hover': {
            boxShadow: themeShadows[2],
          },
          width: '100%',
          maxWidth: '1200px',
          mx: 'auto',
        }}
      >
        <Box sx={{ mb: 3 }}>
          <Typography
            variant="h6"
            component="h2"
            sx={{
              color: 'text.primary',
              fontWeight: 600,
              position: 'relative',
              display: 'inline-block',
              '&:after': {
                content: '""',
                position: 'absolute',
                left: 0,
                bottom: '-8px',
                width: '40px',
                height: '3px',
                backgroundColor: 'primary.main',
                borderRadius: '2px',
              },
            }}
          >
            Our Vision
          </Typography>
        </Box>
        <Box>
          <Typography
            variant="body1"
            component="div"
            sx={{
              color: 'text.primary',
              lineHeight: 1.8,
              fontSize: '1rem',
              '& strong': {
                color: 'text.primary',
                fontWeight: 500,
              },
              '& p': {
                margin: 0,
                padding: 0,
                '&:not(:last-child)': {
                  mb: 2,
                },
              },
            }}
          >
            <p>
              We strive to be a worldwide leader in{' '}
              <strong>Information Technology Solutions</strong>, recognized for expertise in select
              technologies and the ability to apply them creatively to solve complex business and IT
              challenges.
            </p>
            <p>
              As trusted advisors and responsible corporate citizens, DynPro teams engage with
              clients and communities across geographies, aligning technology innovation with
              measurable outcomes and positive local impact.
            </p>
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default CultureInitiativesPage;
