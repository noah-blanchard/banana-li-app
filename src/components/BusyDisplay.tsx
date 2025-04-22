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
    onToggleBusy?.(!meBusy)
  }

  const otherUser = user === 'nono' ? 'Lili' : 'Nono'

  const borderColor = otherBusy
    ? theme.colors.pastelRed[4]
    : theme.colors.pastelGreen[4]

  const textColor = otherBusy
    ? theme.colors.pastelRed[7]
    : theme.colors.pastelGreen[7]

  const busyTranslate = meBusy ? 'translateX(0%)' : 'translateX(-50%)'

  return (
    <Box w='100%' h='100vh' style={{
      position: 'relative',
      overflow: 'hidden',
    }}>
      <Flex h='100vh' w='200%' style={{ position: 'absolute', top: 0, left: 0, zIndex: -1, transform: busyTranslate, transition: 'transform 0.25s ease' }}>
        <Box h='100%' w='50%' bg={'pastelRed.1'} />
        <Box h='100%' w='50%' bg={'pastelGreen.1'} />
      </Flex>
      <Flex
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
        }}
        w='100%'
        h="100vh"
        direction="column"
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
          <Flex direction="column" align="center" justify="center" gap="md" my={30} py={20}>
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
          <Flex direction="row" justify="center" align="center">
            <Text fw={600} style={{ color: textColor }}>
              {otherUser} is {otherBusy ? 'Busy' : 'Available'}
            </Text>
            {otherUser === 'Lili'
              ? <HumanCat size={50} mood={otherBusy ? "sad" : "happy"} color={otherBusy ? theme.colors.pastelRed[4] : theme.colors.pastelGreen[4]} />
              : <HumanDinosaur size={50} mood={otherBusy ? "sad" : "happy"} color={otherBusy ? theme.colors.pastelRed[4] : theme.colors.pastelGreen[4]} />}
          </Flex>
        </Paper>
      </Flex>
    </Box>
  )
}
