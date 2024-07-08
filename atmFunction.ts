const nominals = {
    5000: 1,
    1000: 1,
    500: 1,
    100: 1,
    50: 1
}






const atmq = (amount: number, nominals: Object) => {

    for (const nominal in nominals) {
        console.log(nominal)

    }

    // let sum = amount
    // for (const nominal of sortedNominals) {
    //     const count = Math.floor(sum / nominal)
    //     sum = sum % nominal
    //     if (count > 0) {
    //         result.push(`${nominal}x${count}`)
    //     }
    // }
    // console.log('spring'.split(''))
    // return result



}

atmq(5000, nominals)



























const atm = (amount: number, nominals: number[]) => {
    const sortedNominals = nominals.sort((a, b) => b - a)
    const result: string[] = []
    let sum = amount
    for (const nominal of sortedNominals) {
        const count = Math.floor(sum / nominal)
        sum = sum % nominal
        if (count > 0) {
            result.push(`${nominal}x${count}`)
        }
    }
    console.log('spring'.split(''))
    return result
}