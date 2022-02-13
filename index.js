const LAST_YEAR = 90
const WEEKS_IN_YEAR = 52
const TOTAL_OF_WEEKS = LAST_YEAR * WEEKS_IN_YEAR
const LOCAL_STORAGE_KEY = 'your-life-in-weeks'
const DEFAULT_DATE = '1970-01-01'

function getWeeksToDate(birthDate) {
    const today = new Date()
    const diff = today - birthDate
    const weeks = Math.floor(diff / (1000 * 60 * 60 * 24 * 7))
    return weeks
}

function saveToLocalStorage(rawDate) {
    localStorage.setItem(LOCAL_STORAGE_KEY, rawDate)
}

function getFromLocalStorage() {
    return localStorage.getItem(LOCAL_STORAGE_KEY)
}

function updateFilledWeeks(rawDate) {
    const date = new Date(rawDate)
    const weeksCount = getWeeksToDate(date)
    renderWeeks(weeksCount)
}

function handleDateChange(event) {
    const rawDate = event.target.value
    saveToLocalStorage(rawDate)
    updateFilledWeeks(rawDate)
}

function renderWeeks(weeksCount) {
    const root = document.getElementById('weeks-root')
    root.innerHTML = ''

    for (let i = 0; i < TOTAL_OF_WEEKS; i++) {
        const week = document.createElement('div')
        week.classList.add('week')
        if (i < weeksCount) {
            week.classList.add('week--filled')
        }
        root.appendChild(week)
    }
}

function initialLoad() {
    const dateInput = document.getElementById('date-input')
    dateInput.addEventListener('change', handleDateChange)
    const storedDate = getFromLocalStorage() || DEFAULT_DATE
    dateInput.value = storedDate
    updateFilledWeeks(storedDate)
}

initialLoad()

