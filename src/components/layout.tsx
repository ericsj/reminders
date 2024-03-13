import { Box } from '@mui/material'
import { ReactComponent as CodelittLogo } from '../assets/codelitt-logo.svg'
import { RemindersAndCalendar } from './RemindersAndCalendar'

export function Layout() {
  return (
    <Box sx={{
      display: 'flex',
      backgroundColor: '#EBF3FE',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      rowGap: '50px',
      width: '100%',
      height: '100%'
    }}>
      <Box sx={{ width: '1119px' }}>
        <CodelittLogo />
      </Box>
      <RemindersAndCalendar />
    </Box >
  )
}

