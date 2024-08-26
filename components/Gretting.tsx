
const Gretting = () => {
    const currentTime = new Date()
    const currentHour = currentTime.getHours()

    let gretting = ""

    if (currentHour < 12) {
        gretting = "Buenos días"
    } else if (currentHour < 18) {
        gretting = "Buenas tardes"
    } else {
        gretting = "Buenas noches"
    }

    return (
        <h1 className="text-3xl font-bold">
            {gretting}
        </h1>
    )
}

export default Gretting