import { Card, Grid, Typography, styled } from '@mui/material';
import { useSelector } from 'react-redux';

const ContentBox = styled('div')(({ theme }) => ({
  margin: '30px',
  [theme.breakpoints.down('sm')]: { margin: '16px' },
}));

const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'transform 0.2s, box-shadow 0.2s',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: theme.shadows[8],
  },
}));

const StyledCardContent = styled('div')({
  padding: '20px',
  flexGrow: 1,
  display: 'flex',
  flexDirection: 'column',
});

const ResourceCard = ({ title, description }) => (
  <Grid item xs={12} sm={6} md={4} lg={3}>
    <StyledCard>
      <StyledCardContent>
        <Typography variant="h6" component="h3" gutterBottom>
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </StyledCardContent>
    </StyledCard>
  </Grid>
);

const KnowledgeHubPage = () => {
  // Safely get user from auth state
  const user = useSelector((state) => state?.auth?.user);

  const resources = [
    {
      title: 'Solution Playbooks',
      description:
        'End‑to‑end implementation patterns for cloud, data, integration, RPA, and application modernization projects delivered by DynPro teams.',
    },
    {
      title: 'Technical Documentation',
      description:
        'Authoritative architecture overviews, platform standards, and configuration guides for enterprise solutions implemented with DynPro.',
    },
    {
      title: 'Best Practices',
      description:
        'Reusable delivery checklists, coding conventions, security guidelines, and review templates used across engagements.',
    },
    {
      title: 'Code Samples & Templates',
      description:
        'Curated repositories of reference implementations, accelerators, and automation scripts for common integration and analytics scenarios.',
    },
    {
      title: 'Learning Paths',
      description:
        'Role‑based learning journeys for consultants, architects, and engineers covering DynPro tools, platforms, and methodologies.',
    },
    {
      title: 'Knowledge Base',
      description:
        'Searchable articles capturing lessons learned, troubleshooting guides, and production support runbooks from real projects.',
    },
    {
      title: 'Client Case Studies',
      description:
        'Documented success stories demonstrating how DynPro helped enterprises modernize processes, integrate systems, and unlock insights.',
    },
    {
      title: 'Governance & Standards',
      description:
        'Policies, review gates, and templates that align delivery with DynPro’s quality, compliance, and security expectations.',
    },
  ];

  return (
    <div className="m-sm-30">
      <ContentBox>
        <Typography variant="h4" component="h1" gutterBottom>
          Knowledge Hub
        </Typography>
        <Typography variant="body1" color="textSecondary" paragraph>
          Centralized repository for DynPro methodologies, technical assets, and best practices that
          enable teams to design, build, and support digital transformation solutions consistently
          across clients and regions.
        </Typography>

        <Grid container spacing={3} style={{ marginTop: '20px' }}>
          {resources.map((resource, index) => (
            <ResourceCard key={index} {...resource} />
          ))}
        </Grid>
      </ContentBox>
    </div>
  );
};

export default KnowledgeHubPage;
