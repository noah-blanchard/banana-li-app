import {
  Container,
  Switch,
  Text,
  Box,
  Paper,
  Group,
  useMantineTheme,
} from '@mantine/core'

interface BusyStatusProps {
  user: 'nono' | 'lili'
  otherBusy: boolean
  onToggleBusy: (busy: boolean) => void
  meBusy: boolean
}

export default function BusyStatus({ user, otherBusy, onToggleBusy, meBusy }: BusyStatusProps) {

  const theme = useMantineTheme()

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.currentTarget.checked
    if (onToggleBusy) {
      onToggleBusy(value)
    }
  }

  const otherUser = user === 'nono' ? 'Lili' : 'Nono'

  const switchColor = meBusy ? 'pastelRed' : 'pastelGreen'
  const label = meBusy ? "I'm busy 🛑" : "I'm available ✅"

  const backgroundColor = meBusy
    ? theme.colors.pastelRed[0]
    : theme.colors.pastelGreen[0]

  const borderColor = otherBusy
    ? theme.colors.pastelRed[4]
    : theme.colors.pastelGreen[4]

  const textColor = otherBusy
    ? theme.colors.pastelRed[7]
    : theme.colors.pastelGreen[7]

  return (
    <Container
      size="xs"
      px="md"
      style={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        backgroundColor,
        transition: 'background-color 0.3s ease',
      }}
    >
      <Box pt="xl">
        <Text size="lg" fw={500} mb="lg" ta="center">
          Hello {user.charAt(0).toUpperCase() + user.slice(1)} !
        </Text>

        <Group align="center" justify="center" gap="md">
          <Switch
            size="lg"
            checked={meBusy}
            onChange={handleChange}
            color={switchColor}
          />
          <Text size="md" fw={500}>{label}</Text>
        </Group>
      </Box>

      <Paper
        shadow="md"
        radius="md"
        p="md"
        withBorder
        style={{
          textAlign: 'center',
          backgroundColor: '#fff',
          marginBottom: 32,
          borderColor,
          borderWidth: 2,
          borderStyle: 'solid',
          transition: 'border-color 0.3s ease',
        }}
      >
        <Text fw={600} style={{ color: textColor }}>
          {otherUser} is {otherBusy ? 'Busy 🛑' : 'Available ✅'}
        </Text>
      </Paper>
    </Container>
  )
}
