'use client';
import { useForm } from 'react-hook-form';
import { TextField, Grid, Button, Box } from '@mui/material';

export default function PatientForm({ onSubmit, onCancel, initialData }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: initialData || {
      name: '',
      email: '',
      phone: '',
      dateOfBirth: '',
      address: '',
      bloodType: '',
      emergencyContact: '',
      allergies: '',
    },
  });

  const handleFormSubmit = (data) => {
    // Generate a unique ID for the new patient
    const patientData = {
      ...data,
      id: Date.now(), // Simple ID generation
    };
    onSubmit(patientData);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Full Name"
            {...register('name', { required: 'Name is required' })}
            error={!!errors.name}
            helperText={errors.name?.message}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Email"
            type="email"
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^\S+@\S+$/i,
                message: 'Please enter a valid email',
              },
            })}
            error={!!errors.email}
            helperText={errors.email?.message}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Phone"
            {...register('phone', { required: 'Phone is required' })}
            error={!!errors.phone}
            helperText={errors.phone?.message}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Date of Birth"
            type="date"
            InputLabelProps={{ shrink: true }}
            {...register('dateOfBirth', { required: 'Date of birth is required' })}
            error={!!errors.dateOfBirth}
            helperText={errors.dateOfBirth?.message}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Address"
            multiline
            rows={2}
            {...register('address', { required: 'Address is required' })}
            error={!!errors.address}
            helperText={errors.address?.message}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Blood Type"
            placeholder="e.g., O+, A-, B+"
            {...register('bloodType')}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Emergency Contact"
            placeholder="Name - Phone"
            {...register('emergencyContact')}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Allergies"
            multiline
            rows={2}
            placeholder="List any allergies or 'None'"
            {...register('allergies')}
          />
        </Grid>
      </Grid>

      <Box sx={{ mt: 3, display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
        <Button onClick={onCancel} variant="outlined">
          Cancel
        </Button>
        <Button type="submit" variant="contained">
          Save Patient
        </Button>
      </Box>
    </form>
  );
}