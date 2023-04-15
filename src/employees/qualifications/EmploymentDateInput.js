import * as React from 'react';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

export default function EmploymentDateInput({date, setDate, error, disabled, label, minDate='1950-01-01'}) {

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Stack spacing={3}>
        <DatePicker
          views={['year', 'month']}
          label={label}
          minDate={minDate}
          maxDate={new Date()}
          value={date}
          onChange={(newValue) => { setDate(newValue) }}
          disabled = {disabled}
          renderInput={(params) => <TextField {...params}  size="medium" error={error!==null} helperText={error} />}
        />
      </Stack>
    </LocalizationProvider>
  );
}
