/*
    Developed by Selenter, 2021
    All rights reserved.
    
    A library that will return from a String with the specified time - in seconds
*/

function stringFind(data, search) {
    let a = data.search(search) + 1
    let b = search.length + a - 1

    return [a, b]
}

const isoTable = [
    {
        syntax: "Год",
        alias: ["y", "year", "years"],
        action: (currect, data) => {
            return currect + Number(data) * ((86400 * 30) * 12)
        }
    },
    {
        syntax: "Месяц",
        alias: ["mon", "month", "months"],
        action: (currect, data) => {
            return currect + Number(data) * (86400 * 30)
        }
    },
    {
        syntax: "День",
        alias: ["d", "day", "days"],
        action: (currect, data) => {
            return currect + Number(data) * 86400
        }
    },
    {
        syntax: "Час",
        alias: ["h", "hour", "hours"],
        action: (currect, data) => {
            return currect + Number(data) * 3600
        }
    },
    {
        syntax: "Минута",
        alias: ["m", "min", "minut", "minute", "minutes", "mi"],
        action: (currect, data) => {
            return currect + Number(data) * 60
        }
    },
    {
        syntax: "Секунда",
        alias: ["s", "sec", "second", "seconds", "se"],
        action: (currect, data) => {
            return currect + Number(data)
        }
    },
]

function IsoDurationToSeconds(iso) {
    if (!iso) return
    if (Number.isInteger(iso)) return iso

    let duration = 0
    let oldiso = iso

    for (let i = 0; i < 9; i++) {
        iso = iso.replace(i, "0")
    }

    let explode = iso.split("0")
    for (let i = 0; i < explode.length; i++) {
        let element = explode[i];
        
        if (element == "" || element == " ") {
            explode[i] = null
        }
    }

    let a = []
    for (let i = 0; i < oldiso.length; i++) {
        a.push(oldiso.substring(i, i + 1))
    }

    let numberTable = []
    let str = ""

    for (let i = 0; i < a.length; i++) {
        let element = Number(a[i]);
        
        if (Number.isInteger(element)) {
            str = str + element
        } else if (!Number.isInteger(element) && str != "") {
            numberTable.push(str)
            str = ""
        }
    }

    if (numberTable.length <= 0) return

    let tableData = []
    let num = 0

    for (let i = 0; i < explode.length; i++) {
        let element = explode[i];

        if (!element) continue

        let _ = stringFind(oldiso, element)
        let _a = _[0], _b = _[1]

        let sizeNum = numberTable[num].length
        let sizeStr = oldiso.substring(_a - 1, _b).length

        let c1 = oldiso.substring(_a - 1 - sizeNum, _b - sizeStr)
        let c2 = oldiso.substring(_a - 1, _b)

        tableData.push([c1, c2])

        num++
    }

    for (let i = 0; i < tableData.length; i++) {
        let element = tableData[i];
        
        let _num = element[0]
        let _str = element[1]

        for (let i = 0; i < isoTable.length; i++) {
            let element = isoTable[i];
            
            element.alias.forEach(str => {
                if (str == _str) {
                    let data = element.action(duration, _num)
                    duration = data
                }
            })
        }
    }

    return duration
}

module.exports = IsoDurationToSeconds
