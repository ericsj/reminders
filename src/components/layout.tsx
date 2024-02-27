import { Box } from '@mui/material'
import { ReactComponent as CodelittLogo } from '../assets/codelitt-logo.svg'

export function Layout() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', rowGap: '50px' }}>
      <CodelittLogo />

    </Box >
  )
}

