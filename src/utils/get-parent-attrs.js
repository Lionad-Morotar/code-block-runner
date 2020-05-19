const name = 'Code-Block-Runner'

export default function get(handle) {
    while (handle.$options.name !== name || !handle) {
        handle = handle.$parent
    }
    return handle
}