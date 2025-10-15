// Minimal ambient declarations for lucide-react to help the TS server
// Only includes the icons used in the project (extend as needed).
declare module 'lucide-react' {
    import * as React from 'react'

    type IconProps = React.SVGProps<SVGSVGElement> & {
        size?: string | number
        absoluteStrokeWidth?: boolean
    } & React.RefAttributes<SVGSVGElement>

    type IconComponent = React.ForwardRefExoticComponent<IconProps>

    export const Menu: IconComponent
    export const X: IconComponent
    export const Moon: IconComponent
    export const Sun: IconComponent
    export const Smartphone: IconComponent
    export const Settings: IconComponent
    export const Globe: IconComponent
    export const Github: IconComponent
    export const Linkedin: IconComponent
    export const Twitter: IconComponent
    export const ArrowDown: IconComponent
    export const Heart: IconComponent
    export const Phone: IconComponent
    export const Mail: IconComponent
    export const MapPin: IconComponent
    export const Send: IconComponent
    export const Clock: IconComponent

    const _default: IconComponent
    export default _default
}
