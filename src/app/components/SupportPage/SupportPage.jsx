import {
  AttachFile as AttachFileIcon,
  HelpOutline as HelpOutlineIcon,
  Phone as PhoneIcon,
  Email as EmailIcon,
} from '@mui/icons-material';
import {
  Box,
  Chip,
  Container,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Paper,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { styled } from '@mui/system';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SnackbarUtils from 'SnackbarUtils';
import axios from 'axios.js';
import commonConfig from '../commonConfig';
import { Breadcrumb } from '..';

const PageWrapper = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  backgroundColor: theme.palette.background.default,
}));

const HeaderSection = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(3),
}));

const SupportCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: theme.spacing(2),
  boxShadow:
    theme.palette.mode === 'light'
      ? '0 10px 30px rgba(15, 23, 42, 0.12)'
      : '0 10px 30px rgba(0, 0, 0, 0.7)',
  border: `1px solid ${theme.palette.divider}`,
  backgroundColor: theme.palette.background.paper,
}));

const SidebarCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2.5),
  borderRadius: theme.spacing(2),
  boxShadow:
    theme.palette.mode === 'light'
      ? '0 8px 24px rgba(15, 23, 42, 0.08)'
      : '0 8px 24px rgba(0, 0, 0, 0.7)',
  border: `1px solid ${theme.palette.divider}`,
  backgroundColor: theme.palette.background.paper,
}));

const initialValues = {
  category: '',
  subject: '',
  description: '',
  preferredContact: '',
};

const validationSchema = Yup.object().shape({
  category: Yup.string().required('Please select a category'),
  subject: Yup.string().required('Please enter a subject'),
  description: Yup.string()
    .required('Please describe your issue')
    .min(10, 'Description should be at least 10 characters'),
  preferredContact: Yup.string(),
});

const categories = [
  'HR & Payroll',
  'IT & Systems',
  'Facilities & Infrastructure',
  'Policy & Compliance',
  'Workplace Experience & Culture',
  'Manager / Reporting',
  'Other (please specify in description)',
];

const quickTopics = [
  { label: 'Payslip / CTC clarification', anchor: 'Salary & Compensation' },
  { label: 'Leave or holiday query', anchor: 'Leave Management' },
  { label: 'Attendance / timesheet issue', anchor: 'Attendance & Timesheets' },
  { label: 'Portal / login problem', anchor: 'Getting Started' },
];

const MAX_FILES = 5;
const MAX_FILE_SIZE_MB = 10;
const ACCEPTED_FILE_TYPES =
  '.png,.jpg,.jpeg,.pdf,.doc,.docx,.xls,.xlsx,.txt,image/*,application/pdf';

const SupportPage = () => {
  const [loading, setLoading] = useState(false);
  const [attachedFiles, setAttachedFiles] = useState([]);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const handleFilesChange = (event) => {
    const files = Array.from(event.target.files || []);

    if (!files.length) return;

    const existingCount = attachedFiles.length;
    const availableSlots = MAX_FILES - existingCount;
    const nextFiles = files.slice(0, availableSlots);

    const tooMany = files.length > availableSlots;
    const oversizeFiles = nextFiles.filter((file) => file.size > MAX_FILE_SIZE_MB * 1024 * 1024);

    if (tooMany) {
      SnackbarUtils.error(`You can attach up to ${MAX_FILES} files per ticket.`);
    }

    if (oversizeFiles.length) {
      SnackbarUtils.error(`Each file must be smaller than ${MAX_FILE_SIZE_MB} MB.`);
    }

    const validFiles = nextFiles.filter((file) => file.size <= MAX_FILE_SIZE_MB * 1024 * 1024);

    setAttachedFiles((prev) => [...prev, ...validFiles]);
    // reset input so same file can be selected again if removed
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleRemoveFile = (index) => {
    setAttachedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (values, { resetForm }) => {
    try {
      setLoading(true);
      const url = commonConfig.urls.supportTicket || commonConfig.urls.getInTouch;

      const formData = new FormData();
      formData.append('type', 'support_ticket');
      formData.append('category', values.category);
      formData.append('subject', values.subject);
      formData.append('description', values.description);
      if (values.preferredContact) formData.append('preferredContact', values.preferredContact);

      attachedFiles.forEach((file, index) => {
        formData.append(`attachments[${index}]`, file);
      });

      const response = await axios.post(url, formData);

      if (response?.data?.Status === 'Success') {
        SnackbarUtils.success('Your ticket has been submitted successfully');
        resetForm();
        setAttachedFiles([]);
      } else if (response?.data?.Error === 'Failed') {
        SnackbarUtils.error(response.data?.Message || 'Unable to submit ticket');
      } else {
        SnackbarUtils.success('Your ticket has been submitted');
        resetForm();
        setAttachedFiles([]);
      }
    } catch (error) {
      SnackbarUtils.error(error?.Message || 'Something went wrong while submitting your ticket');
    } finally {
      setLoading(false);
    }
  };

  const handleQuickTopicClick = (label, anchor) => {
    navigate('/faq');
    // optional: could scroll to anchor in FAQ if implemented
  };

  return (
    <PageWrapper>
      <Box className="breadcrumb" mb={2}>
        <Breadcrumb routeSegments={[{ name: 'Support' }, { name: 'Raise Ticket' }]} />
      </Box>

      <HeaderSection>
        <Typography variant="h4" fontWeight={700} gutterBottom component="h1">
          Help & Support Center
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Can&apos;t find what you need in the FAQ? Share a few details below and our team will
          help you resolve the issue as quickly as possible.
        </Typography>
      </HeaderSection>

      <Container maxWidth="lg">
        <Grid container spacing={3} alignItems="flex-start">
          <Grid item xs={12} md={8}>
            <SupportCard component="section" aria-labelledby="support-form-heading">
              <Box display="flex" alignItems="center" mb={2}>
                <Box
                  sx={{
                    mr: 1.5,
                    width: 40,
                    height: 40,
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#212e7c',
                    color: '#ffffff',
                    boxShadow: '0 2px 6px rgba(0,0,0,0.25)',
                  }}
                  aria-hidden="true"
                >
                  <HelpOutlineIcon fontSize="small" />
                </Box>
                <Typography
                  id="support-form-heading"
                  variant="h6"
                  fontWeight={600}
                  component="h2"
                >
                  Raise a support request
                </Typography>
              </Box>

              <Typography variant="body2" color="text.secondary" mb={2}>
                Provide as much information as you can, and attach screenshots or documents if
                helpful. This allows our team to respond faster and with more accurate guidance.
              </Typography>

              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
                  <form onSubmit={handleSubmit} noValidate aria-label="Support request form">
                    <Grid container spacing={2.5}>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          select
                          fullWidth
                          name="category"
                          label="What is this related to?"
                          value={values.category}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={Boolean(touched.category && errors.category)}
                          helperText={touched.category && errors.category}
                          aria-required="true"
                        >
                          {categories.map((option) => (
                            <MenuItem key={option} value={option}>
                              {option}
                            </MenuItem>
                          ))}
                        </TextField>
                      </Grid>

                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          name="preferredContact"
                          label="Preferred contact (email / phone, optional)"
                          value={values.preferredContact}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={Boolean(touched.preferredContact && errors.preferredContact)}
                          helperText={touched.preferredContact && errors.preferredContact}
                          inputProps={{ 'aria-label': 'Preferred contact details' }}
                        />
                      </Grid>

                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          name="subject"
                          label="Short summary of the issue"
                          value={values.subject}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={Boolean(touched.subject && errors.subject)}
                          helperText={touched.subject && errors.subject}
                          aria-required="true"
                        />
                      </Grid>

                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          name="description"
                          label="Describe what&apos;s happening"
                          multiline
                          minRows={5}
                          value={values.description}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={Boolean(touched.description && errors.description)}
                          helperText={
                            touched.description && errors.description
                              ? errors.description
                              : 'Include any error messages you see, steps to reproduce, and expected behaviour.'
                          }
                          inputProps={{
                            'aria-describedby': 'description-helper-text',
                          }}
                        />
                      </Grid>

                      <Grid item xs={12}>
                        <Box
                          display="flex"
                          flexDirection={{ xs: 'column', sm: 'row' }}
                          alignItems={{ xs: 'flex-start', sm: 'center' }}
                          justifyContent="space-between"
                          gap={1.5}
                        >
                          <Box>
                            <Typography variant="subtitle2" gutterBottom>
                              Attachments (optional)
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              You can attach up to {MAX_FILES} files (images, PDFs, documents) to
                              help us understand the issue.
                            </Typography>
                          </Box>

                          <Box display="flex" alignItems="center" gap={1}>
                            <input
                              ref={fileInputRef}
                              id="support-attachments-input"
                              type="file"
                              multiple
                              accept={ACCEPTED_FILE_TYPES}
                              style={{ display: 'none' }}
                              onChange={handleFilesChange}
                            />
                            <Tooltip title="Attach screenshots or documents">
                              <span>
                                <LoadingButton
                                  variant="outlined"
                                  size="small"
                                  onClick={() => fileInputRef.current?.click()}
                                  startIcon={<AttachFileIcon />}
                                  loading={false}
                                  aria-label="Attach files to support ticket"
                                  sx={{
                                    borderRadius: 20,
                                    textTransform: 'none',
                                    fontWeight: 500,
                                    px: 2,
                                    borderColor: '#212e7c',
                                    color: '#212e7c',
                                    '&:hover': {
                                      borderColor: '#1a2465',
                                      backgroundColor: 'rgba(33,46,124,0.04)',
                                    },
                                  }}
                                >
                                  Add attachments
                                </LoadingButton>
                              </span>
                            </Tooltip>
                          </Box>
                        </Box>

                        {attachedFiles.length > 0 && (
                          <Box mt={1.5}>
                            <Typography variant="caption" color="text.secondary" display="block">
                              Attached files:
                            </Typography>
                            <Box mt={0.5} display="flex" flexWrap="wrap" gap={1}>
                              {attachedFiles.map((file, index) => (
                                <Chip
                                  key={`${file.name}-${index}`}
                                  label={`${file.name} (${(file.size / (1024 * 1024)).toFixed(
                                    1
                                  )} MB)`}
                                  onDelete={() => handleRemoveFile(index)}
                                  size="small"
                                  variant="outlined"
                                  sx={{ maxWidth: '100%' }}
                                />
                              ))}
                            </Box>
                          </Box>
                        )}
                      </Grid>

                      <Grid item xs={12}>
                        <Divider sx={{ my: 1.5 }} />
                        <Box
                          display="flex"
                          flexDirection={{ xs: 'column', sm: 'row' }}
                          justifyContent="space-between"
                          alignItems={{ xs: 'stretch', sm: 'center' }}
                          gap={1.5}
                        >
                          <Typography variant="body2" color="text.secondary">
                            Need a quick refresher first?{' '}
                            <Box
                              component="button"
                              type="button"
                              sx={{
                                padding: 0,
                                margin: 0,
                                border: 'none',
                                background: 'none',
                                color: '#212e7c',
                                cursor: 'pointer',
                                textDecoration: 'underline',
                                fontWeight: 500,
                                fontSize: '0.875rem',
                              }}
                              onClick={() => navigate('/faq')}
                            >
                              Browse FAQs
                            </Box>
                          </Typography>

                          <LoadingButton
                            type="submit"
                            variant="contained"
                            loading={loading}
                            aria-label="Submit support ticket"
                            sx={{
                              px: 3.5,
                              textTransform: 'none',
                              fontWeight: 500,
                              backgroundColor: '#212e7c',
                              '&:hover': { backgroundColor: '#1a2465' },
                              color: '#ffffff',
                            }}
                          >
                            Submit ticket
                          </LoadingButton>
                        </Box>
                      </Grid>
                    </Grid>
                  </form>
                )}
              </Formik>
            </SupportCard>
          </Grid>

          <Grid item xs={12} md={4}>
            <SidebarCard component="aside" aria-label="Support information">
              <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                We&apos;re here to help
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                Our HR, IT, and operations teams monitor tickets during business hours. Most issues
                are acknowledged within 1 business day.
              </Typography>

              <List dense>
                <ListItem>
                  <ListItemIcon>
                    <EmailIcon color="action" fontSize="small" />
                  </ListItemIcon>
                  <ListItemText
                    primary="HR support"
                    secondary="hrsupport-1@dynproindia.com"
                    primaryTypographyProps={{ variant: 'body2' }}
                    secondaryTypographyProps={{ variant: 'caption' }}
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <EmailIcon color="action" fontSize="small" />
                  </ListItemIcon>
                  <ListItemText
                    primary="IT helpdesk"
                    secondary="it-support@dynproindia.com"
                    primaryTypographyProps={{ variant: 'body2' }}
                    secondaryTypographyProps={{ variant: 'caption' }}
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <PhoneIcon color="action" fontSize="small" />
                  </ListItemIcon>
                  <ListItemText
                    primary="HR helpline"
                    secondary="+91-6360786994"
                    primaryTypographyProps={{ variant: 'body2' }}
                    secondaryTypographyProps={{ variant: 'caption' }}
                  />
                </ListItem>
              </List>

              <Divider sx={{ my: 2 }} />

              <Typography variant="subtitle2" gutterBottom>
                Popular topics
              </Typography>
              <Box display="flex" flexWrap="wrap" gap={1} mb={1.5}>
                {quickTopics.map((topic) => (
                  <Chip
                    key={topic.label}
                    label={topic.label}
                    size="small"
                    clickable
                    onClick={() => handleQuickTopicClick(topic.label, topic.anchor)}
                    sx={{ maxWidth: '100%' }}
                  />
                ))}
              </Box>

              <Typography variant="caption" color="text.secondary" display="block">
                Clicking a topic will open the related FAQ section so you can double-check details
                before or after you raise a ticket.
              </Typography>
            </SidebarCard>
          </Grid>
        </Grid>
      </Container>
    </PageWrapper>
  );
};

export default SupportPage;
