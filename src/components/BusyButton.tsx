import { useState } from "react"
import { useMantineTheme } from "@mantine/core"
import { Planet } from "react-kawaii"
import "./BusyButton.css" // <- On importe le CSS à part

export default function BusyButton({
    onToggleBusy,
    meBusy,
}: {
    onToggleBusy: () => void
    meBusy: boolean
}) {
    const theme = useMantineTheme()
    const color = meBusy
        ? theme.colors.pastelRed[4]
        : theme.colors.pastelGreen[4]

    const [rotating, setRotating] = useState(false)

    const handleClick = () => {
        setRotating(true)
        setTimeout(() => setRotating(false), 1000) // duréé = animation-duration
        onToggleBusy()
    }

    return (
        <div className={rotating ? "planet-wrapper rotating" : "planet-wrapper"}>
            <Planet
                onClick={handleClick}
                size={300}
                mood={meBusy ? "sad" : "happy"}
                color={color}
            />
        </div>
    )
}
