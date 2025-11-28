import {
  Box,
  Container,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

// Using styled components instead of makeStyles
const PREFIX = 'DressCode';
const classes = {
  section: `${PREFIX}-section`,
  sectionTitle: `${PREFIX}-sectionTitle`,
  subsection: `${PREFIX}-subsection`,
  subsectionTitle: `${PREFIX}-subsectionTitle`,
  paper: `${PREFIX}-paper`,
  listItem: `${PREFIX}-listItem`,
};

const StyledContainer = styled(Container)(({ theme }) => ({
  [`& .${classes.section}`]: {
    marginBottom: theme.spacing(6),
  },
  [`& .${classes.sectionTitle}`]: {
    marginBottom: theme.spacing(3),
    color: theme.palette.primary.main,
    fontWeight: 600,
    borderBottom: `2px solid ${theme.palette.primary.light}`,
    paddingBottom: theme.spacing(1),
  },
  [`& .${classes.subsection}`]: {
    marginBottom: theme.spacing(4),
  },
  [`& .${classes.subsectionTitle}`]: {
    marginBottom: theme.spacing(2),
    color: theme.palette.text.primary,
    fontWeight: 500,
  },
  [`& .${classes.paper}`]: {
    padding: theme.spacing(4),
    borderRadius: '12px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
  },
  [`& .${classes.listItem}`]: {
    paddingLeft: 0,
    '& .MuiListItemIcon-root': {
      minWidth: '36px',
    },
  },
}));

const DressCode = () => {
  return (
    <StyledContainer maxWidth="md" sx={{ py: 6 }}>
      <Typography variant="h4" component="h1" gutterBottom fontWeight="bold">
        Employee Dress Code Policy
      </Typography>

      <Paper className={classes.paper} elevation={0}>
        <Box className={classes.section}>
          <Typography variant="h6" className={classes.sectionTitle}>
            General Guidelines
          </Typography>
          <List>
            {[
              'Maintain a professional and business-appropriate appearance at all times',
              'Clothing should be clean, pressed, and in good condition',
              'Use good judgment and dress appropriately for your role and daily responsibilities',
              'When meeting clients or representing the company, dress more formally',
              'Follow specific department guidelines if they have additional requirements',
            ].map((item, index) => (
              <ListItem key={index} className={classes.listItem}>
                <ListItemIcon>
                  <CheckCircleIcon color="primary" />
                </ListItemIcon>
                <ListItemText primary={item} />
              </ListItem>
            ))}
          </List>
        </Box>

        <Box className={classes.section}>
          <Typography variant="h6" className={classes.sectionTitle}>
            Men's Business Casual Attire
          </Typography>

          <Box className={classes.subsection}>
            <Typography variant="subtitle1" className={classes.subsectionTitle}>
              Acceptable:
            </Typography>
            <List>
              {[
                'Dress shirts (button-down or polo)',
                'Dress pants or chinos',
                'Dress shoes or loafers',
                'Sweaters or vests',
                'Sport coats or blazers (optional)',
              ].map((item, index) => (
                <ListItem key={`men-acceptable-${index}`} className={classes.listItem}>
                  <ListItemIcon>
                    <CheckCircleIcon color="success" />
                  </ListItemIcon>
                  <ListItemText primary={item} />
                </ListItem>
              ))}
            </List>
          </Box>

          <Box className={classes.subsection}>
            <Typography variant="subtitle1" className={classes.subsectionTitle}>
              Not Acceptable:
            </Typography>
            <List>
              {[
                'T-shirts, tank tops, or sleeveless shirts',
                'Jeans (unless designated casual day)',
                'Athletic wear or sweatpants',
                'Flip-flops or sandals',
                'Hats or caps worn indoors',
              ].map((item, index) => (
                <ListItem key={`men-unacceptable-${index}`} className={classes.listItem}>
                  <ListItemIcon>
                    <CheckCircleIcon color="error" />
                  </ListItemIcon>
                  <ListItemText primary={item} />
                </ListItem>
              ))}
            </List>
          </Box>
        </Box>

        <Box className={classes.section}>
          <Typography variant="h6" className={classes.sectionTitle}>
            Women's Business Casual Attire
          </Typography>

          <Box className={classes.subsection}>
            <Typography variant="subtitle1" className={classes.subsectionTitle}>
              Acceptable:
            </Typography>
            <List>
              {[
                'Blouses, sweaters, or professional tops',
                'Dress pants, skirts (knee-length or longer), or dresses',
                'Dress shoes or professional flats',
                'Blazers or cardigans',
                'Professional accessories',
              ].map((item, index) => (
                <ListItem key={`women-acceptable-${index}`} className={classes.listItem}>
                  <ListItemIcon>
                    <CheckCircleIcon color="success" />
                  </ListItemIcon>
                  <ListItemText primary={item} />
                </ListItem>
              ))}
            </List>
          </Box>

          <Box className={classes.subsection}>
            <Typography variant="subtitle1" className={classes.subsectionTitle}>
              Not Acceptable:
            </Typography>
            <List>
              {[
                'Tank tops, halter tops, or spaghetti straps',
                'Shorts or short skirts (above knee)',
                'Excessively tight or revealing clothing',
                'Flip-flops or beach sandals',
                'Excessive jewelry or accessories',
              ].map((item, index) => (
                <ListItem key={`women-unacceptable-${index}`} className={classes.listItem}>
                  <ListItemIcon>
                    <CheckCircleIcon color="error" />
                  </ListItemIcon>
                  <ListItemText primary={item} />
                </ListItem>
              ))}
            </List>
          </Box>
        </Box>

        <Box className={classes.section}>
          <Typography variant="h6" className={classes.sectionTitle}>
            Additional Notes
          </Typography>
          <List>
            {[
              'Casual Fridays: Jeans are permitted with business casual tops',
              'Client meetings: Business professional attire is recommended',
              'Special events: Follow specific dress code provided for the event',
              'When in doubt, please check with your supervisor or HR',
            ].map((item, index) => (
              <ListItem key={`notes-${index}`} className={classes.listItem}>
                <ListItemIcon>
                  <CheckCircleIcon color="info" />
                </ListItemIcon>
                <ListItemText primary={item} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Paper>
    </StyledContainer>
  );
};

export default DressCode;
