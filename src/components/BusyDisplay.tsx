import {
  Text,
  Box,
  Paper,
  useMantineTheme,
  Flex,
} from '@mantine/core'
import BusyButton from './BusyButton'
import { HumanCat, HumanDinosaur } from 'react-kawaii'

interface BusyStatusProps {
  user: 'nono' | 'lili'
  otherBusy: boolean
  onToggleBusy: (busy: boolean) => void
  meBusy: boolean
}

export default function BusyStatus({ user, otherBusy, onToggleBusy, meBusy }: BusyStatusProps) {

  const theme = useMantineTheme()

  const handleChange = () => {
    if (onToggleBusy) {
      onToggleBusy(!meBusy);
    }
  }

  const otherUser = user === 'nono' ? 'Lili' : 'Nono'


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
    <Flex
      direction="column"
      bg={backgroundColor}
      h='100vh'
      justify='space-between'
      px={20}
    >
      <Paper
        my={20}
        shadow="md"
        radius="md"
        p={20}
        withBorder
        style={{
          textAlign: 'center',
          backgroundColor: '#fff',
          borderWidth: 2,
          borderStyle: 'solid',
          transition: 'border-color 0.3s ease',
        }}
      >
        <Text size="lg" fw={500} ta="center">
          Hello {user.charAt(0).toUpperCase() + user.slice(1)} 👋
        </Text>
      </Paper>
      <Box pt="xl">


        <Flex direction={'column'} align="center" justify="center" gap="md" my={30} py={20}>
          <BusyButton onToggleBusy={handleChange} meBusy={meBusy} />
        </Flex>
      </Box>

      <Paper
        shadow="md"
        radius="md"
        p={20}
        withBorder
        my={20}
        style={{
          textAlign: 'center',
          backgroundColor: '#fff',

          borderColor,
          borderWidth: 2,
          borderStyle: 'solid',
          transition: 'border-color 0.3s ease',
        }}
      >
        <Flex direction={"row"} justify="center" align="center">
          <Text fw={600} style={{ color: textColor }}>
            {otherUser} is {otherBusy ? `Busy` : 'Available'}
          </Text>
          {otherUser === 'Lili' ? <HumanCat size={50} mood={otherBusy ? "sad" : "happy"} color={otherBusy ? theme.colors.pastelRed[4] : theme.colors.pastelGreen[4]} /> : <HumanDinosaur size={50} mood={otherBusy ? "sad" : "happy"} color={otherBusy ? theme.colors.pastelRed[4] : theme.colors.pastelGreen[4]} />}
        </Flex>
      </Paper>
    </Flex>
  )
}
