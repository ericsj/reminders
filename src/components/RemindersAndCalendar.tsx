import { Box, Button, Grid, Typography } from "@mui/material";
import { getDayOfWeekName } from "../util/getDayOfWeekName";
import { getMonthName } from "../util/getMonthName";
import { NoReminder } from "../features/reminders/components/NoReminder";

export function RemindersAndCalendar() {
    const currentDate = `${getDayOfWeekName()}, ${getMonthName()} ${(new Date()).getDate()} ${new Date().getFullYear()}`
    return (
        <Box sx={{ display: 'flex', width: '1119px', height: '686px', borderRadius: '40px', backgroundColor: 'white' }}>
            <Grid container sx={{ gridTemplateRows: '1fr 8fr 1fr', gridTemplateColumns: '1fr', width: '669px' }}>
                <Grid item sx={{
                    display: 'flex', justifyContent: 'space-around', width: '100%'
                }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', padding: '0 20px 0 20px', alignItems: 'center', width: '100%' }}>
                        <Typography>{currentDate}</Typography>
                        <Button
                            variant="contained"
                            style={{
                                background: "linear-gradient(90deg, #FF465D 0%, #BC46BA 100%)"
                            }}
                        >Add reminder
                        </Button>
                    </Box>
                </Grid>
                <NoReminder />
                <Grid item sx={{ visibility: 'hidden' }}>Spacer</Grid>
            </Grid>
        </Box>
    )
}
