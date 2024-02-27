import { Box } from "@mui/material";
import { ReactComponent as CalendarLogo } from '../assets/calendar-logo.svg'

export function Calendar() {
    return (
        <Box sx={{ display: 'flex' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', margin: '20px' }}>

                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <CalendarLogo />

                </Box>
            </Box>
        </Box>
    )
}
